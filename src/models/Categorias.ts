import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Itens } from "./Itens";
import { OneToMany } from "typeorm/browser";

@Entity('categorias')
export class Categorias extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public descricao: string;

    @OneToMany(() => Itens, (itens) => itens.categoria)
    public itens: Itens[];
    
}
