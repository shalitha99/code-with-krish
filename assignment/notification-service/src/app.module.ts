import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from './notifications/notifications.module';


@Module({
  imports: [ NotificationsModule],
})
export class AppModule {}
