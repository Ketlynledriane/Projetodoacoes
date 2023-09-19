import DB from './db';
import { ItesnMenu } from './views/ItensMenu';
import { CategoriasMenu } from './views/CategoriaMenu';
import promptSync from 'prompt-sync';
import { UsuariosMenu } from './views/UsuariosMenu';

const prompt = promptSync();

async function main(): Promise<void> {
  await DB.initialize();
  let usuariosMenu: UsuariosMenu = new UsuariosMenu();
  let itensMenu: ItesnMenu = new ItesnMenu();
  let categoriasMenu: CategoriasMenu = new CategoriasMenu();

  let input: string = '';

  do {
    console.clear();

    usuariosMenu.show();
    categoriasMenu.show();
    itensMenu.show();

    console.log('0 - Sair');

    input = prompt('Selecione a opção desejada:');

    if (input != '0') {
   
      await itensMenu.execute(input);
      await categoriasMenu.execute(input);
      await usuariosMenu.execute(input);

      prompt('Pressione enter para continuar');
    }
  } while (input != '0');
}

main();