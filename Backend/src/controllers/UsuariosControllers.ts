import { Usuarios } from "../models/Usuarios";
import { Request, Response } from 'express';
import { ILike } from "typeorm";
let md5 = require('md5');

export class UsuariosControllers {

    async list (req: Request, res: Response): Promise<Response> {
        let users: Usuarios[] = await Usuarios.find();

        return res.status(200).json(users);       
    }

    async find (req: Request, res: Response): Promise<Response> {
      let usuario: Usuarios = res.locals.usuario;

      return res.status(200).json(usuario);
    }
       

    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        console.log(body)
       
        let usuario: Usuarios = await Usuarios.create({
            nome: body.nome,
            email: body.email,
            senha: body.senha,
        }).save();
    
        return res.status(200).json(usuario);
    }
    
    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let usuario: Usuarios = res.locals.usuario;
    
        usuario.nome = body.nome,
        usuario.email = body.email,
        usuario.senha = body.senha, 
        await usuario.save();
    
        return res.status(200).json(usuario);
    } 

    async delete (req: Request, res: Response): Promise<Response> {
        let usuario: Usuarios = res.locals.usuario;

        usuario.remove();
        
        return res.status(200).json();
    }
    
    async login (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        // let senha = md5(body.senha);
        let usuarioLogin = await Usuarios.findOneBy({email: body.email, senha: body.senha});

        if (usuarioLogin) {
            return res.status(200).json();
        }

        return res.status(422).json({
            mensagem: "Usuário ou senha incorretos"
        });
    }
}