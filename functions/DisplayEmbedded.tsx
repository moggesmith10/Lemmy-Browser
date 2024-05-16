import { PostView } from "lemmy-js-client";
import { TouchableOpacity, Text, Linking } from "react-native";
import { EmbeddedStyles } from "../styles/Embedded";

export function displayEmbedded(post: PostView) {
	function openLink(post: PostView) {
		Linking.openURL(post.post.url);
	}
	return (
		<TouchableOpacity onPress={() => openLink(post)}>
			<Text style={EmbeddedStyles.embedded}>{post.post.url}</Text>
		</TouchableOpacity>
	);
}
