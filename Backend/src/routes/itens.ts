import { NextFunction, Router, Request, Response } from "express";
import { ItensController } from "../controllers/ItensController";
import { Itens } from "../models/Itens";
import * as yup from 'yup';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
    let schema = yup.object({
        descricao: yup.string().min(3).max(255).required(),
        id_categoria: yup.number().required(),
        id_cd: yup.number().required()
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
    let item: Itens|null = await Itens.findOneBy ({ id });
    if ( ! item) {
        return res.status(422).json({error: 'Item não encontrado!' });
    }
    
    res.locals.item = item;
    
    return next();
}

let router : Router = Router();

let itemController: ItensController = new ItensController();

router.get('/itens', itemController.list);

router.post('/itens', validarPayload, itemController.create);

router.put('/itens/:id', validarSeExiste, itemController.update);

router.delete('/itens/:id', validarSeExiste, itemController.delete);

router.get('/itens/:id', validarSeExiste, itemController.find);

export default router;