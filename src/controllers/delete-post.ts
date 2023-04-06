import {DeletePostUseCase} from "../use-cases/delete-post";
import {Controller} from "./types";

export default function makeDeletePostController(deletePostUseCase: DeletePostUseCase): Controller {
    return async ({query}) => {
        const id = query?.id;
        if(id) {
            const data = await deletePostUseCase(id);
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
