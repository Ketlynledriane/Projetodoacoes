import { CDControllers } from "../controllers/CDControllers";
import { CD } from "../models/CD";
import PromptSync from "prompt-sync";
import { Cidades } from "../models/Cidades";
const prompt = PromptSync();

export class CDMenu {

    public controller: CDControllers;

    constructor() {
        this.controller = new CDControllers();
    }

    public show(): void {
        console.log('25 - Cadastrar novo CD');
        console.log('26 - Editar CD');
        console.log('27 - Listar CD');
        console.log('28 - Excluir CD');
    }

    public async execute(input: string): Promise<void> {
        switch (input) {
            case '25':
                await this.create();
                break;
            case '26':
                await this.edit();
                break;
            case '27':
                await this.list();
                break;
            case '28':
                await this.delete();
                break;
        }
    }

    private async create(): Promise<void> {
        let nome: string = prompt('Digite o nome do CD: ');
        
        let cidade = null;
        do {
            let cidadeId: number = Number(prompt('Digite o ID da cidade: '));
            cidade = await Cidades.findOneBy({ id: cidadeId });
        } while (cidade == null);


        let cd: CD = await this.controller.create(nome, cidade);
        console.log(`CD ID #${cd.id} criado com sucesso!`);
    }
}