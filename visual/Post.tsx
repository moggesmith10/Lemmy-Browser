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

export function TextPost({
	navigation,
	post,
	setCommunityId,
}: {
	navigation;
	post: PostView;
	setCommunityId: Function;
}) {
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
										setCommunityId(post.community.id);
									}}
								>
									<Text style={[TextPostStyles.headerText]}>
										{post.community.title}
									</Text>
								</TouchableOpacity>
								<Text style={[TextPostStyles.headerText]}> | </Text>
								<TouchableOpacity>
									<Text style={[TextPostStyles.headerText]}>
										{post.creator.name}
									</Text>
								</TouchableOpacity>
							</View>
							<Text style={[TextPostStyles.title]}>{post.post.name}</Text>
							{displayContent(post)}
							{displayVotesForPost(post)}
						</TouchableOpacity>
					</View>
				);
	return <View></View>;
}
