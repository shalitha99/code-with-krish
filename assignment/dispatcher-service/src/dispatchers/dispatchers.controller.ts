import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DispatchersService } from './dispatchers.service';
import { CreateDispatcherDTO } from './dto/create-dispatcher.dto';
import { Dispatcher } from './entity/dispatcher';

@Controller('/dispatch-locations')
export class DispatchersController {
    constructor(private readonly dispatchersService: DispatchersService){}
    
    @Post()
    async registerVechicle(
        @Body() createDispatcherDTO: CreateDispatcherDTO,  
    ): Promise<Dispatcher>{
        return this.dispatchersService.registerVechicle(createDispatcherDTO);
    }

    @Get(':city')
    async getVechiclesById(@Param('city') city: string): Promise<Dispatcher>{
        return this.dispatchersService.getVechiclesByCity(city);
    }
}
