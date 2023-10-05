import { Usuarios } from "../models/Usuarios";
let md5 = require('md5');

export class LoginController{
    
    public usuario: Usuarios;

    constructor(){
        this.usuario = new Usuarios();
    }

    async procurarUsuario(email: string, senha: string): Promise<Usuarios | null>{
        senha = md5(senha);
        let usuarioLogin = await Usuarios.findOneBy({email: email,senha: senha});

        // Retorna o usuário autenticado para ser utilizado mais tarde caso necessário
        return usuarioLogin;
    }

}