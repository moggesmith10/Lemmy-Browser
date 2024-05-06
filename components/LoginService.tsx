import { LemmyHttp, Login } from "lemmy-js-client";
import { StateProvider, useSharedState } from "./StateContext";
import { StateContext } from "./StateContext";
import { Context, useContext } from "react";
import GlobalStateService from "./StateService";



export class LoginService {

	async login(instance: string, username_or_email: string, password: string) : Promise<LemmyHttp> {
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
			await client.login(loginForm);
			return client;
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}
