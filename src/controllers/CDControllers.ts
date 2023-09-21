import { CD } from "../models/CD";

export class CDControllers {
    async create (id: number, nome: string, cidade: string) {
        let cd: CD = CD.create({ nome });
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