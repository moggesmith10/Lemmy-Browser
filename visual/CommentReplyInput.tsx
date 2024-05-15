import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { PostStyles } from "../styles/Post";
import { CommonStyles } from "../styles/Global";

export function CommentReplyInput({ invisible, updateText }) {
	return (
		<View style={invisible ? PostStyles.invisible : PostStyles.commentReply}>
			<TextInput style={PostStyles.commentReplyInput} onChange={updateText} />
			<TouchableOpacity
				style={[CommonStyles.button, PostStyles.commentReplyButton]}
			>
				<Text style={PostStyles.commentReplyButtonText}>Post</Text>
			</TouchableOpacity>
		</View>
	);
}
