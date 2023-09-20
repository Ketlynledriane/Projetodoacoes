import { Beneficiarios } from '../models/Beneficiarios';
import { BeneficiariosControllers } from '../controllers/BeneficiariosController';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export class BeneficiariosMenu {

  public controller: BeneficiariosControllers;

  constructor () {
    this.controller = new BeneficiariosControllers();
  }

  public show (): void {
      console.log('17 - Cadastrar novo beneficiario');
      console.log('18 - Editar beneficiario');
      console.log('19 - Listar beneficiarios');
      console.log('20 - Excluir beneficiario');
  }

  public async execute (input: string): Promise<void> {
    switch (input) {
      case '17':
        await this.create();
        break;
      case '18':
        await this.edit();
        break;
      case '19':
        await this.list();
        break;
      case '20':
        await this.delete();
        break;
    }
  }

  private async list (): Promise<void> {
    let beneficiario: Beneficiarios[] | null = await this.controller.list();

    console.table(beneficiario?.map(function (beneficiario: Beneficiarios) {
      return {
        id: beneficiario.id,
        nome: beneficiario.nome,
        cidade: beneficiario.id_cidade
      }
    }));
  }

  private async create (): Promise<void> {
    let nome: string = prompt('Digite o nome do beneficiario: ');
    let id_cidade: number = Number (prompt ('Digite o Id da cidade:'))
    let beneficiario: Beneficiarios = await this.controller.create(nome, id_cidade);
    console.log(`Beneficiaio ID #${beneficiario.id} criado com sucesso!`);
  }

  private async edit (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let beneficiario: Beneficiarios | null = await this.controller.find(id);
    if(beneficiario){
        beneficiario.nome = prompt(`Descrição: (${beneficiario.nome}) `, beneficiario.nome);
        beneficiario.id_cidade = Number (prompt(`Cidade (${beneficiario.id_cidade}): `, String(beneficiario.id_cidade)));
        console.log(`Beneficiario ID# ${beneficiario.id} atualizado com sucesso!`);
        await this.controller.save(beneficiario);
    } else {
      console.log('Beneficiario não encontrada!');
    }}

    private async delete (): Promise<void> {
      let id: number = Number(prompt('Qual o ID? '));
      let beneficiario: Beneficiarios| null = await this.controller.find(id);
      if (beneficiario) {
        await this.controller.delete(beneficiario);
        console.log(`Beneficiaio ID #${id} excluído com sucesso!`);
      } else {    
        console.log('Beneficiario não encontrado!');
      }
    }
}
    