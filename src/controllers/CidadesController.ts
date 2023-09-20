import { Cidades } from "../models/Cidades";

export class CidadesController {

    async list (): Promise<Cidades[] | null> {
        return await Cidades.find();
    }

    async create (nome: string) {
        let cidade: Cidades = Cidades.create({ nome });
        await cidade.save();
        return cidade;
    }

    async delete (cidade: Cidades) {
        await Cidades.remove(cidade)
    }

    async find(id: number): Promise<Cidades | null>{
        let cidade: |Cidades | null = await Cidades.findOneBy({id: id});
        return cidade;
    }

    async save(cidade: Cidades): Promise<void>{
        await cidade.save();
    }
}