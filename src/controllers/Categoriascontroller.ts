import { Categorias } from "../models/Categorias";
import { Request, Response } from 'express';
import { ILike } from "typeorm";

export class CategoriasController {

    async list (req: Request, res: Response): Promise<Response> {
        let descricao = req.query.descricao;
                
        let descri: Categorias[] = await Categorias.findBy({
            descricao: descricao ? ILike(`%${descricao}%`) : undefined
        });

        return res.status(200).json(descri);
    }

    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
       
        let categoria: Categorias = await Categorias.create({
            descricao: body.descricao,
        }).save();
    
        return res.status(200).json(categoria);
    }

    async delete (req: Request, res: Response): Promise<Response> {
        let categoria: Categorias = res.locals.categoria;
    
        categoria.remove();
        
        return res.status(200).json();
    }

    async find (req: Request, res: Response): Promise<Response> {
        let categoria: Categorias = res.locals.categoria;
  
        return res.status(200).json(categoria);
    }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let categoria: Categorias = res.locals.categoria;
    
        categoria.descricao = body.descricao,
        await categoria.save();
    
        return res.status(200).json(categoria);
    } 
}