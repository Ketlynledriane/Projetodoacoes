import { Itens } from "../models/Itens";

export class ItensController {

    async list (): Promise<Itens[] | null> {
        return await Itens.find();
    }

    async create (descricao: string, id_categoria: number) {
        let itens: Itens = Itens.create({ descricao, id_categoria});
        await itens.save();
        return itens;
    }

    async delete (itens: Itens) {
        await Itens.remove(itens)
    }

    async find(id: number): Promise<Itens | null>{
        let itens: |Itens | null = await Itens.findOneBy({id: id});
        return itens;
    }

    async save(itens: Itens): Promise<void>{
        await itens.save();
    }
}