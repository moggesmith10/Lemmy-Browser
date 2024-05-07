import { Button, View, Text} from "react-native";
import { CommonStyles } from "../styles/Global";
import { WelcomeStyles } from "../styles/Welcome";

export function WelcomePage({navigation}){
    return (
        <View style={[CommonStyles.page, WelcomeStyles.page]}>
            <View>
            <Text style={WelcomeStyles.header}>Lemmy Browser</Text>
            <Text style={WelcomeStyles.subheader}>The new way to browse Lemmy</Text>
            </View>
            <Text onPress={() => {navigation.navigate("Login")}} style={[CommonStyles.button, WelcomeStyles.button]}>Login</Text>
        </View>
    )
}