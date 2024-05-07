import { PostView } from "lemmy-js-client";
import { View, Text } from "react-native";
import { CommonStyles } from "../styles/Global";

export function displayVotes(post: PostView){
    return(
        <View>
            <Text style={CommonStyles.text}>+{post.counts.upvotes}-{post.counts.downvotes}={post.counts.score} | {post.counts.comments} Comments</Text>
        </View>
    )
}