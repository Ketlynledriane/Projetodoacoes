import { NextFunction, Router, Request, Response } from "express";
import { CategoriasController } from "../controllers/Categoriascontroller";
import * as yup from 'yup';
import { Categorias } from "../models/Categorias";
import { Movimentacao } from "../models/Movimentacao";
import { MovimentacoesController } from "../controllers/MovimentacoesController";

export interface MovimentacaoRequest {
    tipo: string;
    item_id: number;
    quantidade: number;
    doador_id: number;
    beneficiario_id: number;
}

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
    let schema = yup.object({
        tipo: yup.string().min(3).max(255).required(),
        item_id: yup.number().required(),
        quantidade: yup.number().min(1).required(),
        doador_id: yup.number(),
        beneficiario_id: yup.number(),
    });

    let payload = req.body;

    try {
        req.body = await schema.validate(payload, { abortEarly: false, stripUnknown: true});
        return next();
    } catch(error){
        if (error instanceof yup.ValidationError) {
            return res.status(422).json({erros: error.errors});
        }
        return res.status(500).json({error: 'Ops! Algo deu errado!'});
    }
}

async function validarSeExiste (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
    let id = Number (req.params.id);
    let movimentacao: Movimentacao|null = await Movimentacao.findOneBy ({ id });
    if ( ! movimentacao) {
        return res.status(422).json({error: 'Movimentação não encontrada!' });
    }
    
    res.locals.movimentacao = movimentacao;
    
    return next();
}

let router : Router = Router();

let movimentacaoController: MovimentacoesController = new MovimentacoesController();

router.get('/movimentacao', movimentacaoController.list);

router.post('/movimentacao', validarPayload, movimentacaoController.create);

router.delete('/movimentacao/:id', movimentacaoController.delete);

router.get('/movimentacao/relatorioDoacoes', movimentacaoController.relatorioDoacoes);

router.get('/movimentacao/relatorioRetirada', movimentacaoController.relatorioRetirada);

router.get('/movimentacao/:id', validarSeExiste, movimentacaoController.find);

export default router;
