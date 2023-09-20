<<<<<<< HEAD
import { Beneficiarios } from '../models/Beneficiarios';
import promptSync from 'prompt-sync';
=======
/*import { Beneficiarios } from "../models/Beneficiarios";
import promptSync from 'prompt-sync';
let md5 = require('md5');
>>>>>>> e640998 (crud cidades)

const prompt = promptSync();

export class BeneficiariosControllers {

    async list (): Promise<Beneficiarios[]> {
        return await Beneficiarios.find();
    }

<<<<<<< HEAD
    async create (nome: string, id_cidade: number) {

        let beneficiario: Beneficiarios = Beneficiarios.create({
            nome,
            id_cidade,
           });
        await beneficiario.save();
        return beneficiario;
=======
    async create (nome: string) {

        let usuario: Beneficiarios = Beneficiarios.create({
            nome,
           });
        await Beneficiarios.save();
        return Beneficiarios;
>>>>>>> e640998 (crud cidades)
    }
    
    async delete (beneficiario: Beneficiarios) {
        await Beneficiarios.remove(beneficiario);
    }

    async find(id: number): Promise<Beneficiarios | null>{
        let beneficiario: Beneficiarios | null = await Beneficiarios.findOneBy({id: id});
        return beneficiario;
    }
<<<<<<< HEAD
    async save(beneficiario: Beneficiarios): Promise<void>{
        await beneficiario.save();
    }
 
}
=======
 
}*/
>>>>>>> e640998 (crud cidades)
