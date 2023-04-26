export interface RequestWrapper {
    query?: any,
    headers?: any,
    body?: any,
    params?: any,
    userId: string
}

export interface ResponseWrapper {
    statusCode: number,
    json: any,
    headers?: any
}

export type Controller = (req: RequestWrapper) => Promise<ResponseWrapper>
