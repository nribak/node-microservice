export type UseCase <P, R> = (param: P) => Promise<R>
export type CommonUseCaseParams = {id: string, userId: string}
