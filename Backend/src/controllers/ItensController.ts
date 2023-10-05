import { Itens } from "../models/Itens";
import { ILike } from "typeorm";
import { Request, Response} from 'express';

export class ItensController {

    async list (req: Request, res: Response): Promise<Response> {
        let descricao: Itens[] = await Itens.find();

        return res.status(200).json(descricao);
    }

    async find (req: Request, res: Response): Promise<Response> {
      let item: Itens = res.locals.item;

      return res.status(200).json(item);
    }

    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
       
        let item: Itens = await Itens.create({
            descricao: body.descricao,
            id_categoria: body.id_categoria,
        }).save();
    
        return res.status(200).json(item);
    }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let item: Itens = res.locals.item;

        item.descricao = body.descricao,
        item.id_categoria = body.id_categoria,
        await item.save();
    
        return res.status(200).json(item);
    } 

    async delete (req: Request, res: Response): Promise<Response> {
    let item: Itens = res.locals.item;

    item.remove();
    
    return res.status(200).json();

    }
}
