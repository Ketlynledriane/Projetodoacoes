import DB from './db';
import { ItesnMenu } from './views/ItensMenu';
import { CategoriasMenu } from './views/CategoriaMenu';
import { CD_ItesnMenu } from './views/CD_ItensMenu';
import { CidadesMenu } from './views/CidadesMenu';
import promptSync from 'prompt-sync';
import { UsuariosMenu } from './views/UsuariosMenu';
import { BeneficiariosMenu } from './views/BeneficiariosMenu';


const prompt = promptSync();

async function main(): Promise<void> {
  await DB.initialize();
  let usuariosMenu: UsuariosMenu = new UsuariosMenu();
  let itensMenu: ItesnMenu = new ItesnMenu();
  let categoriasMenu: CategoriasMenu = new CategoriasMenu();
  let cd_itensMenu: CD_ItesnMenu = new CD_ItesnMenu();
  let cidadeMenu: CidadesMenu = new CidadesMenu();
  let beneficiariosMenu: BeneficiariosMenu = new BeneficiariosMenu();

  let input: string = '';

  do {
    console.clear();

    usuariosMenu.show();
    categoriasMenu.show();
    itensMenu.show();
    cidadeMenu.show();
    beneficiariosMenu.show();
    cd_itensMenu.show();
    console.log('0 - Sair');

    input = prompt('Selecione a opção desejada:');

    if (input != '0') {
   
      await itensMenu.execute(input);
      await categoriasMenu.execute(input);
      await cd_itensMenu.execute(input);      
      await usuariosMenu.execute(input);
      await cidadeMenu.execute(input);
      await beneficiariosMenu.execute(input);
      

      prompt('Pressione enter para continuar');
    }
  } while (input != '0');
}

main();