import { NextFunction, Router, Request, Response } from "express";
import { CDControllers } from "../controllers/CDControllers";
import { CD } from "../models/CD";
import * as yup from 'yup';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
    let schema = yup.object({
        nome: yup.string().min(3).max(255).required(),
        id_cidade: yup.number().required(),
    });

    let payload = req.body;

    try {
        req.body = await schema.validate(payload, { abortEarly: false, stripUnknown: true});
        return next();
    } catch(error){
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({erros: error.errors});
        }
        return res.status(500).json({error: 'Ops! Algo deu errado!'});
    }
}

async function validarSeExiste (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
    let id = Number (req.params.id);
    let cd: CD|null = await CD.findOneBy ({ id });
    if ( ! cd) {
        return res.status(422).json({error: 'Centro de Distribuição não encontrado!' });
    }
    
    res.locals.usuario = cd;
    
    return next();
}

let router : Router = Router();

let cdController: CDControllers = new CDControllers();

router.get('/cd', cdController.list);

router.post('/cd', validarPayload, cdController.create);

router.put('/cd/:id', validarSeExiste, cdController.update);

router.delete('/cd/:id', cdController.delete);

router.get('/cd/:id', validarSeExiste, cdController.find);

export default router;
