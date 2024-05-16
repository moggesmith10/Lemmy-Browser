import { LemmyHttp, Login } from "lemmy-js-client";
import { StateProvider, useSharedState } from "./StateContext";
import { StateContext } from "./StateContext";
import { Context, useContext } from "react";
import GlobalStateService from "./StateService";
import * as SecureStore from "expo-secure-store";

export class LoginService {
	async login(
		instance: string,
		username_or_email: string,
		password: string
	): Promise<LemmyHttp> {
		console.log(instance);
		console.log(username_or_email);
		console.log(password.length);
		let baseUrl = instance;
		let client: LemmyHttp = new LemmyHttp(baseUrl);
		let loginForm: Login = {
			username_or_email: username_or_email,
			password: password,
		};
		try {
			let loginResponse = await client.login(loginForm);
			client.setHeaders({ Authorization: `Bearer ${loginResponse.jwt}` });
			SecureStore.setItemAsync("loginInstance", instance);
			SecureStore.setItemAsync("loginUsername", username_or_email);
			SecureStore.setItemAsync("loginPassword", password);
			return client;
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}
