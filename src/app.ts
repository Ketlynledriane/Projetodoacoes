import DB from './db';
import { ItesnMenu } from './views/ItensMenu';
import { CategoriasMenu } from './views/CategoriaMenu';
import { CD_ItesnMenu } from './views/CD_ItensMenu';

import promptSync from 'prompt-sync';
const prompt = promptSync();

async function main(): Promise<void> {
  

  let itensMenu: ItesnMenu = new ItesnMenu();
  let categoriasMenu: CategoriasMenu = new CategoriasMenu();
  let cd_itensMenu: CD_ItesnMenu = new CD_ItesnMenu();

  let input: string = '';

  do {
    console.clear();

    categoriasMenu.show();
    itensMenu.show();
    cd_itensMenu.show();

    console.log('0 - Sair');

    input = prompt('Selecione a opção desejada:');

    if (input != '0') {
   
      await itensMenu.execute(input);
      await categoriasMenu.execute(input);
      await cd_itensMenu.execute(input);
      

      prompt('Pressione enter para continuar');
    }
  } while (input != '0');
}

main();