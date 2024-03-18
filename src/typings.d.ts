declare module 'casbin-mongoose-adapter';

declare namespace Express {
  export interface Request {
    span?: any,
    user?: any,
    token?: string,
    hospitalId?: string,
    companyId?: number,
    language?: string,
    isRoot: boolean,
  }
}
interface options {
  id :string,
  inc_field :string,
  reference_fields?: string[],
  disable_hooks?: boolean,
  collection_name?: string
  parallel_hooks?: boolean,
  inc_amount?: number
}

declare module 'sub-vn' {
    export function getWardsByDistrictCode(code: string): any;
    export function getProvinces(): [any];
    export function getDistricts(): [any];
    export function getWards(): [any];
    export function getProvincesWithDetail(): [any];
    export function getDistrictsByProvinceCode(code: string): [any];
    export function getWardsByDistrictCode(code: string): [any];
    export function getWardsByProvinceCode(code: string): [any];
    export function getWardsByCode(code: string): any;
    export function getCityByCode(code: string): any;
    export function getDistrictByCode(code: string): any;
  }
  
declare module 'mongoose' {
  export interface SequenceOptions {
    inc_field: string; // The name of the field to increment. Mandatory, default is _id
    id?: string | undefined; // Id of the sequence. Is mandatory only for scoped sequences but its use is strongly encouraged.
    reference_fields?: string[] | undefined; // The field to reference for a scoped counter. Optional
    disable_hooks?: boolean | undefined; // If true, the counter will not be incremented on saving a new document. Default to false
    collection_name?: string | undefined; // By default the collection name to mantain the status of the counters is counters. You can override it using this option
}

export interface SequenceDocument extends Document {
    setNext(sequenceId: string, callback: (err: any, res: SequenceDocument) => void): void;
}

export interface SequenceSchema extends Schema {
    plugin(
        plugin: (schema: SequenceSchema, options: SequenceOptions) => void,
        options: SequenceOptions,
    ): this;

    // overload for the default mongoose plugin function
    plugin(plugin: (schema: Schema, options?: Object) => void, opts?: Object): this;
}
  interface CustomLabels<T = string | undefined | boolean> {
    totalDocs?: T | undefined;
    docs?: T | undefined;
    limit?: T | undefined;
    page?: T | undefined;
    nextPage?: T | undefined;
    prevPage?: T | undefined;
    hasNextPage?: T | undefined;
    hasPrevPage?: T | undefined;
    totalPages?: T | undefined;
    pagingCounter?: T | undefined;
    meta?: T | undefined;
}

interface PaginateOptions {
    sort?: object | string | undefined;
    offset?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    customLabels?: CustomLabels | undefined;
    /* If pagination is set to `false`, it will return all docs without adding limit condition. (Default: `true`) */
    pagination?: boolean | undefined;
    allowDiskUse?: boolean | undefined;
    countQuery?: object | undefined;
    useFacet?: boolean | undefined;
}

interface QueryPopulateOptions {
    /** space delimited path(s) to populate */
    path: string;
    /** optional fields to select */
    select?: any;
    /** optional query conditions to match */
    match?: any;
    /** optional model to use for population */
    model?: string | Model<any> | undefined;
    /** optional query options like sort, limit, etc */
    options?: any;
    /** deep populate */
    populate?: QueryPopulateOptions | QueryPopulateOptions[] | undefined;
}

interface AggregatePaginateResult<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    page?: number | undefined;
    totalPages: number;
    nextPage?: number | null | undefined;
    prevPage?: number | null | undefined;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    meta?: any;
}
  interface AggregatePaginateModel<D> extends Model<D> {
    aggregatePaginate<T>(
        query?: Aggregate<T[]>,
        options?: PaginateOptions,
        callback?: (err: any, result: AggregatePaginateResult<T>) => void,
    ): Promise<AggregatePaginateResult<T>>;
    paginate<T>(
      query?: Aggregate<T[]> | any,
      options?: PaginateOptions,
      callback?: (err: any, result: AggregatePaginateResult<T>) => void,
    ): Promise<AggregatePaginateResult<T>>
}

function model(name: string, schema?: Schema, collection?: string, skipInit?: boolean): AggregatePaginateModel<any>;
}