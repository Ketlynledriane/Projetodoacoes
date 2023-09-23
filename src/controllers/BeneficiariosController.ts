import { Beneficiarios } from '../models/Beneficiarios';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export class BeneficiariosControllers {

    async list (): Promise<Beneficiarios[]> {
        return await Beneficiarios.find();
    }

    async create (nome: string, id_cidade: number, cpf: string) {

        let beneficiario: Beneficiarios = Beneficiarios.create({
            nome,
            id_cidade,
            cpf
        });
        await beneficiario.save();
        return beneficiario;
    }
    
    async delete (beneficiario: Beneficiarios) {
        await Beneficiarios.remove(beneficiario);
    }

    async find(id: number): Promise<Beneficiarios | null>{
        let beneficiario: Beneficiarios | null = await Beneficiarios.findOneBy({id: id});
        return beneficiario;
    }
    async save(beneficiario: Beneficiarios): Promise<void>{
        await beneficiario.save();
    }
 
}
