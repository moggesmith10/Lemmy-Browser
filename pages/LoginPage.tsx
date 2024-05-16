import {
	TextInput,
	View,
	Text,
	TextInputProps,
	TextInputChangeEventData,
	NativeSyntheticEvent,
} from "react-native";
import { CommonStyles } from "../styles/Global";
import { LoginStyles } from "../styles/Login";
import { LoginService } from "../components/LoginService";
import { ChangeEvent, useState } from "react";
import { walkUpBindingElementsAndPatterns } from "typescript";
import GlobalStateService from "../components/StateService";
import { CommonActions } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export function LoginPage({ navigation }) {
	let loginService = new LoginService();

	function getDefaultInstance() {
		let defaultInstance = SecureStore.getItem("loginInstance");
		if (defaultInstance != null) {
			return defaultInstance;
		}
		return "https://lemmy.world";
	}

	function getDefaultUsername() {
		let defaultUsername = SecureStore.getItem("loginUsername");
		if (defaultUsername != null) {
			return defaultUsername;
		}
		return "";
	}

	function getDefaultPassword() {
		let defaultPassword = SecureStore.getItem("loginPassword");
		if (defaultPassword != null) {
			return defaultPassword;
		}
		return "";
	}

	const [instance, setInstance] = useState(getDefaultInstance());
	const [username, setUsername] = useState(getDefaultUsername());
	const [password, setPassword] = useState(getDefaultPassword());

	const handleInstance = (
		e: NativeSyntheticEvent<TextInputChangeEventData>
	) => {
		const text = e.nativeEvent.text;
		setInstance(text);
	};

	const handleUsername = (
		e: NativeSyntheticEvent<TextInputChangeEventData>
	) => {
		const text = e.nativeEvent.text;
		setUsername(text);
	};

	const handlePassword = (
		e: NativeSyntheticEvent<TextInputChangeEventData>
	) => {
		const text = e.nativeEvent.text;
		setPassword(text);
	};

	async function login() {
		let state = GlobalStateService.getInstance();
		let client = await loginService.login(instance, username, password);
		if (client != null) {
			state.set("client", client);
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: "Browser" }],
				})
			);
		} else {
			//TODO
		}
	}

	return (
		<View style={[CommonStyles.page, LoginStyles.page]}>
			<View>
				<Text style={[CommonStyles.text, LoginStyles.inputHeader]}>
					Instance
				</Text>
				<TextInput
					id="input_instance"
					style={[CommonStyles.textInput]}
					placeholder="lemmy.world"
					value={instance}
					onChange={handleInstance}
				/>
			</View>
			<View>
				<Text style={[CommonStyles.text, LoginStyles.inputHeader]}>
					Username
				</Text>
				<TextInput
					id="input_username"
					style={[CommonStyles.textInput]}
					placeholder="Username"
					value={username}
					onChange={handleUsername}
				/>
			</View>
			<View>
				<Text style={[CommonStyles.text, LoginStyles.inputHeader]}>
					Password
				</Text>
				<TextInput
					style={[CommonStyles.textInput]}
					secureTextEntry={true}
					placeholder="Password"
					value={password}
					onChange={handlePassword}
				/>
			</View>
			<Text onPress={login} style={[CommonStyles.button, LoginStyles.button]}>
				Login
			</Text>
		</View>
	);
}
