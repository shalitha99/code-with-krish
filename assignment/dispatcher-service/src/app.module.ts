import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispatcher } from './dispatchers/entity/dispatcher';
import { DispatchersModule } from './dispatchers/dispatchers.module';


@Module({
  imports: [DispatchersModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.HOSTNAME || 'localhost',
    port:3306,
    username: 'apiuser',
    password: '1qazxsw2##',
    database: 'cosmos',
    entities: [Dispatcher],
    synchronize:true//only for dev
  }), DispatchersModule],
})
export class AppModule {}
