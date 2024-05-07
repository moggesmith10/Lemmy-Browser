import { PostView } from "lemmy-js-client";
import { displayImage } from "./DisplayImage";
import { isRunningInExpoGo } from "expo";
import { displayEmbedded } from "./DisplayEmbedded";

const imageTypes = ["png", "jpg", "jpeg", "webp"];

export function displayContent(post: PostView) {
	if (post.post.url != undefined) {
		if (imageTypes.some((type) => post.post.url.endsWith(type))) {
			return displayImage(post);
		} else {
			return displayEmbedded(post);
		}
	} else {
		return;
	}
}
