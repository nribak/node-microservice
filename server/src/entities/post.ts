export default interface Post {
    id: string,
    title: string,
    details: string,
    createAt: number,
    updatedAt: number,
    userId: string
}


export function buildMakePost(textVerifier: (text: string) => boolean): (post: any, id: string) => Post {
    return ({title, details, createAt, updatedAt, userId}, id) => {
        const now = Date.now();
        //TODO: verify that attr are valid
        return {
            id, userId,
            createAt: createAt ?? now,
            updatedAt: updatedAt ?? now,
            title: textVerifier(title) ? title : 'BANNED',
            details: textVerifier(details) ? details : 'BANNED'
        }
    }
}
