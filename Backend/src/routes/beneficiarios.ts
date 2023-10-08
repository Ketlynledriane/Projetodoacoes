import { NextFunction, Request, Response, Router } from 'express';
import { BeneficiariosControllers } from '../controllers/BeneficiariosController';
import * as yup from 'yup';
import { Beneficiarios } from '../models/Beneficiarios';

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

    let beneficiario: Beneficiarios|null = await Beneficiarios.findOneBy({ id });
    if (! beneficiario) {
      return res.status(422).json({ error: 'Beneficiario não encontrado!' });
    }

  res.locals.beneficiario = beneficiario;

 return next();
}


let router: Router = Router();

let beneficiarioController: BeneficiariosControllers = new BeneficiariosControllers();

router.get('/beneficiarios', beneficiarioController.list);

router.get('/beneficiarios/:id', validarSeExiste, beneficiarioController.find);

router.post('/beneficiarios', validarPayload, beneficiarioController.create);

router.put('/beneficiarios/:id', validarSeExiste, beneficiarioController.update);

router.delete('/beneficiarios/:id', beneficiarioController.delete);

export default router;

