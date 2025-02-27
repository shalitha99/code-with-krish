import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inventory{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    name: string;
    @Column()
    price: number;
    @Column()
    quantity: number;
}