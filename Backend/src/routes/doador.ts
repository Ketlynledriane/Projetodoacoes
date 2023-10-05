import { NextFunction, Request, Response, Router } from 'express';
import * as yup from 'yup';
import { Doador } from '../models/Doador';
import { DoadorController } from '../controllers/DoadorController';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
  let schema = yup.object({
    nome: yup.string().min(3).max(255).required(),
    cpf: yup.string().min(3).max(11).required(),
    id_cidade: yup.number().required(),
  })

  let payload = req.body;

  try{
  let resultado = await schema.validate(payload, { abortEarly: false, stripUnknown: true });
  return next();
  }catch(error){
    if (error){
      if (error instanceof yup.ValidationError){
        return res.status(400).json({errors: error.errors});
      }
      return res.status(500).json({ error: 'Ops! Algo deu errado!'});
    }

  }
}

async function validarSeExiste (req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    let id = Number(req.params.id);

    let doador: Doador|null = await Doador.findOneBy({ id });
    if (! doador) {
      return res.status(422).json({ error: 'Doador não encontrado!' });
    }

  res.locals.doador = doador;

 return next();
}


let router: Router = Router();

let beneficiarioController: DoadorController = new DoadorController();

// router.get('/doador', DoadorController.list);

// router.get('/doador/:id', validarSeExiste, DoadorController.find);

// router.post('/doador', validarPayload, DoadorController.create);

// router.put('/doador/:id', validarSeExiste, DoadorController.update);

// router.delete('/doador/:id', DoadorController.delete);

export default router;

