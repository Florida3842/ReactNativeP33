import { Text, View } from "react-native";
import AppContentStyle from "./AppContentStyle";

export default function App() {
    return <View style={AppContentStyle.container}>
        <View style={AppContentStyle.topBar}>
            <View style={AppContentStyle.topBarIcon}></View>
            <Text style={AppContentStyle.topBarTitle}>Mobile-P33</Text>
            <View style={AppContentStyle.topBarIcon}></View>
        </View>

        <View style={AppContentStyle.pageWidget}>
            <View style={AppContentStyle.card}>
                <View style={AppContentStyle.imagePlaceholder}></View>
                <View style={AppContentStyle.titlePlaceholder}>
                    <Text style={AppContentStyle.text}>Loading...</Text>
                </View>
            </View>

            <View style={AppContentStyle.card}>
                <View style={AppContentStyle.imagePlaceholder}></View>
                <View style={AppContentStyle.titlePlaceholder}>
                    <Text style={AppContentStyle.text}>Loading...</Text>
                </View>
            </View>

            <View style={AppContentStyle.card}>
                <View style={AppContentStyle.imagePlaceholder}></View>
                <View style={AppContentStyle.titlePlaceholder}>
                    <Text style={AppContentStyle.text}>Loading...</Text>
                </View>
            </View>

            <View style={AppContentStyle.card}>
                <View style={AppContentStyle.imagePlaceholder}></View>
                <View style={AppContentStyle.titlePlaceholder}>
                    <Text style={AppContentStyle.text}>Loading...</Text>
                </View>
            </View>

            <View style={AppContentStyle.card}>
                <View style={AppContentStyle.imagePlaceholder}></View>
                <View style={AppContentStyle.titlePlaceholder}>
                    <Text style={AppContentStyle.text}>Loading...</Text>
                </View>
            </View>

            <View style={AppContentStyle.card}>
                <View style={AppContentStyle.imagePlaceholder}></View>
                <View style={AppContentStyle.titlePlaceholder}>
                    <Text style={AppContentStyle.text}>Loading...</Text>
                </View>
            </View> 
        </View>

        <View style={AppContentStyle.bottomBar}>
            <View style={AppContentStyle.bottomBarIcon}></View>
            <View style={AppContentStyle.bottomBarIcon}></View>
            <View style={AppContentStyle.bottomBarIcon}></View>
            <View style={AppContentStyle.bottomBarIcon}></View>
            <View style={AppContentStyle.bottomBarIcon}></View>
        </View>

    </View>
    
}