import {buildMakePost} from "./post";

const textVerifier = (text: string) => text.length > 1;
const idGen = () => Date.now().toString();

const makePost = buildMakePost(textVerifier, idGen);

export default makePost;
