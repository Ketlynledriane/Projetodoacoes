/*import { Beneficiarios } from '../models/Beneficiarios';
import { BeneficiariosControllers } from '../controllers/BeneficiariosController';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export class BeneficiariosMenu {

  public controller: BeneficiariosControllers;

  constructor () {
    this.controller = new BeneficiariosControllers();
  }

  public async show () {
      console.log('1 - Cadastrar novo beneficiario');
      console.log('2 - Editar beneficiario');
      console.log('3 - Listar beneficiarios');
      console.log('4 - Excluir beneficiario');
      console.log('0 - Voltar ao menu anterior');
      console.log("");
      let escolha = prompt('Digite a opção escolhida: ')
      await this.execute(escolha);
  }

  public async execute (input: string): Promise<void> {
    switch (input) {
      case '1':
        await this.create();
        break;
      case '2':
        await this.edit();
        break;
      case '3':
        await this.list();
        break;
      case '4':
        await this.delete();
        break;
      case '0':
          console.log('Voltando...');
          break;

      default:
          console.log('Valor inválido!');
          await this.show();
          break;
          
    }
  }

  private async list (): Promise<void> {
    let beneficiario: Beneficiarios[] | null = await this.controller.list();

    console.table(beneficiario?.map(function (beneficiario: Beneficiarios) {
      return {
        id: beneficiario.id,
        nome: beneficiario.nome,
        cpf: beneficiario.cpf,
        cidade: beneficiario.id_cidade
      }
    }));
    prompt("Aperte ENTER para continuar...");
    await this.show();
}

    private async create (): Promise<void> {
    let nome: string = prompt('Digite o nome do beneficiario: ');
    let cpf: string = prompt('Digite o número do cpf: ');
    let id_cidade: number = Number (prompt ('Digite o Id da cidade:'));
    let beneficiario: Beneficiarios = await this.controller.create(nome, id_cidade, cpf);
    console.log(`Beneficiaio ID #${beneficiario.id} criado com sucesso!`);
    prompt("Aperte ENTER para continuar...");
    await this.show();
  }

  private async edit (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let beneficiario: Beneficiarios | null = await this.controller.find(id);
    if(beneficiario){
        beneficiario.nome = prompt(`Descrição: (${beneficiario.nome}) `, beneficiario.nome);
        beneficiario.cpf = prompt(`Descrição: (${beneficiario.cpf}) `, beneficiario.cpf);
        beneficiario.id_cidade = Number (prompt(`Cidade (${beneficiario.id_cidade}): `, String(beneficiario.id_cidade)));
        console.log(`Beneficiario ID# ${beneficiario.id} atualizado com sucesso!`);
        await this.controller.save(beneficiario);
    } else {
      console.log('Beneficiario não encontrada!');
    }

    prompt("Aperte ENTER para continuar...");
    await this.show();
  }

  private async delete (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let beneficiario: Beneficiarios| null = await this.controller.find(id);
    if (beneficiario) {
      await this.controller.delete(beneficiario);
      console.log(`Beneficiaio ID #${id} excluído com sucesso!`);
    } else {    
      console.log('Beneficiario não encontrado!');
    }

    prompt("Aperte ENTER para continuar...");
    await this.show();
  }
}*/
    