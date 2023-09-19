import { CD_Itens } from "../models/CD_Itens";

export class CD_ItensController {

    async list (): Promise<CD_Itens[] | null> {
        return await CD_Itens.find();
    }

    async create (id_itens: number, id_cd: number) {
        let cd_itens: CD_Itens = CD_Itens.create({
            id_itens, id_cd,
        });
        await cd_itens.save();
        return cd_itens;
    }

    async delete (cd_itens: CD_Itens) {
        await CD_Itens.remove(cd_itens)
    }

    async find(id: number): Promise<CD_Itens | null>{
        let cd_itens: CD_Itens | null = await CD_Itens.findOneBy({id: id});
        return cd_itens;
    }

    async save(cd_itens: CD_Itens): Promise<void>{
        await cd_itens.save();
    }
}