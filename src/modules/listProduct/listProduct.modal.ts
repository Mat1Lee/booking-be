import { Document,Types } from "mongoose";
export interface ListProductModalBase {
_id?: Types.ObjectId,
title?: string,
description?: string,
image?: string,
price?: number,
location?: string,
area?: number,
bebromm?: number,
babromm?: number,
type?: string,
}
// export interface ListProductDocument extends ListProductModalBase, Document {

// }