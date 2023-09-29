import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class Usuarios extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nome: string;

    @Column()
    public email: string;

    @Column()
    public senha: string;  
}