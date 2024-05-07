import { PostView } from "lemmy-js-client";
import { View, Text, Image, ImageURISource } from "react-native";
import { CommonStyles } from "../styles/Global";
import { PostStyles } from "../styles/Post";
import FullWidthImage from 'react-native-fullwidth-image'

export function PostPage({ route, navigation }) {
	let { post }: { post: PostView } = route.params;

	function displayImage() {
		console.log(post.post);
		if (post.post.url != undefined) {
			return (
				<View style={{overflow: "hidden"}}>
					<FullWidthImage
						source={{ uri: post.post.url }}
						style={{ width:"100%"}}
					/>
				</View>
			);
		}
	}

	return (
		<View style={[CommonStyles.page]}>
			<View style={[PostStyles.upper]}>
				<Text style={[PostStyles.header]}>
					{post.community.title + " | " + post.creator.name}
				</Text>
				<Text style={[PostStyles.title]}>{post.post.name}</Text>
			</View>
			<Text style={[PostStyles.body]}>{post.post.body}</Text>
			{displayImage()}
		</View>
	);
}
