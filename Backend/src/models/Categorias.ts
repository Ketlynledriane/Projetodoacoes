import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Itens } from "./Itens";

@Entity('categorias')
export class Categorias extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public descricao: string;

    @OneToMany(() => Itens, (itens) => itens.categoria)
    public itens: Itens[];
    
}
