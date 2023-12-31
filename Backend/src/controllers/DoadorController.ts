import { Doador } from '../models/Doador';
import { Request, Response } from 'express';
import { ILike } from "typeorm";
import { Cidades } from '../models/Cidades';
let md5 = require('md5');

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

        let cidade = await Cidades.findOneBy({ id: body.id_cidade}) as Cidades;

        if (!cidade) {
            return res.status(422).json({
                message: "Cidade não existe"
            });
        }
        
        let doador: Doador = await Doador.create({
            nome: body.nome,
            cpf: body.cpf,
            cidade: cidade,
        }).save();
    
        return res.status(200).json(doador);
    }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let doador: Doador = res.locals.doador;

        let cidade = await Cidades.findOneBy({ id: body.id_cidade});

        if (!cidade) {
            return res.status(422).json({
                message: "Cidade não existe"
            });
        }

        doador.nome = body.nome;
        doador.cpf = body.cpf
        doador.cidade = cidade;
        await doador.save();
    
        return res.status(200).json(doador);
    } 

    async delete (req: Request, res: Response): Promise<Response> {
    let doador: Doador = res.locals.doador;

    doador.remove();
    
    return res.status(200).json();

    }
    
}