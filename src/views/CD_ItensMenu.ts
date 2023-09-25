import { CD_Itens } from '../models/CD_Itens';
import { CD_ItensController } from '../controllers/CD_ItensController';
import promptSync from 'prompt-sync';
import { Itens } from '../models/Itens';
const prompt = promptSync();

export class CD_ItesnMenu {

  public controller: CD_ItensController;

  constructor () {
    this.controller = new CD_ItensController();
  }

  public async show () {
      console.log('1 - Listar estoque');
      console.log('0 - Voltar ao menu anterior');
      console.log("");
      let escolha = prompt('Digite a opção escolhida: ')
      await this.execute(escolha);
  }

  public async execute (input: string): Promise<void> {
    switch (input) {
      case '1':
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

  private async list (): Promise<void> {
    let cd_itens: CD_Itens[] | null = await this.controller.list();

    console.table(cd_itens?.map(function (cd_itens: CD_Itens) {
      return {
        id: cd_itens.id,
        id_item: cd_itens.item.descricao,
        id_cd: cd_itens.id_cd
      }
    }));
    prompt("Aperte ENTER para continuar...");
    await this.show();
  }
}