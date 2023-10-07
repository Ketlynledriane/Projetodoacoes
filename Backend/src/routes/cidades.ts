import { NextFunction, Request, Response, Router } from 'express';
import { CidadesController} from '../controllers/CidadesController';
import * as yup from 'yup';
import { Cidades } from '../models/Cidades';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
  let schema = yup.object({
    nome: yup.string().min(3).max(255).required(),
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

    let cidade: Cidades|null = await Cidades.findOneBy({ id });
    if (! cidade) {
      return res.status(422).json({ error: 'Cidade não encontrada!' });
    }

  res.locals.cidade = cidade;

    return next();
}


let router: Router = Router();

let cidadeController: CidadesController = new CidadesController();

router.get('/cidades', cidadeController.list);

router.get('/cidades/:id', validarSeExiste, cidadeController.find);

router.post('/cidades', validarPayload, cidadeController.create);

router.put('/cidades/:id', validarSeExiste, cidadeController.update);

router.delete('/cidades/:id', cidadeController.delete);

export default router;
