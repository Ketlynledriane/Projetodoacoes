import { Cidades } from '../models/Cidades';
import { CidadesController } from '../controllers/CidadesController';
import promptSync from 'prompt-sync';
const prompt = promptSync();

export class CidadesMenu {

  public controller: CidadesController;

  constructor() {
    this.controller = new CidadesController();
  }

  public async show() {
    console.log('1 - Cadastrar nova cidade');
    console.log('2 - Editar cidade')
    console.log('3 - Listar cidades');
    console.log('0 - Voltar ao menu anterior');
    console.log("");
    let escolha = prompt('Digite a opção escolhida: ')
    await this.execute(escolha);
  }

  public async execute(input: string): Promise<void> {
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
      case '0':
        console.log('Voltando...');
        break;

      default:
        console.log('Valor inválido!');
        await this.show();
        break;
    }
  }

  private async list(): Promise<void> {
    let cidade: Cidades[] | null = await this.controller.list();

    console.table(cidade?.map(function (cidade: Cidades) {
      return {
        id: cidade.id,
        descricao: cidade.nome,
      }
    }));
    prompt("Aperte ENTER para continuar...");
    await this.show();
  }

  private async create(): Promise<void> {
    let nome: string = prompt('Digite o nome da cidade: ');
    let cidade: Cidades = await this.controller.create(nome);
    console.log(`Cidade ID #${cidade.id} criada com sucesso!`);

    prompt("Aperte ENTER para continuar...");
    await this.show();
  }

  private async edit(): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let cidade: Cidades | null = await this.controller.find(id);
    if (cidade) {
      cidade.nome = prompt(`Descrição: (${cidade.nome}) `, cidade.nome);
      console.log(`Cidade ID# ${cidade.id} atualizada com sucesso!`);
      await this.controller.save(cidade);
    } else {
      console.log('Cidade não encontrada!');
    }
    prompt("Aperte ENTER para continuar...");
    await this.show();
  }
}
