import { CommentView, LemmyHttp, Login } from "lemmy-js-client";
import { StateProvider, useSharedState } from "./StateContext";
import { StateContext } from "./StateContext";
import { Context, useContext } from "react";
import GlobalStateService from "./StateService";
import * as SecureStore from 'expo-secure-store';

let state = GlobalStateService.getInstance();

export class CommentService {

	async getComment(postId: number, page : number) : Promise<CommentView[]> {
        let client: LemmyHttp;
		client = state.get("client");
    
        return (await client.getComments({post_id: postId})).comments;
    }

    async replyToComment(postId : number, commentId: number, reply: string){
        let client: LemmyHttp;
		client = state.get("client");
    
        return (await client.createComment({post_id: postId, parent_id:commentId, content: reply}));
    }

    async postComment(postId : number, reply: string){
        let client: LemmyHttp;
		client = state.get("client");
    
        return (await client.createComment({post_id: postId, content: reply}));
    }
}
