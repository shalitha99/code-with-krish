import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsModule } from './persons/persons.module';
import { Person } from './persons/entity/person.entity';
import { NotificationsModule } from './notifications/notifications.module';


@Module({
  imports: [PersonsModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.HOSTNAME || 'localhost',
    port:3306,
    username: 'apiuser',
    password: '1qazxsw2##',
    database: 'cosmos',
    entities: [Person],
    synchronize:true//only for dev
  }), NotificationsModule],
})
export class AppModule {}
