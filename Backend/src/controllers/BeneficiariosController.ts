import { ILike} from 'typeorm';
import { Request, Response } from 'express';
import { Beneficiarios } from '../models/Beneficiarios';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export class BeneficiariosControllers {

    async list (req: Request, res: Response): Promise<Response> {
      let beneficiario: Beneficiarios[] = await Beneficiarios.find();

      return res.status(200).json(beneficiario);
    
    }
    
    async create (req: Request, res: Response): Promise<Response> {
      let body = req.body;
    
      console.log(body);
    
      let beneficiario: Beneficiarios = await Beneficiarios.create({
        nome: body.nome,
        cpf: body.cpf,
        id_cidade: body.id_cidade
      }).save();
    
        return res.status(200).json(beneficiario);
    }
    
    
    
    async delete (req: Request, res: Response): Promise<Response> {
      let id = Number(req.params.id);
    
      let beneficiario: Beneficiarios|null = await Beneficiarios.findOneBy({ id });
      if (! beneficiario) {
        return res.status(422).json({ error: 'Beneficiario não encontrado!' });
      }
    
      beneficiario.remove();
    
      return res.status(200).json();
    }

    async find (req: Request, res: Response): Promise<Response> {
      let beneficiario: Beneficiarios= res.locals.beneficiario;
      return res.status(200).json(beneficiario);
    
    }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let beneficiario: Beneficiarios = res.locals.beneficiario;
    
        beneficiario.nome = body.nome,
        beneficiario.cpf = body.cpf,
        beneficiario.id_cidade = body.id_cidade,
        await beneficiario.save();
    
        return res.status(200).json(beneficiario);
    }
}
