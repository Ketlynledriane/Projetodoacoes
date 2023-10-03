import { Cidades } from "../models/Cidades";
import { ILike} from 'typeorm';
import { Request, Response } from 'express';
import promptSync from 'prompt-sync';

export class CidadesController {

    async list (): Promise<Cidades[] | null> {
        return await Cidades.find();
    }

    async create (nome: string) {
        let cidade: Cidades = Cidades.create({ nome });
        await cidade.save();
        return cidade;
    }

    async delete (cidade: Cidades) {
        await Cidades.remove(cidade)
    }

    async find(id: number): Promise<Cidades | null>{
        let cidade: |Cidades | null = await Cidades.findOneBy({id: id});
        return cidade;
    }

   
    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let cidade: Cidades = res.locals.cidade;
    
        cidade.nome = body.nome,
        await cidade.save();
    
        return res.status(200).json(cidade);
    }
}