import { Cidades } from '../models/Cidades';
import { CidadesController } from '../controllers/CidadesController';
import promptSync from 'prompt-sync';
const prompt = promptSync();

export class CidadesMenu {

  public controller: CidadesController;

  constructor () {
    this.controller = new CidadesController();
  }

  public show (): void {
      console.log('13 - Cadastrar nova cidade');
      console.log('14 - Editar cidade');
      console.log('15 - Listar cidades');
      console.log('16 - Excluir cidade');
  }

  public async execute (input: string): Promise<void> {
    switch (input) {
      case '13':
        await this.create();
        break;
      case '14':
        await this.edit();
        break;
      case '15':
        await this.list();
        break;
      case '16':
        await this.delete();
        break;
    }
  }

  private async list (): Promise<void> {
    let cidade: Cidades[] | null = await this.controller.list();

    console.table(cidade?.map(function (cidade: Cidades) {
      return {
        id: cidade.id,
        descricao: cidade.nome,
      }
    }));
  }

  private async create (): Promise<void> {
    let nome: string = prompt('Digite o nome da cidade: ');
    let cidade: Cidades = await this.controller.create(nome);
    console.log(`Cidade ID #${cidade.id} criada com sucesso!`);
  }

  private async edit (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let cidade: Cidades | null = await this.controller.find(id);
    if(cidade){
        cidade.nome = prompt(`Descrição: (${cidade.nome}) `, cidade.nome);
        console.log(`Cidade ID# ${cidade.id} atualizada com sucesso!`);
        await this.controller.save(cidade);
    } else {
      console.log('Cidade não encontrada!');
    }}

    private async delete (): Promise<void> {
      let id: number = Number(prompt('Qual o ID? '));
      let cidade: Cidades | null = await this.controller.find(id);
      if (cidade) {
        await this.controller.delete(cidade);
        console.log(`Cidade ID #${id} excluído com sucesso!`);
      } else {    
        console.log('Cidade não encontrado!');
      }
    }
}