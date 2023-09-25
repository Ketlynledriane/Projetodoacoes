import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinColumn } from "typeorm";
import { Itens } from "./Itens";
import { CD } from "./CD";
import { Movimentacao } from "./Movimentacao";

@Entity('cd_itens')
export class CD_Itens extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public id_itens: number;

    @Column()
    public id_cd: number;

    @ManyToOne(() => Itens, (itens) => itens.cd_itens, {
        eager: true,
    })
    @JoinColumn({ name: 'id_itens' })
    public item: Itens;
    
    @ManyToOne(() => CD, (cd) => cd.cd_itens)
    @JoinColumn({ name: 'id_cd' })
    public cd: CD;

    @Column({
        default: 0
    })
    public estoque: number;

    @OneToMany(() => Movimentacao, (movimentacoes) => movimentacoes.cd_item_id)
    public movimentacoes: Movimentacao[];
}