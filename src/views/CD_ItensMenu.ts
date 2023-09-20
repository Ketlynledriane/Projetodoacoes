import { CD_Itens } from '../models/CD_Itens';
import { CD_ItensController } from '../controllers/CD_ItensController';
import promptSync from 'prompt-sync';
const prompt = promptSync();

export class CD_ItesnMenu {

  public controller: CD_ItensController;

  constructor () {
    this.controller = new CD_ItensController();
  }

  public show (): void {
      console.log('21 - Cadastrar novo CD_Item');
      console.log('22 - Editar CD_Item');
      console.log('23 - Listar CD_Item');
      console.log('24 - Excluir CD_Item');
  }

  public async execute (input: string): Promise<void> {
    switch (input) {
      case '21':
        await this.create();
        break;
      case '22':
        await this.edit();
        break;
      case '23':
        await this.list();
        break;
      case '24':
        await this.delete();
        break;
    }
  }

  private async list (): Promise<void> {
    let cd_itens: CD_Itens[] | null = await this.controller.list();

    console.table(cd_itens?.map(function (cd_itens: CD_Itens) {
      return {
        id: cd_itens.id,
        id_item: cd_itens.id_itens,
        id_cd: cd_itens.id_cd
      }
    }));
  }

  private async create (): Promise<void> {
    let id_item: number = Number (prompt('Digite o ID do item: '));
    let id_cd: number = Number(prompt('Digite o ID do CD: '));
    let cd_itens: CD_Itens = await this.controller.create(id_item, id_cd);
    console.log(`CD_Item ID #${cd_itens.id} criado com sucesso!`);
  }

  private async edit (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let cd_itens: CD_Itens | null = await this.controller.find(id);
    if(cd_itens){
        cd_itens.id_itens = Number(prompt(`Item (${cd_itens.id_itens}): `, String(cd_itens.id_itens)));
        cd_itens.id_cd = Number (prompt(`CD (${cd_itens.id_cd}): `, String(cd_itens.id_cd)));
        console.log(`CD_Item ID# ${cd_itens.id} atualizado com sucesso!`);
        await this.controller.save(cd_itens);
    } else {
      console.log('CD_Item não encontrado!');
    }
  }

  private async delete (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let cd_itens: CD_Itens | null = await this.controller.find(id);
    if (cd_itens) {
      await this.controller.delete(cd_itens);
      console.log(`CD_Item ID #${id} excluído com sucesso!`);
    } else {    
      console.log('CD_Item não encontrado!');
    }
  }
  
}