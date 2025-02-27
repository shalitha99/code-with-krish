import { Injectable } from '@nestjs/common';
import { Inventory } from './entity/inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>,
      ) {}

      async create(createInventoryDto: CreateInventoryDto) {
        const saveProduct = await this.inventoryRepository.save(createInventoryDto);
        return saveProduct;
}

fetch(id: any) {
    return this.inventoryRepository.findOne({
      where: { id: id },
    });
  }

  fetchAll() {
    return this.inventoryRepository.find({
    });
  }

  async validateStock(id: number, quantity: number) {
    const product = await this.inventoryRepository.findOne({ where: { id } });
    return { available: product ? product.quantity >= quantity : false };
  }
}
