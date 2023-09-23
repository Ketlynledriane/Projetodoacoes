import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Cidades } from "./Cidades";
import { CD } from "./CD";


@Entity('beneficiarios')
export class Beneficiarios extends BaseEntity {
  @PrimaryGeneratedColumn()

  public id: number;

  @Column()
  public nome: string;

  @Column()
  public cpf: string;

  @Column()
  public id_cidade: number;

  @ManyToOne(() => CD, (cd) => cd.beneficiarios)
  public cd: CD[];

  @ManyToOne(() => Cidades, (cidade) => cidade.beneficiario, {
    eager: true,
})
@JoinColumn({ name: 'id_cidade' })
public cidade: Promise <Cidades>;

}

