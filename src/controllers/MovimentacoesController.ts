import { CD } from "../models/CD";
import { Cidades } from "../models/Cidades";
import { Doador } from "../models/Doador";
import { Beneficiarios } from "../models/Beneficiarios";
import PromptSync from "prompt-sync";
import { Movimentacao } from "../models/Movimentacao";
const prompt = PromptSync();

export class MovimentacoesController {

    async create (id: number, data_hora: Date, tipo: string, cd_item_id: number, quantidade: number, doador: string, id_beneficiario: number) {
        let movimentacoes: Movimentacao = Movimentacao.create({
            id, 
            data_hora,
            tipo,
            cd_item_id,
            quantidade,
            doador,
            id_beneficiario
        })
    }
}