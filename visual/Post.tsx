import { View, Text, TouchableOpacity } from "react-native";
import { PostView } from "lemmy-js-client";
import { useEffect, useState } from "react";
import { BrowserStyles } from "../styles/Browser";
import { CommonStyles } from "../styles/Global";
import { NavigationContainer } from "@react-navigation/native";
import { TextPostStyles } from "../styles/TextPost";
import { displayImage } from "../functions/DisplayImage";
import { displayContent } from "../functions/DisplayContent";
import { displayVotesForPost } from "../functions/DisplayVotes";
import { Vote } from "./Vote";

export function TextPost({
	navigation,
	post,
	setCommunityId,
}: {
	navigation;
	post: PostView;
	setCommunityId: Function;
}) {
	const[thisPost, setPost]: [PostView, Function] = useState(post);


	function openPost() {
		navigation.navigate("Post", { outdatedPost: post });
	}

	if (post != undefined)
		if (post.post != undefined)
			if (post.post.name != undefined)
				return (
					<View style={[BrowserStyles.post]}>
						<TouchableOpacity onPress={openPost}>
							<View style={TextPostStyles.header}>
								<TouchableOpacity
									onPress={() => {
										setCommunityId(thisPost.community.id);
									}}
								>
									<Text style={[TextPostStyles.headerText]}>
										{thisPost.community.title}
									</Text>
								</TouchableOpacity>
								<Text style={[TextPostStyles.headerText]}> | </Text>
								<TouchableOpacity>
									<Text style={[TextPostStyles.headerText]}>
										{thisPost.creator.name}
									</Text>
								</TouchableOpacity>
							</View>
							<Text style={[TextPostStyles.title]}>{post.post.name}</Text>
							{displayContent(thisPost)}
							<Vote post={thisPost} updatePost={setPost} />
							{displayVotesForPost(thisPost)}
						</TouchableOpacity>
					</View>
				);
	return <View></View>;
}
