import { NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, TouchableOpacity, View } from "react-native";
import { PostStyles } from "../styles/Post";
import { CommonStyles } from "../styles/Global";

export function CommentReplyInput({ invisible, updateText, postCommentFunction, id} : {invisible: boolean, updateText: Function, postCommentFunction: Function, id: number}) {
	
	const handleText = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text = e.nativeEvent.text; 
        updateText(text);
      };
	
	return (
		<View style={invisible ? PostStyles.invisible : PostStyles.commentReply}>
			<TextInput style={PostStyles.commentReplyInput} onChange={handleText} />
			<TouchableOpacity
				style={[CommonStyles.button, PostStyles.commentReplyButton]}
				onPress={postCommentFunction(id)}
			>
				<Text style={PostStyles.commentReplyButtonText}>Post</Text>
			</TouchableOpacity>
		</View>
	);
}
