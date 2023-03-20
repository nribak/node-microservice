export type UseCase <P, R> = (param: P) => Promise<R>
