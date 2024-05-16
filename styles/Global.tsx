import { StyleSheet } from "react-native";

export const CommonStyles = StyleSheet.create({
	text: {
		fontSize: 15,
		color: "white",
	},
	textInput: {
		backgroundColor: "lightgrey",
		color: "rgba(25,25,35,255)",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		borderColor: "lightblue",
		borderWidth: 3,
		borderRadius: 5,
		margin: 5,
		paddingEnd: 20,
		paddingStart: 20,
	},
	page: {
		backgroundColor: "rgba(25,25,35,255)",
		flex: 1,
	},
	button: {
		color: "white",
		borderStyle: "solid",
		backgroundColor: "grey",
		textAlign: "center",
		justifyContent: "space-between",
		flex: 1,
		margin: 50,
		maxHeight: 50,
	},
});
