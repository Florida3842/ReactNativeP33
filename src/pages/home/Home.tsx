import { View } from "react-native";
import HomeStyle from "./ui/HomeStyle";
import { Text } from "react-native";



export default function Home(){
    return <View style={HomeStyle.pageContainer}>
        <Text style={HomeStyle.pageTitle}>Home Page</Text>

        <View style={HomeStyle.pageWidget}>
                <View style={HomeStyle.card}>
                    <View style={HomeStyle.imagePlaceholder}></View>
                    <View style={HomeStyle.titlePlaceholder}>
                        <Text style={HomeStyle.text}>Loading...</Text>
                    </View>
                </View>

                <View style={HomeStyle.card}>
                    <View style={HomeStyle.imagePlaceholder}></View>
                    <View style={HomeStyle.titlePlaceholder}>
                        <Text style={HomeStyle.text}>Loading...</Text>
                    </View>
                </View>

                <View style={HomeStyle.card}>
                    <View style={HomeStyle.imagePlaceholder}></View>
                    <View style={HomeStyle.titlePlaceholder}>
                        <Text style={HomeStyle.text}>Loading...</Text>
                    </View>
                </View>

                <View style={HomeStyle.card}>
                    <View style={HomeStyle.imagePlaceholder}></View>
                    <View style={HomeStyle.titlePlaceholder}>
                        <Text style={HomeStyle.text}>Loading...</Text>
                    </View>
                </View>

                <View style={HomeStyle.card}>
                    <View style={HomeStyle.imagePlaceholder}></View>
                    <View style={HomeStyle.titlePlaceholder}>
                        <Text style={HomeStyle.text}>Loading...</Text>
                    </View>
                </View>

                <View style={HomeStyle.card}>
                    <View style={HomeStyle.imagePlaceholder}></View>
                    <View style={HomeStyle.titlePlaceholder}>
                        <Text style={HomeStyle.text}>Loading...</Text>
                    </View>
                </View> 

            </View>
    </View>;
}