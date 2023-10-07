import { Doador } from '../models/Doador';
import { Request, Response } from 'express';

export class DoadorController {

    async list (req: Request, res: Response): Promise<Response> {

        let doador: Doador[] = await Doador.find();

        return res.status(200).json(doador);
    }

    async find (req: Request, res: Response): Promise<Response> {
      let doador: Doador = res.locals.doador;

      return res.status(200).json(doador);
    }

    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let doador: Doador = await Doador.create({
            nome: body.nome,
            cpf: body.cpf,
            cidade: body.cidade,
        }).save();
    
        return res.status(200).json(doador);
    }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let doador: Doador = res.locals.doador;
    
        doador.nome = body.nome,
        doador.cpf = body.cpf,
        doador.cidade = body.cidade, 
        await doador.save();
    
        return res.status(200).json(doador);
    } 

    async delete (req: Request, res: Response): Promise<Response> {
    let doador: Doador = res.locals.doador;

    doador.remove();
    
    return res.status(200).json();

    }
    
}