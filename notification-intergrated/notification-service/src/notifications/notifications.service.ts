import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class NotificationsService {
    
    private readonly Kafka = new Kafka({brokers: ['3.0.159.213:9092']});
    private readonly producer = this.Kafka.producer();
    private readonly consumer = this.Kafka.consumer({groupId: 'sandaru.notification.service'});

    private readonly inventoryServiceUrl = 'http://localhost:3001/products';
    private readonly customerServiceUrl = 'http://localhost:3002/customers';

    async onModuleInit(){
        //await this.producer.connect();
        await this.consumer.connect();
        await this.consumerPlacedOrders();
    }

    async consumerPlacedOrders(){
        console.log("-----------Order is Placed-----------");
        await this.consumer.subscribe({topic: 'sandaru.order.notification'});
        await this.consumer.run({
            eachMessage: async({message})=>{
                const res = JSON.parse(message.value.toString());
                console.log(`${res.customerId}, ${res.status}`);
            }
        })
    }
}
