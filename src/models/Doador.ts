import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CD } from "./CD";
import { Cidades } from "./Cidades";
import { Movimentacao } from "./Movimentacao";

@Entity('doador')
export class Doador extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public nome: string;

    @Column()
    public cpf: string;

    @ManyToOne(() => Cidades, (cidade) => cidade.doadores, {
        eager: true})
    public cidade: Cidades;

    @OneToMany(() => Movimentacao, (movimentacoes) => movimentacoes.doador)
    public movimentacoes: Movimentacao[];
}