import { MovimentacoesController } from "../controllers/MovimentacoesController";


export class MovimentacoesMenu {

    public controller: MovimentacoesController
    
    constructor () {
        this.controller = new MovimentacoesController();
    }
}