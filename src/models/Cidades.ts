import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('cidades')
export class Cidades extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

}