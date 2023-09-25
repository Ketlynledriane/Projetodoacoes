import { UsuariosControllers } from '../controllers/UsuariosControllers';
import { Usuarios } from '../models/Usuarios';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export class UsuariosMenu {

    public controller: UsuariosControllers;

    constructor() {
        this.controller = new UsuariosControllers();
    }

    public async show() {
        console.log('1 - Cadastrar novo usuario');
        console.log('2 - Editar usuario');
        console.log('3 - Listar usuarios');
        console.log('4 - Excluir usuario');
        console.log('0 - Voltar ao menu anterior');
        console.log("");
        let escolha = prompt('Opção escolhida: ')
        await this.execute(escolha);
    }

    public async execute(input: string): Promise<void> {
        switch (input) {
            case '1':
                await this.create();
                break;
            case '2':
                await this.edit();
                break;
            case '3':
                await this.list();
                break;
            case '4':
                await this.delete();
                break;
            case '0':
                console.log('Voltando...');
                await this.show();
                break;

            default:
                console.log('Valor inválido!');
                break;
        }
    }

    private async list(): Promise<void> {
        let usuario: Usuarios[] = await this.controller.list();
        console.table(usuario?.map(function (usuario: Usuarios) {
            return {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
            }
        }));
        prompt("Aperte ENTER para continuar...");
        await this.show();
    }

    private async create(): Promise<void> {
        let nome: string = prompt('Nome: ');
        let email: string = prompt('E-mail: ');
        let senha: string = prompt('Senha: ');
        let usuario: Usuarios = await this.controller.create(nome, email, senha);
        console.log(`Usuario ID #${usuario.id} criado com sucesso!`);
        prompt("Aperte ENTER para continuar...");
        await this.show();
    }

    private async edit(): Promise<void> {
        let id: number = Number(prompt('Qual o ID? '));
        let usuario: Usuarios | null = await this.controller.find(id);
        if (usuario) {
            usuario.nome = prompt(`Nome: (${usuario.nome}) `, usuario.nome);
            usuario.email = prompt(`Email: (${usuario.email}) `, usuario.email);
            usuario.senha = prompt(`Senha: `);
            this.controller.save(usuario);
            console.log(`Usuario ID# ${usuario.id} atualizado com sucesso!`);
        } else {
            console.log('Usuário não encontrado!')
        }
        prompt("Aperte ENTER para continuar...");
        await this.show();
    }

    private async delete(): Promise<void> {
        let id: number = Number(prompt('Qual o ID? '));
        let usuario: Usuarios | null = await this.controller.find(id);
        if (usuario) {
            await this.controller.delete(usuario);
            console.log(`Usuario ID #${id} excluído com sucesso!`);
        } else {
            console.log('Usuario não encontrado!');
        }
        prompt("Aperte ENTER para continuar...");
        await this.show();
    }
}