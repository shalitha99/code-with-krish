import { IsInt, IsString } from "class-validator";

export class CreateInventoryDto{
    @IsInt()
    price: number;
    @IsInt()
    quantity: number;
    @IsString()
    name: string;
}