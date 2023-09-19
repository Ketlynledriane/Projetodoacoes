import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Categorias } from "./Categorias";
import { CD_Itens } from "./CD_Itens";

@Entity('itens')
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
    @JoinColumn({ name: 'id_categoria' })
    public categoria: Promise <Categorias>;

    @OneToMany(() => CD_Itens, (cd_itens) => cd_itens.itens)
    public cd_itens: CD_Itens[];
    
}