import { CommentView, PostView } from "lemmy-js-client";
import { View, Text } from "react-native";
import { CommonStyles } from "../styles/Global";

export function displayVotesForPost(post: PostView){
    return(
        <View>
            <Text style={CommonStyles.text}>{post.counts.score} ({post.counts.upvotes}-{post.counts.downvotes}) | {post.counts.comments} Comments</Text>
        </View>
    )
}
export function displayVotesForComment(post: CommentView){
    return(
        <View>
            <Text style={CommonStyles.text}>{post.counts.score} ({post.counts.upvotes}-{post.counts.downvotes})</Text>
        </View>
    )
}