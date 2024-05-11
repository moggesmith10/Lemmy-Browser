import { PostView, CommentView } from "lemmy-js-client";
import { View, Text, Image, ImageURISource, FlatList } from "react-native";
import { CommonStyles } from "../styles/Global";
import { PostStyles } from "../styles/Post";
import FullWidthImage from 'react-native-fullwidth-image'
import { displayImage } from "../functions/DisplayImage";
import { displayContent } from "../functions/DisplayContent";
import { displayVotes } from "../functions/DisplayVotes";
import { CommentService } from "../components/CommentService"
import { useEffect, useState } from "react";

export function PostPage({ route, navigation }) {

	let commentService: CommentService = new CommentService();

	let { post }: { post: PostView } = route.params;
	const [comments, setComments]: [Array<CommentView>, Function] = useState([]);
	const [page, setPage] = useState(1);
	const [endReached, setEndReached] = useState(false);

	//Chat GPT
	function mergeArraysByValue(arr1: Array<CommentView>, arr2: Array<CommentView>) {
		const mergedArray = [...arr1];

		for (const obj of arr2) {
			const existingObj = mergedArray.find(
				(item) =>
					item.comment.id === obj.comment.id
			);
			if (!existingObj) {
				mergedArray.push(obj);
			}
		}

		return mergedArray;
	}

	async function loadMoreComments() {
		if (!endReached) {
			let newComments = commentService.getComment(post.post.id, page)
			if((await newComments).length == 0){
				setEndReached(true);
			}

			setPage(page + 1);

			setComments(mergeArraysByValue(comments, await newComments));
		}
	}

	useEffect(() => {
		if (page == 1) {
			loadMoreComments();
		}
	})


	return (
		<View style={[CommonStyles.page]}>
			<View style={[PostStyles.upper]}>
				<Text style={[PostStyles.header]}>
					{post.community.title + " | " + post.creator.name}
				</Text>
				<Text style={[PostStyles.title]}>{post.post.name}</Text>
			</View>
			<Text style={[PostStyles.body]}>{post.post.body}</Text>
			{displayContent(post)}
			{displayVotes(post)}
			<FlatList
				data={comments}
				renderItem={({ item }: { item: CommentView }) => (
					<View>
						<Text style={[PostStyles.commentPoster]}>{item.creator.name}</Text>
						<Text style={[PostStyles.comment]} >{item.comment.content}</Text>
					</View>

				)}
				keyExtractor={(item: CommentView) =>
					item.community.id.toString() + "|" + item.comment.id.toString()
				}
				onEndReached={loadMoreComments}
			/*{items.map((item, index) => (rl
			<TextPost  />
		))}
	}*/
			/>
		</View>
	);
}
