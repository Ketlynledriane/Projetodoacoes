import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Itens } from "./Itens";
import { OneToOne } from "typeorm/browser";

@Entity('categorias')
export class CD_Itens extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public id_itens: number;

    @Column()
    public id_cd: number;

    @OneToOne(() => Itens, (itens) => Itens.cd_itens, {
        eager: true,
        onDelete: "CASCADE"
    })
    public itens: Itens;
    
}