import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CD } from "./CD";
import { Doador } from "./Doador";
import { CD_Itens } from "./CD_Itens";
import { Beneficiarios } from "./Beneficiarios";

@Entity('movimentacoes')
export class Movimentacao extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'timestamp with time zone',
    })
    public data_hora: Date;

    @Column()
    public tipo: string;

    @Column()
    public cd_item_id: number;

    @Column()
    public quantidade: number;

    @ManyToOne(() => Doador, (doador) => doador.movimentacoes,{nullable: true, eager: true})
    public doador: Doador;

    @ManyToOne(() => Beneficiarios, (beneficiario) => beneficiario.movimentacoes,{nullable: true, eager: true})
    public beneficiario: Beneficiarios;

    @ManyToOne(() => CD, (cd) => cd.movimentacoes, {
        eager: true})
    public cd: CD;

    @ManyToOne(() => CD_Itens, (cd_item) => cd_item.movimentacoes, {
        eager: true,
    })
    @JoinColumn({ name: 'cd_item_id' })
    public cd_item: CD_Itens;
}