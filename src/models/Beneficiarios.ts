import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Cidades } from "./Cidades";


@Entity('beneficiarios')
export class Beneficiarios extends BaseEntity {
  @PrimaryGeneratedColumn()

  public id: number;

  @Column()
  public nome: string;

  @Column()
  public id_cidade: number;

  @ManyToOne(() => Cidades, (cidade) => cidade.beneficiario, {
    eager: true,
})
@JoinColumn({ name: 'id_cidade' })
public cidade: Promise <Cidades>;

}

