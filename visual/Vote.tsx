import { PostView } from "lemmy-js-client";
import { View, Text, TouchableOpacity } from "react-native";
import { VoteStyle } from "../styles/Vote";
import { VotingService } from "../components/VotingService";

export function Vote({
	post,
	updatePost,
}: {
	post: PostView;
	updatePost: Function;
}) {
	async function vote(score: number) {
		let service = new VotingService();
		updatePost((await service.vote(post.post.id, score)).post_view);
	}

	return (
		<View style={VoteStyle.voteContainer}>
			<TouchableOpacity onPress={() => vote(post.my_vote != 1 ? 1 : 0)}>
				<Text
					style={[
						VoteStyle.vote,
						post.my_vote > 0 ? VoteStyle.voteUpEnabled : null,
					]}
				>
					+
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => vote(post.my_vote != -1 ? -1 : 0)}>
				<Text
					style={[
						VoteStyle.vote,
						post.my_vote < 0 ? VoteStyle.voteDownEnabled : null,
					]}
				>
					-
				</Text>
			</TouchableOpacity>
		</View>
	);
}
