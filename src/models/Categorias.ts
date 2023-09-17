import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categorias')
export class Categorias extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public descricao: string;
    
}