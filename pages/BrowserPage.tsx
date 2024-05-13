import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import GlobalStateService from "../components/StateService";
import { LemmyHttp, Post, PostView, ListingType } from "lemmy-js-client";
import { BrowserStyles } from "../styles/Browser";
import { CommonStyles } from "../styles/Global";
import { useSharedState } from "../components/StateContext";
import { TextPost } from "../visual/Post";
import { LoginStyles } from "../styles/Login";
import InfiniteScroll from "react-infinite-scroller";

let state = GlobalStateService.getInstance();

export function BrowserPage({ navigation }) {

	const [items, setItems] = useState([]);
	const [environment, setEnvironment] : [ListingType, Function] = useState("Subscribed")
	const [page, setPage] = useState(1);

	function changeEnvironment(environment : ListingType){
		setEnvironment(environment);
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
			let currentPage = page;
			let posts = (await client.getPosts({ page: currentPage, type_:environment })).posts;

			setPage(page + 1);

			setItems(mergeArraysByValue(items, posts));
		}
	}

	useEffect(() => {
		if (page == 1) {
			loadMorePosts();
		}
	})

	return (
		<View key={0} style={[BrowserStyles.page, CommonStyles.page]}>
			<View>
				<View style={BrowserStyles.environmentButtonContainer}>
				<TouchableOpacity style={[CommonStyles.button, BrowserStyles.environmentButton]} onPress={() => changeEnvironment("Subscribed")}>
					<Text>Subscribed</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[CommonStyles.button, BrowserStyles.environmentButton]} onPress={() => changeEnvironment("Local")}>
					<Text>Local</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[CommonStyles.button, BrowserStyles.environmentButton]} onPress={() => changeEnvironment("All")}>
					<Text>All</Text>
				</TouchableOpacity>
				</View>
				<FlatList
					data={items}
					renderItem={({ item }) => (
						<TextPost navigation={navigation} post={item} />
					)}
					keyExtractor={(item: PostView) =>
						item.community.id.toString() + "|" + item.post.id.toString()
					}
					onEndReached={loadMorePosts}
					/*{items.map((item, index) => (rl
					<TextPost  />
				))}
			}*/
				/>
			</View>
			<Text
				onPress={loadMorePosts}
				style={[CommonStyles.button, LoginStyles.button]}
			>
				load
			</Text>
		</View>
	);
}
