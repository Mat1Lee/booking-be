import ListProductCollection from "./listProduct.collection";
import { pick } from 'lodash';
import loggerHelper from '@utils/logger.util';
import { NextFunction, Request, Response } from 'express';
import { setResponse } from "@app/utils/response.util";
import appUtil from "@app/utils/app.util";
import listProductService from "./listProduct.service";
const logger = loggerHelper.getLogger('ranking.controller');
const getListProductAction = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const options:any = appUtil.getPaging(req);
        const query: any = pick(req.query, [
            'area',
            'bebromm',
            'babromm',
            'name',
            'code',
            'status',
            'keyword'
        ]);
        const listProductCollection = await listProductService.fetchAllListProduct(query,options);
        res.send(listProductCollection);
    }catch(e){
        logger.error('getListProductAction', e);
        next(e);
    };
};
const getProductByIdAction = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id: string = req.params.id;
        const listProductCollection = await listProductService.getListProductById(id);
        res.send(listProductCollection);
    }catch(e){
        logger.error('getProductByIdAction', e);
        next(e);
    };
}
export default {
    getListProductAction,
    getProductByIdAction,
}