import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Cidades } from "./Cidades";
import { CD } from "./CD";
import { Movimentacao } from "./Movimentacao";


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

  @ManyToOne(() => Cidades, (cidade) => cidade.beneficiario, {
    eager: true,
  })
  @JoinColumn({ name: 'id_cidade' })
  public cidade: Cidades;

  @OneToMany(() => Movimentacao, (movimentacoes) => movimentacoes.beneficiario)
  public movimentacoes: Movimentacao[];
}

