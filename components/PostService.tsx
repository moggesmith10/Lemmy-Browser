import { LemmyHttp, ListingType } from "lemmy-js-client";
import GlobalStateService from "./StateService";

let state = GlobalStateService.getInstance();

export class PostService {
	async getPosts(page: number, type: ListingType) {
		let client: LemmyHttp;
		client = state.get("client");

		return (await client.getPosts({ page: page, type_: type })).posts;
	}
	async getPostsByCommunity(page: number, communityId: number) {
		let client: LemmyHttp;
		client = state.get("client");

		return (await client.getPosts({ page: page, community_id: communityId }))
			.posts;
	}

	async getPost(post_id) {
		let client: LemmyHttp;
		client = state.get("client");

		return await client.getPost({ id: post_id });
	}
}
