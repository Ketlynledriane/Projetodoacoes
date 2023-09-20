import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Beneficiarios } from "./Beneficiarios";


@Entity('cidades')
export class Cidades extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @OneToMany(() => Beneficiarios, (beneficiario) => beneficiario.cidade)
    public beneficiario: Beneficiarios[];

}