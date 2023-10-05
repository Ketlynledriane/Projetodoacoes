import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne } from "typeorm";
import { CD_Itens } from "./CD_Itens";
import { Cidades } from "./Cidades";
import { Movimentacao } from "./Movimentacao";
import { Doador } from "./Doador";
import { Beneficiarios } from "./Beneficiarios";

@Entity('cds') 
export class CD extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nome: string;
    
    @Column()
    public id_cidade: number;

    @ManyToOne(() => Cidades, (cidade) => cidade.cds, {
        eager: true})
    public cidade: Cidades;
    
    @OneToMany(() => CD_Itens, (cd_itens) => cd_itens.id_cd)
    public cd_itens: CD_Itens[];

    @OneToMany(() => Movimentacao, (movimentacoes) => movimentacoes.cd)
    public movimentacoes: Movimentacao[];
}