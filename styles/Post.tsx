import { StyleSheet } from "react-native";

export const PostStyles = StyleSheet.create({
    header:{
        color: "lightgrey"
    },
    title:{
        color: "white",
        fontSize: 20
    },
    upper:{
        borderBottomColor: "grey",
        borderBottomWidth: 1
    },
    body:{
        color:"lightgrey"
    },
    commentContainer:{
        backgroundColor: "rgba(40,40,50,255)",
        margin: 5
    },
    commentPoster:{
        color:"lightgrey",
        fontSize: 20
    },
    comment:{
        color:"white",
        fontSize: 15
    },
    commentReply:{
        backgroundColor: "rgba(50,50,60,255)",
        flex: 0.8,
        flexDirection: "row",
        height: 35
    },
    commentReplyInput:{
        flex: 0.8,
        color: "white"
    },
    commentReplyButton:{
        flex: 0.2,
        color: "red",
        margin: 0,
    },
    commentReplyButtonText:{
        flex: 1,
        color: "black",
        margin: 0,
        textAlign: "center"
    },
    invisible:{
        height: 0,
        width: 0,
        position: "absolute"
    }
});
