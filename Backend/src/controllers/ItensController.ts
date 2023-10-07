import { Itens } from "../models/Itens";
import { ILike } from "typeorm";
import { Request, Response} from 'express';
import { CD_Itens } from "../models/CD_Itens";

export class ItensController {

    async list (req: Request, res: Response): Promise<Response> {
        let itens: Itens[] = await Itens.find();

        return res.status(200).json(itens);
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

        await body.cds?.forEach(async (cd_id: number) => {
            await CD_Itens.create({
                id_itens: item.id,
                id_cd: cd_id,
                estoque: 0
            }).save();
        });
    
        return res.status(201).json(item);
    }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let item: Itens = res.locals.item;

        item.descricao = body.descricao,
        item.id_categoria = body.id_categoria,
        await item.save();


        await body.cds?.forEach(async (cd_id: number) => {
            let existe = await CD_Itens.findOneBy({
                id_itens: item.id,
                id_cd: cd_id,
            })

            if (!existe) {
                await CD_Itens.create({
                    id_itens: item.id,
                    id_cd: cd_id,
                    estoque: 0
                }).save();
            }

            // Se ja existe, ignorar
        });

        // TODO - Permitir remover CDs?

    
        return res.status(200).json(item);
    } 

    async delete (req: Request, res: Response): Promise<Response> {
    let item: Itens = res.locals.item;

    item.remove();
    
    return res.status(200).json();

    }
}
