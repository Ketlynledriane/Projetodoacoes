import { Itens } from '../models/Itens';
import { ItensController } from '../controllers/ItensController';
import promptSync from 'prompt-sync';
const prompt = promptSync();

export class ItesnMenu {

  public controller: ItensController;

  constructor() {
    this.controller = new ItensController();
  }

  public async show() {
    console.log('1 - Cadastrar novo item');
    console.log('2 - Editar item');
    console.log('3 - Listar item');
    console.log('4 - Excluir item');
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
    let itens: Itens[] | null = await this.controller.list();

    console.table(itens?.map(function (itens: Itens) {
      return {
        id: itens.id,
        descricao: itens.descricao,
        id_categoria: itens.id_categoria
      }
    }));
    prompt("Aperte ENTER para continuar...");
    await this.show();
  }

  private async create(): Promise<void> {
    let descricao: string = prompt('Digite a descrição do item: ');
    let id_categoria: number = Number(prompt('Digite o ID da categoria: '));
    let itens: Itens = await this.controller.create(descricao, id_categoria);
    console.log(`Item ID #${itens.id} criado com sucesso!`);

    prompt("Aperte ENTER para continuar...");
    await this.show();
  }

  private async edit(): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let itens: Itens | null = await this.controller.find(id);
    if (itens) {
      itens.descricao = prompt(`Descrição (${itens.descricao}): `, itens.descricao);
      itens.id_categoria = Number(prompt(`Número da categoria (${itens.id_categoria}): `, String(itens.id_categoria)));
      console.log(itens.id_categoria)
      //      itens.id_categoria = Number (prompt(`Número da categoria (${itens.id_categoria}): `, itens.id_categoria));
      console.log(`Item ID# ${itens.id} atualizado com sucesso!`);
      await this.controller.save(itens);
    } else {
      console.log('Item não encontrado!');
    }
    prompt("Aperte ENTER para continuar...");
    await this.show();
  }

  private async delete(): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let itens: Itens | null = await this.controller.find(id);
    if (itens) {
      await this.controller.delete(itens);
      console.log(`Item ID #${id} excluído com sucesso!`);
    } else {
      console.log('Item não encontrado!');
    }
    prompt("Aperte ENTER para continuar...");
    await this.show();
  }

}