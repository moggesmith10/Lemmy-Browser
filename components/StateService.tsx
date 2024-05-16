import { useState } from "react";

class GlobalStateService {
	private static instance: GlobalStateService;
	private state: Record<string, any>;

	private constructor() {
		this.state = {};
	}

	public static getInstance(): GlobalStateService {
		if (!GlobalStateService.instance) {
			GlobalStateService.instance = new GlobalStateService();
		}
		return GlobalStateService.instance;
	}

	public set(key: string, value: any): void {
		this.state[key] = value;
	}

	public get(key: string): any {
		return this.state[key];
	}

	public getAll(): Record<string, any> {
		return this.state;
	}

	public clear(): void {
		this.state = {};
	}
}

export default GlobalStateService;
