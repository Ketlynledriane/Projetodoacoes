import { MovimentacoesController } from "../controllers/MovimentacoesController";
import { Categorias } from "../models/Categorias";
import { Itens } from "../models/Itens";
import PromptSync from "prompt-sync";
const prompt = PromptSync();

export class MovimentacoesMenu {

    public controller: MovimentacoesController
    
    constructor () {
        this.controller = new MovimentacoesController();
    }

    public show (): void {
        console.log('29 - Efetuar doação');
        console.log('30 - Receber doação');
    }

    public async execute(input: string): Promise<void> {
        switch (input) {
            case '29':
                await this.doar();
                break;
            //case '2':
             //   await this.doar();
              //  break;
        }
    }

    async doar () {
        let categoria = null;
        do {
            console.log(await Categorias.find())

            let categoriaId: number = Number(prompt('Digite o ID da categoria: '));
            categoria = await Categorias.findOneBy({ id: categoriaId });
        } while (categoria == null);

        let item = null;
        do {
            console.log(await Itens.findBy({ id_categoria: categoria.id}))

            let itemId: number = Number(prompt('Digite o ID do item: '));
            item = await Itens.findOneBy({ id: itemId });
        } while (item == null);

        let quantidade = null;
        do {

            quantidade = Number(prompt('Digite a quantidade do item: '));
        } while (!quantidade || quantidade <= 0);
    }
}