import { Categorias } from "../models/Categorias";

export class CategoriasController {

    async list (): Promise<Categorias[] | null> {
        return await Categorias.find();
    }

    async create (descricao: string) {
        let categoria: Categorias = Categorias.create({
            descricao,
        });
        await categoria.save();
        return categoria;
    }

    async delete (categoria: Categorias) {
        await Categorias.remove(categoria)
    }

    async find(id: number): Promise<Categorias | null>{
        let categoria: Categorias | null = await Categorias.findOneBy({id: id});
        return categoria;
    }

    async save(categoria: Categorias): Promise<void>{
        await categoria.save();
    }
}