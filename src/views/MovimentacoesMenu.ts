import { MovimentacoesController } from "../controllers/MovimentacoesController";
import { CD } from "../models/CD";
import { CD_Itens } from "../models/CD_Itens";
import { Categorias } from "../models/Categorias";
import { Cidades } from "../models/Cidades";
import { Doador } from "../models/Doador";
import { Itens } from "../models/Itens";
import PromptSync, { Prompt } from "prompt-sync";
import { Movimentacao } from "../models/Movimentacao";
const prompt = PromptSync();

export class MovimentacoesMenu {

    public controller: MovimentacoesController

    constructor() {
        this.controller = new MovimentacoesController();
    }

    public show(): void {
        console.log('29 - Efetuar doação');
        console.log('30 - Receber doação');
    }

    public async execute(input: string): Promise<void> {
        switch (input) {
            case '29':
                await this.doar();
                break;
            case '30':
                await this.receber();
                break;
        }
    }

    private async doar() {
        let doador = null;
        let anonimo = prompt('Deseja realizar uma doação anônima? Digite [1] para sim ou [2] se deseja se identificar')
        if (anonimo == '2') {
            do {
                console.log(await Doador.find())

                let doadorCpf = prompt('Digite seu cpf: ');
                doador = await Doador.findOneBy({ cpf: doadorCpf });
                if (!doador) {
                    let doadorNome = prompt('Digite o nome do doador: ');
                    let cidade = null;
                    do {
                        console.log(await Cidades.find())

                        let cidadesId: number = Number(prompt('Digite o ID da Cidade do doador: '));
                        cidade = await Cidades.findOneBy({ id: cidadesId });
                    } while (cidade == null);

                    doador = Doador.create({ cpf: doadorCpf, nome: doadorNome, cidade: cidade });
                    console.log('Doador identificado com sucesso!')

                }
            } while (doador == null);
        }

        let cd = null;
        do {
            console.log(await CD.find())

            let cdId: number = Number(prompt('Digite o ID do CD: '));
            cd = await CD.findOneBy({ id: cdId });
        } while (cd == null);

        let categoria = null;
        do {
            console.log(await Categorias.find())

            let categoriaId: number = Number(prompt('Digite o ID da categoria: '));
            categoria = await Categorias.findOneBy({ id: categoriaId });
        } while (categoria == null);

        let item = null;
        do {
            console.log(await Itens.findBy({ id_categoria: categoria.id }))

            let itemId: number = Number(prompt('Digite o ID do item: '));
            item = await Itens.findOneBy({ id: itemId });
        } while (item == null);

        let quantidade = null;
        do {
            quantidade = Number(prompt('Digite a quantidade do item: '));
        } while (!quantidade || quantidade <= 0);


        let cdItem = await CD_Itens.findOneBy({id_cd: cd.id, id_itens: item.id});
        if (cdItem) {
            cdItem.estoque += quantidade;
            await cdItem.save();
        } else {
            cdItem = await CD_Itens.create({
                id_itens: item.id,
                id_cd: cd.id,
                estoque: quantidade
            }).save();
        }

        await Movimentacao.create({
            data_hora: new Date,
            tipo: "doacao",
            cd_item_id: cdItem.id,
            quantidade: quantidade,
            cd,
            doador: doador ? doador: undefined, 
            id_beneficiario: undefined
        }).save()
        console.log('Doação efetuada com sucesso!!!')
    }




    private async receber() {

    }
}