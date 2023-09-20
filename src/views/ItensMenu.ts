import { CategoriasController } from '../controllers/Categoriascontroller';
import { Itens } from '../models/Itens';
import { ItensController } from '../controllers/ItensController'; 
import promptSync from 'prompt-sync';
const prompt = promptSync();

export class ItesnMenu {

  public controller: ItensController;

  constructor () {
    this.controller = new ItensController();
  }

  public show (): void {
      console.log('9 - Cadastrar novo item');
      console.log('10 - Editar item');
      console.log('11 - Listar item');
      console.log('12 - Excluir item');
  }

  public async execute (input: string): Promise<void> {
    switch (input) {
      case '9':
        await this.create();
        break;
      case '10':
        await this.edit();
        break;
      case '11':
        await this.list();
        break;
      case '12':
        await this.delete();
        break;
    }
  }

  private async list (): Promise<void> {
    let itens: Itens[] | null = await this.controller.list();

    console.table(itens?.map(function (itens: Itens) {
      return {
        id: itens.id,
        descricao: itens.descricao,
        id_categoria: itens.id_categoria
      }
    }));
  }

  private async create (): Promise<void> {
    let descricao: string = prompt('Digite a descrição do item: ');
    let id_categoria: number = Number(prompt('Digite o ID da categoria: '));
    let itens: Itens = await this.controller.create(descricao, id_categoria);
    console.log(`Item ID #${itens.id} criado com sucesso!`);
  }

  private async edit (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let itens: Itens | null = await this.controller.find(id);
    if(itens){
        itens.descricao = prompt(`Descrição (${itens.descricao}): `, itens.descricao);
        itens.id_categoria = Number(prompt(`Número da categoria (${itens.id_categoria}): `, String(itens.id_categoria)));     
        console.log(itens.id_categoria)
        console.log(`Item ID# ${itens.id} atualizado com sucesso!`);
        await this.controller.save(itens);
    } else {
      console.log('Item não encontrado!');
    }
  }

  private async delete (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let itens: Itens | null = await this.controller.find(id);
    if (itens) {
      await this.controller.delete(itens);
      console.log(`Item ID #${id} excluído com sucesso!`);
    } else {    
      console.log('Item não encontrado!');
    }
  }
  
}