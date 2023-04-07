import {buildMakePost} from "./post";

const textVerifier = (text: string) => true;

const makePost = buildMakePost(textVerifier);

export default makePost;
