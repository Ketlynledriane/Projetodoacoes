import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Categorias } from "./Categorias";
import { ManyToOne } from "typeorm/browser";
import { OneToMany } from "typeorm";
import { CD_Itens } from "./CD_Itens";

@Entity('categorias')
export class Itens extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public descricao: string;

    @Column()
    public id_categoria: number;

    @ManyToOne(() => Categorias, (categoria) => categoria.itens, {
        eager: true,
        onDelete: "CASCADE"
    })
    public categoria: Categorias;

    @OneToMany(() => CD_Itens, (cd_itens) => cd_itens.itens)
    public cd_itens: CD_Itens[];
    
}