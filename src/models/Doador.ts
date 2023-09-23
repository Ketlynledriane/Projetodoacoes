import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CD } from "./CD";

@Entity('doador')
export class Doador extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public nome: string;

    @Column()
    public cpf: string;

    @Column()
    public cidade: string;

    @ManyToOne(() => CD, (cd) => cd.doadores)
    public cd: CD[];
}