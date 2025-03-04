import { IsString } from "class-validator";

export class CreateDispatcherDTO{
    @IsString()
    vehicle_number: string;

    @IsString()
    city: string;
}