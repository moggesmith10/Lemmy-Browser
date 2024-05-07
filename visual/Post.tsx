import { View, Text, TouchableOpacity } from "react-native";
import { PostView } from "lemmy-js-client";
import { useEffect, useState } from "react";
import { BrowserStyles } from "../styles/Browser";
import { CommonStyles } from "../styles/Global";
import { NavigationContainer } from "@react-navigation/native";
import { TextPostStyles } from "../styles/TextPost";
import { displayImage } from "../functions/DisplayImage";
import { displayContent } from "../functions/DisplayContent";
import { displayVotes } from "../functions/DisplayVotes";

export function TextPost({
	navigation,
	post,
}: {
	navigation;
	post: PostView;
}) {
	function openPost() {
		navigation.navigate("Post", { post: post });
	}

	if (post != undefined)
		if (post.post != undefined)
			if (post.post.name != undefined)
				return (
					<View style={[BrowserStyles.post]}>
						<TouchableOpacity onPress={openPost}>
							<Text style={[TextPostStyles.header]}>
								{post.community.title + " | " + post.creator.name}
							</Text>
							<Text style={[TextPostStyles.title]}>{post.post.name}</Text>
							{displayContent(post)}
							{displayVotes(post)}
						</TouchableOpacity>
					</View>
				);
	return <View></View>;
}
