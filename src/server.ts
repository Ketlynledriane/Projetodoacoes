import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import categoriasRoutes from './routes/categorias'
import itensRoutes from './routes/itens'
import cdRoutes from './routes/cd'

let server: Express = express();
let port: Number = Number(process.env.SERVER_PORT || 3000);

server.use(cors());
server.use(express.json());

server.use((req: Request, res: Response, next: NextFunction) => {
    console.log('|' + (new Date()) + '|' + req.method + ' ' + req.url);
    next();
});

server.use(categoriasRoutes);
server.use(itensRoutes);
server.use(cdRoutes)

export default {
    start () {
        server.listen(port, () => {
            console.log('Server started on port 3000.');
        });
    }
};