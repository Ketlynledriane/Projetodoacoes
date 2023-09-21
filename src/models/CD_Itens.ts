import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Itens } from "./Itens";
import { CD } from "./CD";

@Entity('cd_itens')
export class CD_Itens extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public id_itens: number;

    @Column()
    public id_cd: number;

    @ManyToOne(() => Itens, (itens) => itens.cd_itens)
    public itens: Itens[];
    
    @OneToMany(() => CD, (cd) => cd.cd_itens)
    public cds: CD[];
}