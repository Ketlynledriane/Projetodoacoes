import { CD_Itens } from "../models/CD_Itens";
import { Request, Response } from 'express';
import { ILike } from "typeorm";

export class CD_ItensController {

    async list (req: Request, res: Response): Promise<Response> {
        let descricao = req.query.descricao;
                
        let cd_itens: CD_Itens[] = await CD_Itens.findBy({
            id_itens: descricao ? ILike(`%${descricao}%`) : undefined
        });

        return res.status(200).json(cd_itens);
    }

    async find (req: Request, res: Response): Promise<Response> {
      let cd_item: CD_Itens = res.locals.cd_item;

      return res.status(200).json(cd_item);
    }

    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
       
        let cd_item: CD_Itens = await CD_Itens.create({
            id_itens: body.id_itens,
            id_cd: body.id_cd,
        }).save();
    
        return res.status(200).json(cd_item);
    }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let cd_item: CD_Itens = res.locals.cd_item;
    
        cd_item.id_itens = body.id_itens,
        cd_item.id_cd = body.id_cd,
        await cd_item.save();
    
        return res.status(200).json(cd_item);
    } 

    async delete (req: Request, res: Response): Promise<Response> {
    let cd_item: CD_Itens = res.locals.cd_item;

    cd_item.remove();
    
    return res.status(200).json();

    }
}