import { Categorias } from '../models/Categorias';
import { CategoriasController } from '../controllers/Categoriascontroller';
import promptSync from 'prompt-sync';
const prompt = promptSync();

export class CategoriasMenu {

  public controller: CategoriasController;

  constructor () {
    this.controller = new CategoriasController();
  }

  public show (): void {
      console.log('5 - Cadastrar nova categoria');
      console.log('6 - Editar categoria');
      console.log('7 - Listar categorias');
      console.log('8 - Excluir categoria');
  }

  public async execute (input: string): Promise<void> {
    switch (input) {
      case '5':
        await this.create();
        break;
      case '6':
        await this.edit();
        break;
      case '7':
        await this.list();
        break;
      case '8':
        await this.delete();
        break;
    }
  }

  private async list (): Promise<void> {
    let categorias: Categorias[] | null = await this.controller.list();

    console.table(categorias?.map(function (categoria: Categorias) {
      return {
        id: categoria.id,
        descricao: categoria.descricao,
      }
    }));
  }

  private async create (): Promise<void> {
    let descricao: string = prompt('Digite a descrição: ');
    let situacao = 'A';
    let categoria: Categorias = await this.controller.create(descricao);
    console.log(`Categoria ID #${categoria.id} criada com sucesso!`);
  }

  private async edit (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let categoria: Categorias | null = await this.controller.find(id);
    if(categoria){
        categoria.descricao = prompt(`Descrição: (${categoria.descricao}) `, categoria.descricao);
        console.log(`Categoria ID# ${categoria.id} atualizada com sucesso!`);
        await this.controller.save(categoria);
    } else {
      console.log('Categoria não encontrada!');
    }
  }

  private async delete (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let categoria: Categorias | null = await this.controller.find(id);
    if (categoria) {
      await this.controller.delete(categoria);
      console.log(`Categoria ID #${id} excluída com sucesso!`);
    } else {    
      console.log('Categoria não encontrada!');
    }
  }
  
}