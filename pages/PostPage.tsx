import { PostView, CommentView, CommunityView } from "lemmy-js-client";
import {
	View,
	Text,
	Image,
	ImageURISource,
	FlatList,
	ScrollView,
} from "react-native";
import { CommonStyles } from "../styles/Global";
import { PostStyles } from "../styles/Post";
import FullWidthImage from "react-native-fullwidth-image";
import { displayImage } from "../functions/DisplayImage";
import { displayContent } from "../functions/DisplayContent";
import { displayVotesForPost } from "../functions/DisplayVotes";
import { CommentService } from "../components/CommentService";
import { useCallback, useEffect, useState } from "react";
import { Comment } from "../visual/Comment";
import { PostService } from "../components/PostService";

export function PostPage({ route, navigation }) {
	//Use post sent from browser, note that some updates might happen since it was loaded to feed
	let { outdatedPost }: { outdatedPost: PostView } = route.params;
	const [comments, setComments]: [Array<CommentView>, Function] = useState([]);
	const [page, setPage] = useState(1);
	const [endReached, setEndReached] = useState(false);
	const [post, setPost]: [PostView, Function] = useState(outdatedPost);
	const [community, setCommunity]: [CommunityView, Function] = useState(null);
	const [postLoading, setPostLoading]: [boolean, Function] = useState(false); //Avoid loading post from api multiple times
	const [postLoaded, setPostLoaded]: [boolean, Function] = useState(false); //Dont show post until it has been updated. We could in theory show the old post until new is updated in future

	let commentService: CommentService = new CommentService();
	let postService: PostService = new PostService();

	//Chat GPT
	function mergeArraysByValue(
		arr1: Array<CommentView>,
		arr2: Array<CommentView>
	) {
		const mergedArray = [...arr1];

		for (const obj of arr2) {
			const existingObj = mergedArray.find(
				(item) => item.comment.id === obj.comment.id
			);
			if (!existingObj) {
				mergedArray.push(obj);
			}
		}

		return mergedArray;
	}

	async function loadMoreComments() {
		if (!endReached) {
			let newComments = commentService.getComment(post.post.id, page);
			if ((await newComments).length == 0) {
				setEndReached(true);
			}

			setPage(page + 1);

			setComments(mergeArraysByValue(comments, await newComments));
		}
	}

	async function loadPost() {
		if (!postLoading) {
			setPostLoading(true);
			console.log("Start loading  post:" + outdatedPost.post.id);

			postService.getPost(outdatedPost.post.id).then((p) => {
				console.log("Start loading  post:" + p.post_view.post.id);

				setPost(p.post_view);
				setCommunity(p.community_view);

				setPostLoaded(true);
			});
		}
	}

	useEffect(() => {
		console.log("Loading post loaded:" + postLoaded);
		if (!postLoaded) {
			loadPost();
		}
		if (page == 1) {
			loadMoreComments();
		}
	});

	return (
		<View style={[CommonStyles.page]}>
			{postLoaded ? (
				<FlatList
					ListHeaderComponent={
						<View>
							<View style={[PostStyles.upper]}>
								<Text style={[PostStyles.header]}>
									{community.community.title + " | " + post.creator.name}
								</Text>
								<Text style={[PostStyles.title]}>{post.post.name}</Text>
							</View>
							<Text style={[PostStyles.body]}>{post.post.body}</Text>
							{displayContent(post)}
							{displayVotesForPost(post)}
						</View>
					}
					data={comments}
					renderItem={(c) => <Comment comment={c.item} />}
					keyExtractor={(item: CommentView) =>
						item.community.id.toString() + "|" + item.comment.id.toString()
					}
					onEndReached={loadMoreComments}
				/>
			) : (
				<View></View>
			)}
		</View>
	);
}
