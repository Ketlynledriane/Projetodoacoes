import { Categorias } from '../models/Categorias';
import { CategoriasController } from '../controllers/CategoriasController';
import promptSync from 'prompt-sync';
const prompt = promptSync();

export class CategoriasMenu {

  public controller: CategoriasController;

  constructor() {
    this.controller = new CategoriasController();
  }

  public async show() {
    console.log('1 - Cadastrar nova categoria');
    console.log('2 - Editar categoria');
    console.log('3 - Listar categorias');
    console.log('4 - Excluir categoria');
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

  private async list(): Promise<void> {
    let categorias: Categorias[] | null = await this.controller.list();

    console.table(categorias?.map(function (categoria: Categorias) {
      return {
        id: categoria.id,
        descricao: categoria.descricao,
      }
    }));

    prompt("Aperte ENTER tecla para continuar...");
    await this.show();
  }

  private async create(): Promise<void> {
    let descricao: string = prompt('Digite a descrição: ');
    let categoria: Categorias = await this.controller.create(descricao);
    console.log(`Categoria ID #${categoria.id} criada com sucesso!`);

    prompt("Aperte ENTER para continuar...");
    await this.show();
  }

  private async edit(): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let categoria: Categorias | null = await this.controller.find(id);
    if (categoria) {
      categoria.descricao = prompt(`Descrição: (${categoria.descricao}) `, categoria.descricao);
      console.log(`Categoria ID# ${categoria.id} atualizada com sucesso!`);
      await this.controller.save(categoria);
    } else {
      console.log('Categoria não encontrada!');
    }
    prompt("Aperte ENTER para continuar...");
    await this.show();
  }

  private async delete(): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let categoria: Categorias | null = await this.controller.find(id);
    if (categoria) {
      await this.controller.delete(categoria);
      console.log(`Categoria ID #${id} excluída com sucesso!`);
    } else {
      console.log('Categoria não encontrada!');
    }
    prompt("Aperte ENTER para continuar...");
    await this.show();
  }

}