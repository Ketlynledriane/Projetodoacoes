import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CD } from "./CD";
import { Doador } from "./Doador";

@Entity('movimentacoes')
export class Movimentacao extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'timestamp with time zone',
    })
    public data_hora: Date 

    @Column()
    public tipo: string;

    @Column()
    public cd_item_id: number;

    @Column()
    public quantidade: number;

    @ManyToOne(() => Doador, (doador) => doador.movimentacoes,{nullable: true})
    public doador: Doador;

    @Column({nullable: true})
    public id_beneficiario: number;

    @ManyToOne(() => CD, (cd) => cd.movimentacoes)
    public cd: CD;
}