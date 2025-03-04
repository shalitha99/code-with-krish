import { Module } from '@nestjs/common';
import { DispatchersController } from './dispatchers.controller';
import { DispatchersService } from './dispatchers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispatcher } from './entity/dispatcher';

@Module({
  controllers: [DispatchersController],
  providers: [DispatchersService],
  imports: [TypeOrmModule.forFeature([Dispatcher])],
})
export class DispatchersModule {}
