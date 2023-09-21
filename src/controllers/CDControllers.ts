import { CD } from "../models/CD";
import { Cidades } from "../models/Cidades";

export class CDControllers {
    async create (nome: string, cidade: Cidades) {
        let cd: CD = CD.create({
            nome,
            cidade
        });
        await cd.save();
        return cd;
    }

    async list (): Promise<CD[] | null> {
        return await CD.find();
    }

    async delete (cd: CD) {
        await CD.remove(cd);
    }

    async find (id: number): Promise<CD | null>{
        let cd: |CD | null = await CD.findOneBy({id: id});
        return cd;
    }

    async save(cd: CD): Promise<void> {
        await cd.save();
    }
}