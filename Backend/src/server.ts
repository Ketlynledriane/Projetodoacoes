import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import beneficiariosRoutes from './routes/beneficiarios'
import categoriasRoutes from './routes/categorias'
import cdRoutes from './routes/cd'
import cd_itemRoutes from './routes/cd_item'
import cidadeRoutes from './routes/cidades'
import doadorRoutes from './routes/doador'
import itensRoutes from './routes/itens'
import movimentacaoRoutes from './routes/movimentacao'
import usuariosRoutes from './routes/usuarios'


let server: Express = express();
let port: Number = Number(process.env.SERVER_PORT || 3000);

server.use(cors());
server.use(express.json());

server.use((req: Request, res: Response, next: NextFunction) => {
    console.log('|' + (new Date()) + '|' + req.method + ' ' + req.url);
    next();
});

server.use(beneficiariosRoutes);
server.use(categoriasRoutes);
server.use(cd_itemRoutes);
server.use(cdRoutes);
server.use(cidadeRoutes);
server.use(doadorRoutes);
server.use(itensRoutes);
server.use(movimentacaoRoutes);
server.use(usuariosRoutes);


export default {
    start () {
        server.listen(port, () => {
            console.log('Server started on port 3000.');
        });
    }
};