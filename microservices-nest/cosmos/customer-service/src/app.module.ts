import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers/entity/customer.entity';


@Module({
  imports: [CustomersModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.HOSTNAME || 'localhost',
    port:3306,
    username: 'apiuser',
    password: '1qazxsw2##',
    database: 'cosmos',
    entities: [Customer],
    synchronize:true//only for dev
  })],
})
export class AppModule {}
