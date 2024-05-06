import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StateProvider } from "./components/StateContext";
import { WelcomePage } from "./pages/WelcomePage";
import { LoginPage } from "./pages/LoginPage";
import { BrowserPage } from "./pages/BrowserPage";
import { PostPage } from "./pages/PostPage";


export default function App() {
	const Stack = createNativeStackNavigator();


	return (
		<StateProvider>
		<NavigationContainer>
		  <Stack.Navigator initialRouteName="Welcome">
			<Stack.Screen name="Welcome" component={WelcomePage}/>
			<Stack.Screen name="Login" component={LoginPage}/>
			<Stack.Screen name="Browser" component={BrowserPage}/>
			<Stack.Screen name="Post" component={PostPage}/>
		  </Stack.Navigator>
		</NavigationContainer>
	  </StateProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
