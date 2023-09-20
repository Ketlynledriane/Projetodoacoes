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
    onDelete: "CASCADE"
})
@JoinColumn({ name: 'id_cidade' })
public cidade: Promise <Cidades>;

}
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity('beneficiarios')
export class Beneficiarioss extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nome: string;     
}

