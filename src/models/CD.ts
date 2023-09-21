import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne } from "typeorm";
import { CD_Itens } from "./CD_Itens";
import { Cidades } from "./Cidades";
import { Movimentacao } from "./Movimentacao";

@Entity('cds') 
export class CD extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nome: string;

    @ManyToOne(() => Cidades, (cidade) => cidade.cds)
    public cidade: Cidades;
    
    @OneToMany(() => CD_Itens, (cd_itens) => cd_itens.cds)
    public cd_itens: CD_Itens[];

    @OneToMany(() => Movimentacao, (movimentacoes) => movimentacoes.cd)
    public movimentacoes: Movimentacao[];
}