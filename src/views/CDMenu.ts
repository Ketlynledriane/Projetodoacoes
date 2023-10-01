/*import { CDControllers } from "../controllers/CDControllers";
import { CD } from "../models/CD";
import PromptSync from "prompt-sync";
import { Cidades } from "../models/Cidades";
const prompt = PromptSync();

export class CDMenu {

    public controller: CDControllers;

    constructor() {
        this.controller = new CDControllers();
    }

    public async show() {
        console.log('1 - Cadastrar novo CD');
        console.log('2 - Editar CD');
        console.log('3 - Listar CD');
        console.log('4 - Excluir CD');
        console.log('0 - Voltar ao menu anterior')
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

    private async create(): Promise<void> {
        let nome: string = prompt('Digite o nome do CD: ');

        let cidade = null;
        do {
            let cidadeId: number = Number(prompt('Digite o ID da cidade: '));
            cidade = await Cidades.findOneBy({ id: cidadeId });
        } while (cidade == null);

        let cd: CD = await this.controller.create(nome, cidade);
        console.log(`CD ID #${cd.id} criado com sucesso!`);

        prompt("Aperte ENTER para continuar...");
        await this.show();
    }

    private async edit(): Promise<void> {
        let id: number = Number(prompt('Qual o ID? '));
        let cd: CD | null = await this.controller.find(id);
        if (cd) {
            cd.nome = prompt(`Descrição: (${cd.nome}) `, cd.nome);
            console.log(`CD ID# ${cd.id} atualizado com sucesso!`);
            await this.controller.save(cd);
        } else {
            console.log('CD não encontrado!');
        }
        prompt("Aperte ENTER para continuar...");
        await this.show();
    }

    private async list(): Promise<void> {
        let cd: CD[] | null = await this.controller.list();

        console.table(cd?.map(function (cd: CD) {
            return {
                id: cd.id,
                descricao: cd.nome,
            }
        }));
        prompt("Aperte ENTER para continuar...");
        await this.show();
    }

    private async delete(): Promise<void> {
        let id: number = Number(prompt('Qual o ID? '));
        let cd: CD | null = await this.controller.find(id);
        if (cd) {
            await this.controller.delete(cd);
            console.log(`CD ID #${id} excluído com sucesso!`);
        } else {
            console.log('CD não encontrado!');
        }
        prompt("Aperte ENTER para continuar...");
        await this.show();
    }
}
*/

