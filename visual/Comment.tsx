import { CommentView,  } from "lemmy-js-client";
import { PostStyles } from "../styles/Post";
import { View, Text, ListRenderItem } from "react-native";
import { displayVotesForComment } from "../functions/DisplayVotes";

export function Comment({comment} : {comment: CommentView}){
    return(
    <View style={[PostStyles.commentContainer]}>
        <Text style={[PostStyles.commentPoster]}>{comment.creator.name}</Text>
        <Text style={[PostStyles.comment]} >{comment.comment.content}</Text>
        {displayVotesForComment(comment)}
    </View>
    )
}