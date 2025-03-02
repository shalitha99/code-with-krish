import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './entity/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer) private customerRepository: Repository<Customer>,
      ) {}

      async create(createCustomerDto: CreateCustomerDto) {
        const saveCustomer = await this.customerRepository.save(createCustomerDto);
        return saveCustomer;
}

// fetch(id: any) {
//     return this.customerRepository.findOne({
//       where: { id: id },
//     });
//   }

async fetch(id: number) {
  const customer = await this.customerRepository.findOne({ where: { id } });
  if (!customer) {
    throw new NotFoundException({ message: 'Customer not found' });
  }
  return customer;
}

  fetchAll() {
    return this.customerRepository.find({
    });
  }
}
