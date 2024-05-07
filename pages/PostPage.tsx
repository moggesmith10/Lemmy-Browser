import { PostView } from "lemmy-js-client";
import { View, Text, Image, ImageURISource } from "react-native";
import { CommonStyles } from "../styles/Global";
import { PostStyles } from "../styles/Post";
import FullWidthImage from 'react-native-fullwidth-image'
import { displayImage } from "../functions/DisplayImage";
import { displayContent } from "../functions/DisplayContent";

export function PostPage({ route, navigation }) {
	let { post }: { post: PostView } = route.params;

	return (
		<View style={[CommonStyles.page]}>
			<View style={[PostStyles.upper]}>
				<Text style={[PostStyles.header]}>
					{post.community.title + " | " + post.creator.name}
				</Text>
				<Text style={[PostStyles.title]}>{post.post.name}</Text>
			</View>
			<Text style={[PostStyles.body]}>{post.post.body}</Text>
			{displayContent(post)}
		</View>
	);
}
