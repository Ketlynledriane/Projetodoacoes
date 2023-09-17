import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Categorias } from "./Categorias";
import { OneToOne } from "typeorm/browser";

@Entity('categorias')
export class Itens extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public descricao: string;

    @Column()
    public id_categoria: number;

    @OneToOne(() => Categorias, (categoria) => categoria.itens, {
        eager: true,
        onDelete: "CASCADE"
    })
    public categoria: Categorias;
    
}