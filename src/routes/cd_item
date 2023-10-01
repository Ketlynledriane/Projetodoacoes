import { NextFunction, Router, Request, Response } from "express";
import { CD_ItensController} from "../controllers/CD_ItensController";
import { CD_Itens } from "../models/CD_Itens";
import * as yup from 'yup';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
    let schema = yup.object({
        id_itens: yup.number().required(),
        id_cd: yup.number().required(),
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
    let cd_item: CD_Itens|null = await CD_Itens.findOneBy ({ id });
    if ( ! cd_item) {
        return res.status(422).json({error: 'cd_item não encontrado!' });
    }
    
    res.locals.cd_item = cd_item;
    
    return next();
}

let router : Router = Router();

let cd_itemController: CD_ItensController = new CD_ItensController();

router.get('/cd_item', cd_itemController.list);

router.post('/cd_item', validarPayload, cd_itemController.create);

router.put('/cd_item/:id', validarSeExiste, cd_itemController.update);

router.delete('/cd_item/:id', cd_itemController.delete);

router.get('/cd_item/:id', validarSeExiste, cd_itemController.find);

export default router;