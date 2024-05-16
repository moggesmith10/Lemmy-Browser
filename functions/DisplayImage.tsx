import { PostView } from "lemmy-js-client";
import { View } from "react-native";
import FullWidthImage from "react-native-fullwidth-image";

export function displayImage(post: PostView) {
	if (post.post.url != undefined) {
		return (
			<View style={{ overflow: "hidden" }}>
				<FullWidthImage
					source={{ uri: post.post.url }}
					style={{ width: "100%" }}
				/>
			</View>
		);
	}
}
