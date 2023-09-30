import { ILike} from 'typeorm';
import { Request, Response } from 'express';
import { Beneficiarios } from '../models/Beneficiarios';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export class BeneficiariosControllers {

    async list (req: Request, res: Response): Promise<Response> {
        let nome = req.query.nome;
    
        let users: Beneficiarios[] = await Beneficiarios.findBy({
          nome: nome ? ILike(`%${nome}`) : undefined
        });
    
        return res.status(200).json(users);
    
      }
    
      async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
    
        console.log(body);
    
        let beneficiairo: Beneficiarios = await Beneficiarios.create({
          nome: body.nome,
          cpf: body.cpf,
          id_cidade: body.id_cidade
        }).save();
    
        return res.status(200).json(beneficiairo);
      }
    
    
      async delete (req: Request, res: Response): Promise<Response> {
        let id = Number(req.params.id);
    
        let beneficiairo: Beneficiarios|null = await Beneficiarios.findOneBy({ id });
        if (! beneficiairo) {
          return res.status(422).json({ error: 'Usuario não encontrado!' });
        }
    
        beneficiairo.remove();
    
        return res.status(200).json();
      }

      async find (req: Request, res: Response): Promise<Response> {
        let beneficiairo: Beneficiarios= res.locals.beneficiairo;
        return res.status(200).json(beneficiairo);
    
     }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let beneficiairo: Beneficiarios = res.locals.beneficiairo;
    
        beneficiairo.nome = body.nome,
        beneficiairo.cpf = body.cpf,
        beneficiairo.id_cidade = body.id_cidade,
        await beneficiairo.save();
    
        return res.status(200).json(beneficiairo);
    }
 
}
