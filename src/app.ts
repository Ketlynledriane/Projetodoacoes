import DB from './db';
import { ItesnMenu } from './views/ItensMenu';
import { CategoriasMenu } from './views/CategoriaMenu';
import { CD_ItesnMenu } from './views/CD_ItensMenu';
import { CidadesMenu } from './views/CidadesMenu';
import promptSync from 'prompt-sync';
import { UsuariosMenu } from './views/UsuariosMenu';
import { BeneficiariosMenu } from './views/BeneficiariosMenu';
import { CDMenu } from './views/CDMenu';
import { MovimentacoesMenu } from './views/MovimentacoesMenu';

const prompt = promptSync();

async function main(): Promise<void> {
    await DB.initialize();
    let usuariosMenu: UsuariosMenu = new UsuariosMenu();
    let itensMenu: ItesnMenu = new ItesnMenu();
    let categoriasMenu: CategoriasMenu = new CategoriasMenu();
    let cd_itensMenu: CD_ItesnMenu = new CD_ItesnMenu();
    let cidadeMenu: CidadesMenu = new CidadesMenu();
    let beneficiariosMenu: BeneficiariosMenu = new BeneficiariosMenu();
    let cdMenu: CDMenu = new CDMenu();
    let movimentacoesMenu: MovimentacoesMenu = new MovimentacoesMenu();

    let escolha: number = 0;

    do {
        console.clear();
        console.log("Bem-vindo ao sistema de doações DOE CRIE_TI. Escolha uma opção abaixo: ")
        
        console.log("1 - USUÁRIOS");
        
        console.log("2 - CIDADES");
        
        console.log("3 - CATEGORIAS");
        
        console.log("4 - ITENS");
        
        console.log("5 - ESTOQUE");
        
        console.log("6 - BENEFICIÁRIOS");
        
        console.log("7 - CD");
        
        console.log("8 - DOAÇÕES");
        
        console.log('0 - Sair');

        escolha = Number(prompt("Digite a opção desejada: "));
        console.log("");
        
        switch (escolha) {
            case 1:
                await usuariosMenu.show()
                break;
            case 2:
                await cidadeMenu.show();
                break;
            case 3:
                await categoriasMenu.show();
                break;
            case 4:
                await itensMenu.show();
                break;
            case 5:
                await cd_itensMenu.show();
                break;
            case 6:
                await beneficiariosMenu.show();
                break;
            case 7:
                await cdMenu.show();
                break;
            case 8:
                await movimentacoesMenu.show()
                break;
            case 0:
                console.log('Saindo do sistema...');
                break;
            default:
                console.log('Valor inválido!');
                break;
            }
    } while (escolha != 0) 
}

main();
