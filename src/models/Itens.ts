import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Categorias } from "./Categorias";
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