import { View } from "react-native";
import CalcStyle from "./ui/CalcStyle";
import { Text } from "react-native";

export default function Calc(){
    return <View style={CalcStyle.pageContainer}>
        <Text style={CalcStyle.pageTitle}>Calc Page</Text>
    </View>;
}