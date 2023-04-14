import {DeletePostUseCase} from "../use-cases/delete-post";
import {Controller} from "./types";

export default function makeDeletePostController(deletePostUseCase: DeletePostUseCase): Controller {
    return async ({params, userId}) => {
        const id = params?.id;
        if(id) {
            const data = await deletePostUseCase({id, userId});
            return {
                statusCode: 200,
                json: data
            }
        } else return  {
            statusCode: 500,
            json: {}
        }
    }
}
