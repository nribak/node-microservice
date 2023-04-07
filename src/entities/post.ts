export default interface Post {
    id: string,
    title: string,
    details: string,
    createAt: number,
    updatedAt: number
}


export function buildMakePost(textVerifier: (text: string) => boolean): (post: any, id: string) => Post {
    return ({title, details, createAt, updatedAt}, id) => {
        const now = Date.now();
        return {
            id,
            createAt: createAt ?? now,
            updatedAt: updatedAt ?? now,
            title: textVerifier(title) ? title : 'BANNED',
            details: textVerifier(details) ? details : 'BANNED'
        }
    }
}
