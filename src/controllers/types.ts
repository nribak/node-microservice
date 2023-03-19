type DynamicObject = {[key: string]: string}
export interface RequestWrapper {
    query?: DynamicObject,
    headers?: any,
    body?: any
}

export interface ResponseWrapper {
    statusCode: number,
    json: any,
    headers?: DynamicObject
}

export type Controller = (req: RequestWrapper) => Promise<ResponseWrapper>
