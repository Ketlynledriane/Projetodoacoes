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

        for (let cd_id of Object.keys(body.cds)) {
            let cdData = body.cds[cd_id]; 
            let cdId = Number(cd_id);

            let cdItem = await CD_Itens.findOneBy({
                id_itens: item.id,
                id_cd: cdId,
            });

            if (cdData["ativo"] == "0") {
                console.log("Inativo", cdData, cdItem);
                if (!cdItem) continue;

                await cdItem.remove();
                continue;
            }

            if (!cdItem) {
                cdItem = await CD_Itens.create({
                    id_itens: item.id,
                    id_cd: cdId,
                    estoque: 0
                }).save();
            }

            cdItem.estoque = cdData.estoque ? Number(cdData.estoque) : 0;
            await cdItem.save();
        }

    
        return res.status(201).json(item);
    }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let item: Itens = res.locals.item;

        item.descricao = body.descricao,
        item.id_categoria = body.id_categoria,
        await item.save();

        for (let cd_id of Object.keys(body.cds)) {
            let cdData = body.cds[cd_id]; 
            let cdId = Number(cd_id);

            let cdItem = await CD_Itens.findOneBy({
                id_itens: item.id,
                id_cd: cdId,
            });

            if (cdData["ativo"] == "0") {
                console.log("Inativo", cdData, cdItem);
                if (!cdItem) continue;

                await cdItem.remove();
                continue;
            }

            if (!cdItem) {
                cdItem = await CD_Itens.create({
                    id_itens: item.id,
                    id_cd: cdId,
                    estoque: 0
                }).save();
            }

            cdItem.estoque = cdData.estoque ? Number(cdData.estoque) : 0;
            await cdItem.save();
        }

    
        return res.status(200).json(item);
    } 

    async delete (req: Request, res: Response): Promise<Response> {
    let item: Itens = res.locals.item;

    item.remove();
    
    return res.status(200).json();

    }
}
