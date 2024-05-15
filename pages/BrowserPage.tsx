import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import GlobalStateService from "../components/StateService";
import { LemmyHttp, Post, PostView, ListingType } from "lemmy-js-client";
import { BrowserStyles } from "../styles/Browser";
import { CommonStyles } from "../styles/Global";
import { useSharedState } from "../components/StateContext";
import { TextPost } from "../visual/Post";
import { LoginStyles } from "../styles/Login";
import InfiniteScroll from "react-infinite-scroller";
import { PostService } from "../components/PostService";

let state = GlobalStateService.getInstance();

const defaultState = "Subscribed";

export function BrowserPage({ navigation }) {
	const [items, setItems]: [Array<PostView>, Function] = useState([]);
	const [environment, setEnvironment]: [ListingType, Function] =
		useState(defaultState);
	const [communityId, setCommunityId]: [number, Function] = useState(null);
	const [page, setPage] = useState(1);

	let postService = new PostService();

	function changeEnvironment(environment: ListingType) {
		setCommunityId(null);
		setEnvironment(environment);
		resetItems();
	}

	function updateCommunityId(cId : number){
		setCommunityId(cId);
		resetItems();
	}

	function resetItems(){
		setPage(1);
		setItems([]);
		loadMorePosts();
	}

	//Chat GPT
	function mergeArraysByValue(arr1: Array<PostView>, arr2: Array<PostView>) {
		const mergedArray = [...arr1];

		for (const obj of arr2) {
			const existingObj = mergedArray.find(
				(item) =>
					item.community.id === obj.community.id && item.post.id === obj.post.id
			);
			if (!existingObj) {
				mergedArray.push(obj);
			}
		}

		return mergedArray;
	}

	async function loadMorePosts() {
		let client: LemmyHttp;
		client = state.get("client");
		if (client != undefined) {
			console.log(communityId)
			let posts =
				communityId != null
					? await postService.getPostsByCommunity(page, communityId)
					: await postService.getPosts(page, environment);

			setPage(page + 1);

			setItems(mergeArraysByValue(items, posts));
		}
	}

	useEffect(() => {
		if (page == 1) {
			loadMorePosts();
		}
	});

	return (
		<View key={0} style={[BrowserStyles.page, CommonStyles.page]}>
			<View>
				<View style={BrowserStyles.environmentButtonContainer}>
					<TouchableOpacity
						style={[CommonStyles.button, BrowserStyles.environmentButton]}
						onPress={() => changeEnvironment("Subscribed")}
					>
						<Text>Subscribed</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[CommonStyles.button, BrowserStyles.environmentButton]}
						onPress={() => changeEnvironment("Local")}
					>
						<Text>Local</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[CommonStyles.button, BrowserStyles.environmentButton]}
						onPress={() => changeEnvironment("All")}
					>
						<Text>All</Text>
					</TouchableOpacity>
				</View>
				<FlatList
					data={items}
					renderItem={({ item }) => (
						<TextPost
							navigation={navigation}
							post={item}
							setCommunityId={updateCommunityId}
						/>
					)}
					keyExtractor={(item: PostView) =>
						item.community.id.toString() + "|" + item.post.id.toString()
					}
					onEndReached={loadMorePosts}
				/>
			</View>
			{/**This button is now not used anymore, the flatlist will autoload more posts.
			 * However I'm leaving this here if filters are leaving the page empty
			 * (I.e if we have filters that makes the next page empty, you can force it to load again if you think there are more posts)
			 * It may also be possible for flatlist to not update if end of list is not outside of page
			 */}
			<Text
				onPress={loadMorePosts}
				style={[CommonStyles.button, LoginStyles.button]}
			>
				load
			</Text>
		</View>
	);
}
