import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Controller('products')
export class InventoryController {
    constructor(private inventoryService: InventoryService){}

    @Post()
    async create(@Body()createInventoryDto : CreateInventoryDto) {
        return this.inventoryService.create(createInventoryDto);
      }
    @Get(':id')
    async fetch(@Param('id') id: number) {
    return await this.inventoryService.fetch(id);
    }
    
    @Get()
    async fetchAll() {
    return await this.inventoryService.fetchAll();
  }

  @Get(':id/validate')
  async validateStock(
    @Param('id') id: number,
    @Query('quantity') quantity: number,
  ) {
    return this.inventoryService.validateStock(id, Number(quantity));
  }

  @Patch(':id/reduce')
  async update(@Param('id') id: number, @Query('quantity') quantity: number) {
    return this.inventoryService.updateStock(id, quantity);
  }

}
