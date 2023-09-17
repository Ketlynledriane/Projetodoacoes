import { Usuarios } from "../models/Usuarios";
import promptSync from 'prompt-sync';
let md5 = require('md5');

const prompt = promptSync();

export class UsuariosControllers {

    async list (): Promise<Usuarios[]> {
        return await Usuarios.find();
    }

    async create (nome: string, email:string, senha:string) {
        senha = md5(senha);

        let usuario: Usuarios = Usuarios.create({
            nome,
            senha,
            email,
        });
        await usuario.save();
        return usuario;
    }
    
    async delete (usuario: Usuarios) {
        await Usuarios.remove(usuario);
    }

    async find(id: number): Promise<Usuarios | null>{
        let usuario: Usuarios | null = await Usuarios.findOneBy({id: id});
        return usuario;
    }

    async save(usuario: Usuarios): Promise<void>{
        usuario.senha = md5(usuario.senha);
        await usuario.save();
    }
    
}