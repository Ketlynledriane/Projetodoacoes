import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne} from "typeorm";
import { Beneficiarios } from "./Beneficiarios";
import { CD } from "./CD";
import { Doador } from "./Doador";


@Entity('cidades')
export class Cidades extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @OneToMany(() => Beneficiarios, (beneficiario) => beneficiario.cidade)
    public beneficiario: Beneficiarios[];

  @OneToMany(() => CD, (cd) => cd.cidade)
    public cds: CD[];

  @OneToMany(() => Doador, (doadores) => doadores.cidade)
  public doadores: Doador[];

}