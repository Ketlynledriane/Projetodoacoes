import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Itens } from "./Itens";
import { OneToOne } from "typeorm/browser";

@Entity('categorias')
export class Categorias extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public descricao: string;

    @OneToOne(() => Itens, (itens) => itens.categoria)
    public itens: Itens[];
    
}
