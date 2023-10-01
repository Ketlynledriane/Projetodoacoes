import { NextFunction, Router, Request, Response } from "express";
import { UsuariosControllers } from "../controllers/UsuariosControllers";
import { Usuarios } from "../models/Usuarios";
import * as yup from 'yup';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
    let schema = yup.object({
        nome: yup.string().min(3).max(255).required(),
        email: yup.string().email().required(),
        senha: yup.string().min(6).max(16).required(),
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
    let usuario: Usuarios|null = await Usuarios.findOneBy ({ id });
    if ( ! usuario) {
        return res.status(422).json({error: 'Usuario não encontrado!' });
    }
    
    res.locals.usuario = usuario;
    
    return next();
}

let router : Router = Router();

let usuarioController: UsuariosControllers = new UsuariosControllers();

router.get('/usuario', usuarioController.list);

router.post('/usuario', validarPayload, usuarioController.create);

router.put('/usuario/:id', validarSeExiste, usuarioController.update);

router.delete('/usuario/:id', usuarioController.delete);

router.get('/usuario/:id', validarSeExiste, usuarioController.find);

export default router;
