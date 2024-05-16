import { LemmyHttp } from "lemmy-js-client";
import GlobalStateService from "./StateService";

let state = GlobalStateService.getInstance();

export class VotingService {
	async vote(postId: number, vote: number) {
		let client: LemmyHttp;
		client = state.get("client");

		return await client.likePost({ post_id: postId, score: vote });
	}
}
