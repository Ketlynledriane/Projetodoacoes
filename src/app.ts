import DB from './db';
import { ItesnMenu } from './views/ItensMenu';
import { CategoriasMenu } from './views/CategoriaMenu';
<<<<<<< HEAD
import { CD_ItesnMenu } from './views/CD_ItensMenu';
=======
import { CidadesMenu } from './views/CidadesMenu';
>>>>>>> cf7137e (crud cidades)
import promptSync from 'prompt-sync';
import { UsuariosMenu } from './views/UsuariosMenu';


const prompt = promptSync();

async function main(): Promise<void> {
  await DB.initialize();
  let usuariosMenu: UsuariosMenu = new UsuariosMenu();
  let itensMenu: ItesnMenu = new ItesnMenu();
  let categoriasMenu: CategoriasMenu = new CategoriasMenu();
<<<<<<< HEAD
  let cd_itensMenu: CD_ItesnMenu = new CD_ItesnMenu();
=======
  let cidadeMenu: CidadesMenu = new CidadesMenu();
>>>>>>> cf7137e (crud cidades)

  let input: string = '';

  do {
    console.clear();

    usuariosMenu.show();
    categoriasMenu.show();
    itensMenu.show();
<<<<<<< HEAD
    cd_itensMenu.show();

=======
    cidadeMenu.show();
>>>>>>> cf7137e (crud cidades)
    console.log('0 - Sair');

    input = prompt('Selecione a opção desejada:');

    if (input != '0') {
   
      await itensMenu.execute(input);
      await categoriasMenu.execute(input);
<<<<<<< HEAD
      await cd_itensMenu.execute(input);
      
      await usuariosMenu.execute(input);
=======
      await cidadeMenu.execute(input);
      
>>>>>>> cf7137e (crud cidades)

      prompt('Pressione enter para continuar');
    }
  } while (input != '0');
}

main();