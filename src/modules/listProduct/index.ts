import { Application } from "express";
import listProductController from "./listProduct.controller";
const listProductRouter =(app:Application)=>{
    app.get('/api/v1/list-product',listProductController.getListProductAction);
    app.get('/api/v1/list-product/:id',listProductController.getProductByIdAction);
};
 
export default listProductRouter;