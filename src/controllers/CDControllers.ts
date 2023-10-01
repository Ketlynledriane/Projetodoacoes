import { CD } from "../models/CD";
import { Cidades } from "../models/Cidades";
import { Request, Response } from 'express';
import { ILike } from "typeorm";

export class CDControllers {
    async list (req: Request, res: Response): Promise<Response> {
        let nome = req.query.nome;
                
        let centro: CD[] = await CD.findBy({
            nome: nome ? ILike(`%${nome}%`) : undefined
        });

        return res.status(200).json(centro);
    }

    async find (req: Request, res: Response): Promise<Response> {
      let cd: CD = res.locals.cd;

      return res.status(200).json(cd);
    }

    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
       
        let cd: CD = await CD.create({
            nome: body.nome,
            id_cidade: body.id_cidade,
        }).save();
    
        return res.status(200).json(cd);
    }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let cd: CD = res.locals.cd;

        cd.nome = body.nome,
        cd.id_cidade = body.id_cidade,
        await cd.save();
    
        return res.status(200).json(cd);
    } 

    async delete (req: Request, res: Response): Promise<Response> {
    let cd: CD = res.locals.cd;

    cd.remove();
    
    return res.status(200).json();

    }
}