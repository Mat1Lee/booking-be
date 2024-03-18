import { Schema ,model } from "mongoose";

const ListProductSchema = new Schema({
title: String,
description: String,
image: String,
price: Number,
location: String,
area: Number,
bebromm: Number,
babromm: Number,
type: String,
},{

});

const ListProductCollection = model('listProduct', ListProductSchema ,'listProduct');

export default ListProductCollection; 