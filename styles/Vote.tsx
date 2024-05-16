import { StyleSheet } from "react-native";

export const VoteStyle = StyleSheet.create({
    voteContainer:{
        flexDirection: "row",
        
    },
    vote:{
        fontSize:30,
        marginLeft: 10,
        color: "lightgrey"
    },
    voteUpEnabled:{
        color: "green"
    },
    voteDownEnabled:{
        color: "red"
    }
})