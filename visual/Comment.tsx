import { CommentView } from "lemmy-js-client";
import { PostStyles } from "../styles/Post";
import {
	View,
	Text,
	TouchableOpacity,
	NativeSyntheticEvent,
	TextInputChangeEventData,
} from "react-native";
import { displayVotesForComment } from "../functions/DisplayVotes";
import { CommentReplyInput } from "./CommentReplyInput";
import { CommonStyles } from "../styles/Global";
import React, { useState } from "react"; // Added React import

export function Comment({ comment }: { comment: CommentView }) {
	const [invisible, setInvisible] = useState(true);

	function changeInvisible() {
		let prev = invisible;
		setInvisible(!prev);
	}

	const [commentReply, setCommentReply] = useState("");

	const handleCommentReply = (
		e: NativeSyntheticEvent<TextInputChangeEventData>
	) => {
		const text = e.nativeEvent.text;
		setCommentReply(text);
	};

	return (
		<View style={[PostStyles.commentContainer]}>
			<Text style={[PostStyles.commentPoster]}>{comment.creator.name}</Text>
			<Text style={[PostStyles.comment]}>{comment.comment.content}</Text>
			{displayVotesForComment(comment)}
			<TouchableOpacity onPress={changeInvisible}>
				<Text style={CommonStyles.text}>Reply</Text>
			</TouchableOpacity>
			<CommentReplyInput
				invisible={invisible}
				updateText={handleCommentReply}
			/>
		</View>
	);
}
