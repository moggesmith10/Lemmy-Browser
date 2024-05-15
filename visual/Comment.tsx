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
import { CommentService } from "../components/CommentService";

/**
 * 
 * @param comment The comment
 * @param setPostLoaded The function to the stateful setter, used to reload post after reply is sent
 * @returns 
 */
export function Comment({ comment, setPostLoaded }: { comment: CommentView, setPostLoaded: Function }) {
	const [invisible, setInvisible] = useState(true);

	function changeInvisible() {
		let prev = invisible;
		setInvisible(!prev);
	}

	function reply(id){
		//Instantiate service on reply. We should just use a single instance for performance, but I dont have time for that
		let service = new CommentService();
		service.replyToComment(comment.post.id, comment.comment.id, commentReply)
		setPostLoaded(false)
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
				postCommentFunction={reply}
				id={comment.comment.id}
			/>
		</View>
	);
}
