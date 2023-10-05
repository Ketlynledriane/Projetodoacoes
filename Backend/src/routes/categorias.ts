import { NextFunction, Router, Request, Response } from "express";
import { CategoriasController } from "../controllers/Categoriascontroller";
import * as yup from 'yup';
import { Categorias } from "../models/Categorias";

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
    let schema = yup.object({
        descricao: yup.string().min(3).max(255).required(),
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
    let categoria: Categorias|null = await Categorias.findOneBy ({ id });
    if ( ! categoria) {
        return res.status(422).json({error: 'Categoria não encontrado!' });
    }
    
    res.locals.categoria = categoria;
    
    return next();
}

let router : Router = Router();

let categoriaController: CategoriasController = new CategoriasController();

router.get('/categorias', categoriaController.list);

router.post('/categorias', validarPayload, categoriaController.create);

router.put('/categorias/:id', validarSeExiste, categoriaController.update);

router.delete('/categorias/:id', categoriaController.delete);

router.get('/categorias/:id', validarSeExiste, categoriaController.find);

export default router;
