import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import GlobalStateService from "../components/StateService";
import { LemmyHttp, PostView } from "lemmy-js-client";
import { BrowserStyles } from "../styles/Browser";
import { CommonStyles } from "../styles/Global";
import { useSharedState } from "../components/StateContext";
import { TextPost } from "../visual/TextPost";
import { LoginStyles } from "../styles/Login";
import InfiniteScroll from 'react-infinite-scroller';

let state = GlobalStateService.getInstance();

export function BrowserPage({navigation}) {
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);

	async function loadMorePosts() {
		let client: LemmyHttp;
		client = state.get("client");
		if (client != undefined) {
			let currentPage = page;
			let posts = (await client.getPosts({page:currentPage})).posts;
			console.log(posts.length);
			console.log(items.length)

			setPage(page + 1);
			setItems([...items, ...posts])
			
		}
	}

	return (
		<View key={0} style={[BrowserStyles.page, CommonStyles.page]}>
			<View>
			<FlatList
				data={
					items
				}
				renderItem= {({item}) => <TextPost navigation={navigation} post={item}/>}
			keyExtractor={(item :PostView) => item.community.id.toString() + item.post.id.toString()}
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
