
import makeQuery from "@app/core/database/query";
import ListProductCollection from "./listProduct.collection";
const fetchAllListProduct = async (query:any,options:any) => {
    const {
        keyword,
        status,
        area,
        bebromm,
        babromm,
        location,
    } = query;
    const $match:any = {};
    if(location) Object.assign($match,{'location':{$regex: String(location) }});
    if(area) Object.assign($match,{'area':{$regex: Number(area) }});
    if(bebromm) Object.assign($match,{'bebromm':{$regex: Number(bebromm) }});
    if(babromm) Object.assign($match,{'babromm':{$regex: Number(babromm) }});
    if(status){
        Object.assign($match,{'status':status})
    }
    const aggregate:any = [
        {$match},
        // {$sort:{_id:-1}}
    ]
    return await ListProductCollection.aggregatePaginate(
        ListProductCollection.aggregate(aggregate),
        options
      );
};
const getListProductById = async (id: string) => {
    return await ListProductCollection.findById({ _id: id }).lean().exec();
};
export default {
    fetchAllListProduct,
    getListProductById,
}