import { Doador } from "../models/Doador";
import { Beneficiarios } from "../models/Beneficiarios";
import PromptSync from "prompt-sync";
import { Movimentacao } from "../models/Movimentacao";
import { MovimentacaoRequest } from "../routes/movimentacao";
import { Request, Response } from 'express';
const prompt = PromptSync();

export class MovimentacoesController {

    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body as any as MovimentacaoRequest;

        var coluna = "";
        var objeto = null;

        if (body.tipo == "doacao") {
            coluna = "doador";
            objeto = await Doador.findOneBy({ id: body.doador_id });
        } else {
            coluna = "beneficiario";
            objeto = await Beneficiarios.findOneBy({ id: body.beneficiario_id });
        }

        await Movimentacao.create({
            data_hora: new Date,
            tipo: body.tipo,
            cd_item_id: body.item_id,
            quantidade: body.quantidade,
            [coluna]: objeto
        } as any).save();

        return res.status(201).json({message: "Criado com sucesso!"});
    }
        // Falta terminar o listar, está com erro 
    async list (req: Request, res: Response): Promise<Response> {
        let listar = await Movimentacao.find();
        return res.status(200).json({movimentacoes: listar})
    }

    async find(id: number): Promise<Movimentacao | null>{
        let movimentacao: Movimentacao | null = await Movimentacao.findOneBy({id: id});
        return movimentacao;
    }

    async save(movimentacao: Movimentacao): Promise<void>{
        await movimentacao.save();
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
