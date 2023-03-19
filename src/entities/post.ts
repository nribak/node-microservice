export default interface Post {
    id: string,
    title: string,
    details: string,
    createAt: number,
    updatedAt: number
}


export function buildMakePost(textVerifier: (text: string) => boolean, idGen: () => string): (post: any) => Post {
    return ({title, details}) => {
        const now = Date.now();
        return {
            id: idGen(),
            createAt: now, updatedAt: now,
            title: textVerifier(title) ? title : 'BANNED',
            details: textVerifier(details) ? details : 'BANNED'
        }
    }
}
