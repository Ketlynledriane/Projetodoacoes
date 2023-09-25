import { MovimentacoesController } from "../controllers/MovimentacoesController";
import { CD } from "../models/CD";
import { CD_Itens } from "../models/CD_Itens";
import { Categorias } from "../models/Categorias";
import { Cidades } from "../models/Cidades";
import { Doador } from "../models/Doador";
import { Itens } from "../models/Itens";
import PromptSync, { Prompt } from "prompt-sync";
import { Movimentacao } from "../models/Movimentacao";
import { Beneficiarios } from "../models/Beneficiarios";
const prompt = PromptSync();

export class MovimentacoesMenu {

    public controller: MovimentacoesController

    constructor() {
        this.controller = new MovimentacoesController();
    }

    public async show() {
        console.log('1 - Receber doação do doador');
        console.log('2 - Entregar doação ao beneficiário');
        console.log('3 - Relatório de doações recebidas');
        console.log('4 - Relatório de doações entregues');
        console.log('0 - Voltar ao menu anterior');
        console.log("");
        let escolha = prompt('Digite a opção escolhida: ')
        await this.execute(escolha);
    }

    public async execute(input: string): Promise<void> {
        switch (input) {
            case '1':
                await this.doar();
                break;
            case '2':
                await this.receber();
                break;
            case '3':
                await this.relatorioDoacoes();
                break;
            case '4':
                await this.relatorioRetirada();
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

    private async doar() {
        let doador = null;
        let anonimo = prompt('Deseja realizar uma doação anônima? Digite [1] para sim ou [2] se o doador deseja ser identificado: ')
        if (anonimo == '2') {
            do {
                console.table(await Doador.find())

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

                    doador = await Doador.create({ cpf: doadorCpf, nome: doadorNome, cidade: cidade }).save();
                    console.log('Doador identificado com sucesso!')

                }
            } while (doador == null);
        }

        let cd = null;
        do {
            console.table(await CD.find())

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
            console.table((await Itens.findBy({ id_categoria: categoria.id }))?.map(item => {
                return {
                    id: item.id,
                    descricao: item.descricao
                }
            }));

            let itemId: number = Number(prompt('Digite o ID do item: '));
            item = await Itens.findOneBy({ id: itemId });
        } while (item == null);

        let quantidade = null;
        do {
            quantidade = Number(prompt('Digite a quantidade do item: '));
        } while (!quantidade || quantidade <= 0);


        let cdItem = await CD_Itens.findOneBy({ id_cd: cd.id, id_itens: item.id });
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
            doador: doador ? doador : undefined,
            beneficiario: undefined
        }).save()
        console.log('Doação efetuada com sucesso!!!')

        prompt("Aperte ENTER para continuar...");
        await this.show();
    }




    private async receber() {
        let beneficiario = null;
        do {
            console.log(await Beneficiarios.find())

            let beneficiarioId: number = Number(prompt('Digite o ID do beneficiário: '));
            beneficiario = await Beneficiarios.findOneBy({ id: beneficiarioId });
        } while (beneficiario == null);


        let cd = null;
        do {
            console.log(await CD.find());

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
            console.table(await Itens.findBy({ id_categoria: categoria.id }))

            let itemId: number = Number(prompt('Digite o ID do item: '));
            item = await Itens.findOneBy({ id: itemId });
        } while (item == null);



        let quantidade = null;
        do {
            quantidade = Number(prompt('Digite a quantidade do item: '));
        } while (!quantidade || quantidade <= 0);

        let cdItem = await CD_Itens.findOneBy({ id_cd: cd.id, id_itens: item.id });
        if (cdItem) {
            cdItem.estoque -= quantidade;
            await cdItem.save();
        } else {
            cdItem = await CD_Itens.create({
                id_itens: item.id,
                id_cd: cd.id,
                estoque: quantidade
            }).save();

            prompt("Aperte ENTER para continuar...");
            await this.show();
        }

        await Movimentacao.create({
            data_hora: new Date,
            tipo: "retirada",
            cd_item_id: cdItem.id,
            quantidade: quantidade,
            cd,
            beneficiario: beneficiario ? beneficiario : undefined,
            doador: undefined
        }).save()
        console.log('Benefício recebido com sucesso!!!')
        
    }

    public async relatorioDoacoes() {
        console.table((await Movimentacao.findBy({ tipo: "doacao"})).map(function (movimentacao) {
            return {
                id: movimentacao.id,
                doador: movimentacao.doador?.nome || "Anônimo",
                item: movimentacao.cd_item.item.descricao,
                categoria: movimentacao.cd_item.item.categoria.descricao,
                quantidade: movimentacao.quantidade,
                momento: movimentacao.data_hora.toLocaleString()
            }
        }));

        prompt("Aperte ENTER para continuar...");
        await this.show();
    }

    public async relatorioRetirada() {
        console.table((await Movimentacao.findBy({ tipo: "retirada"})).map(function (movimentacao) {
            return {
                id: movimentacao.id,
                beneficiario: movimentacao.beneficiario?.nome,
                item: movimentacao.cd_item.item.descricao,
                categoria: movimentacao.cd_item.item.categoria.descricao,
                quantidade: movimentacao.quantidade,
                momento: movimentacao.data_hora.toLocaleString()
            }
        }));

        prompt("Aperte ENTER para continuar...");
        await this.show();
    }
}

