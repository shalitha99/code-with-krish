import { Type } from 'class-transformer';
import { IsArray, IsInt, isInt, IsString, ValidateNested } from 'class-validator';

class OrderItemDto {
  @IsInt()
  productId: number;
  @IsInt()
  price: number;
  @IsInt()
  quantity: number;
  @IsString()
  city: string;
}

export class createOrderDto {
  @IsInt()
  customerId: number;
  @IsString()
  city: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
