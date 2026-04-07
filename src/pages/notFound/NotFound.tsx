import { View, Text } from "react-native";
import NotFoundStyle from "./ui/NotFoundStyle";

export default function NotFound() {
    return (
        <View style={NotFoundStyle.pageContainer}>
            <Text style={NotFoundStyle.pageTitle}>404</Text>
            <Text>Page not found</Text>
        </View>
    );
}