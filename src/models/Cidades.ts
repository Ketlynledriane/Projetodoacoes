import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne} from "typeorm";
import { Beneficiarios } from "./Beneficiarios";
import { CD } from "./CD";


@Entity('cidades')
export class Cidades extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @OneToMany(() => Beneficiarios, (beneficiario) => beneficiario.cidade)
    public beneficiario: Beneficiarios[];

  @ManyToOne(() => CD, (cd) => cd.cidades)
    public cds: CD[];

}