import { Doador } from "../models/Doador";
import { Beneficiarios } from "../models/Beneficiarios";
import PromptSync from "prompt-sync";
import { Movimentacao } from "../models/Movimentacao";
import { MovimentacaoRequest } from "../routes/movimentacao";
import { Request, Response } from 'express';
import { CD_Itens } from "../models/CD_Itens";
import AppDataSource from "../db";
const prompt = PromptSync();

export class MovimentacoesController {

    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body as any as MovimentacaoRequest;

        let coluna = "";
        let objeto = null;

        if (body.tipo == "doacao") {
            coluna = "doador";
            if (!body.doador_id) {   
                objeto = null;            
            } else {
                objeto = await Doador.findOneBy({ id: body.doador_id });
            }
        } else {
            coluna = "beneficiario";
            objeto = await Beneficiarios.findOneBy({ id: body.beneficiario_id });
        }

        let cdItem = await CD_Itens.findOneBy({id_cd: body.cd_id, id_itens: body.item_id}) 
        if (! cdItem ) {
            cdItem = await CD_Itens.create({
                id_cd: body.cd_id,
                id_itens: body.item_id,
                estoque: body.quantidade
            }).save();
        } else {
            cdItem.estoque = (cdItem.estoque || 0) + body.quantidade;
            await cdItem.save();
        }

        await Movimentacao.create({
            data_hora: new Date,
            tipo: body.tipo,
            cd_item_id: cdItem.id,
            quantidade: body.quantidade,
            [coluna]: objeto
        } as any).save();

        return res.status(201).json({message: "Criado com sucesso!"});
    }

    async delete (req: Request, res: Response): Promise<Response> {
        let movimentacao: Movimentacao = res.locals.movimentacao;

        movimentacao.remove();

        return res.status(204)
}
    
    async list (req: Request, res: Response): Promise<Response> {
        const movimentacoes = await AppDataSource.getRepository(Movimentacao).find({
            where: {
                tipo: res.locals.tipo
            },
            relations: {
                cd_item: {
                    item: true,
                }
            },
        })


        // let listar = await Movimentacao.find();

        return res.status(200).json(movimentacoes)
    }

    async edit(req: Request, res: Response) {
        let body = req.body;
        let movimentacao: any = res.locals.movimentacao;

        let coluna = "";
        let objeto = null;

        if (body.tipo == "doacao") {
            coluna = "doador";
            if (!body.doador_id) {   
                objeto = null;            
            } else {
                objeto = await Doador.findOneBy({ id: body.doador_id });
            }
        } else {
            coluna = "beneficiario";
            objeto = await Beneficiarios.findOneBy({ id: body.beneficiario_id });
        }

        let cdItem = await CD_Itens.findOneBy({id_cd: body.cd_id, id_itens: body.item_id}) 
        if (! cdItem ) {
            // Remove movimentação antiga
            let oldCdItem = movimentacao.cd_item;
            oldCdItem.estoque = (oldCdItem.estoque || 0) - movimentacao.quantidade;
            await oldCdItem.save();

            cdItem = await CD_Itens.create({
                id_cd: body.cd_id,
                id_itens: body.item_id,
                estoque: body.quantidade
            }).save();
        } else {
            if (movimentacao.cd_item.id != cdItem.id) {
                // remove estoque do antigo
                let oldCdItem = movimentacao.cd_item;
                oldCdItem.estoque = (oldCdItem.estoque || 0) - movimentacao.quantidade;
                await oldCdItem.save();

                // adiciona no novo
                cdItem.estoque = (cdItem.estoque || 0) + body.quantidade;
            } else {
                if (movimentacao.quantidade < body.quantidade) {
                    cdItem.estoque = (cdItem.estoque || 0) + (body.quantidade - movimentacao.quantidade)
                } else {
                    cdItem.estoque = (cdItem.estoque || 0) - (movimentacao.quantidade - body.quantidade)
                }
            }

            await cdItem.save();
        }

        movimentacao.quantidade = body.quantidade;
        movimentacao.cd_item_id = cdItem.id;
        movimentacao[coluna] = objeto; // Doador ou beneficiario

        await movimentacao.save();
        return res.status(200).json(movimentacao);
    }

    async find (req: Request, res: Response): Promise<Response> {
        console.log(1)
        let movimentacao: Movimentacao = res.locals.movimentacao;
        console.log(2)
        return res.status(200).json(movimentacao);
    }

    public async relatorioDoacoes(req: Request, res: Response): Promise<Response> {
        return res.json((await Movimentacao.findBy({ tipo: "doacao"})).map(function (movimentacao) {
            return {
                id: movimentacao.id,
                doador: movimentacao.doador?.nome || "Anônimo",
                item: movimentacao.cd_item.item.descricao,
                categoria: movimentacao.cd_item.item.categoria.descricao,
                quantidade: movimentacao.quantidade,
                momento: movimentacao.data_hora.toLocaleString()
            }
        }));
    }

    public async relatorioRetirada(req: Request, res: Response): Promise<Response> {
        return res.json((await Movimentacao.findBy({ tipo: ""})).map(function (movimentacao) {
            return {
                id: movimentacao.id,
                beneficiario: movimentacao.beneficiario?.nome,
                item: movimentacao.cd_item.item.descricao,
                categoria: movimentacao.cd_item.item.categoria.descricao,
                quantidade: movimentacao.quantidade,
                momento: movimentacao.data_hora.toLocaleString()
            }
        }));
    }
}