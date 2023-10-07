import { Cidades } from "../models/Cidades";
import { ILike} from 'typeorm';
import { Request, Response } from 'express';
import promptSync from 'prompt-sync';

export class CidadesController {

    async list (req: Request, res: Response): Promise<Response> {
        let city: Cidades[] = await Cidades.find();

        return res.status(200).json(city);
    }


    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
       
        let cidade: Cidades = await Cidades.create({
            nome: body.nome,
        }).save();
    
        return res.status(200).json(cidade);
    }
    async delete (req: Request, res: Response): Promise<Response> {
        let cidade: Cidades= res.locals.cidade;
    
        cidade.remove();
        
        return res.status(200).json();
    }

    async find (req: Request, res: Response): Promise<Response> {
        let cidade: Cidades = res.locals.cidade;
  
        return res.status(200).json(cidade);
    }

   
    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let cidade: Cidades = res.locals.cidade;
    
        cidade.nome = body.nome,
        await cidade.save();
    
        return res.status(200).json(cidade);
    }
}