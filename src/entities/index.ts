import {buildMakePost} from "./post";

const textVerifier = (text: string) => text.length > 1;

const makePost = buildMakePost(textVerifier);

export default makePost;
