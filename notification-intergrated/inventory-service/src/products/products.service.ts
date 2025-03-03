import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import {Kafka} from 'kafkajs'

@Injectable()
export class ProductsService {
  private readonly Kafka = new Kafka({brokers: ['3.0.159.213:9092']});
  private readonly producer = this.Kafka.producer();
  private readonly consumer = this.Kafka.consumer({groupId: 'products-service'}); 

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async onModuleInit(){
    await this.producer.connect();
    await this.consumer.connect();
    //call the method
    this.consumerOrderCreated();
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  //Listen OrderTopic
  async consumerOrderCreated(){
    await this.consumer.subscribe({topic: 'sandaru.order.create'});
    console.log("--------------------Consumer Order Created------------------------");

    await this.consumer.run({
      eachMessage: async({message})=>{
        console.log("------------------New Message Arrived------------------------");
          const {customerId, customerName, items} = JSON.parse(
            message.value.toString(),
          );
          for(const item of items){
            await this.reduceStock(item.productId, item.quantity);
          }

          await this.producer.send({
            topic: 'sandaru.order.inventory.update',
            messages:[
              {value: JSON.stringify({customerId, customerName, items})},
            ],
          });
      },
    });
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async validateStock(
    id: number,
    quantity: number,
  ): Promise<{ available: boolean }> {
    const product = await this.getProductById(id);
    return { available: product.quantity >= quantity };
  }
  async reduceStock(id: number, quantity: number): Promise<Product> {
    const product = await this.getProductById(id);
    if (product.quantity < quantity) {
      throw new BadRequestException(`Not enough stock for Product ID ${id}`);
    }
    product.quantity -= quantity;
    return this.productRepository.save(product);
  }
}
