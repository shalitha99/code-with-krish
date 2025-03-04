import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dispatcher } from './entity/dispatcher';
import { Repository } from 'typeorm';
import { CreateDispatcherDTO } from './dto/create-dispatcher.dto';
import { Kafka } from 'kafkajs';

@Injectable()
export class DispatchersService {
    constructor(
        @InjectRepository(Dispatcher)
        private readonly dispatcherRepository: Repository<Dispatcher>,
    ){}

    private readonly Kafka = new Kafka({brokers: ['3.0.159.213:9092']});//['localhost:9092']
    private readonly producer = this.Kafka.producer();
    private readonly consumer = this.Kafka.consumer({groupId: 'sandaru.notification.service'});

    private readonly inventoryServiceUrl = 'http://localhost:3001/products';
    
    async onModuleInit(){
        await this.producer.connect();
        await this.consumer.connect();
        await this.consumerVechicleDetails();
    }

    async consumerVechicleDetails(){
        console.log("-----------Vechicle details from Dispatcher-----------");
        await this.consumer.subscribe({topic: 'sandaru.order.confirmed'});
        await this.consumer.run({
            eachMessage: async({message})=>{
                const res = JSON.parse(message.value.toString());
                console.log(`${res.city}, ${res.status}`);
            }
        })
    }


    async registerVechicle(
        createDispatcherDTO: CreateDispatcherDTO,
      ): Promise<Dispatcher> {
        const vechicle = this.dispatcherRepository.create(createDispatcherDTO);
        return this.dispatcherRepository.save(vechicle);
      }
      
    async getVechiclesByCity(city: string): Promise<Dispatcher> {
        const vechicleInfo = await this.dispatcherRepository.findOne({ where: { city } });
        if (!vechicleInfo) {
          throw new NotFoundException(`Vechicle with City is ${city} not found`);
        }
        return vechicleInfo;
      }

}
