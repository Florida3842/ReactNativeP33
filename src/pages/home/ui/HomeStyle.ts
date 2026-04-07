import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";

const HomeStyle = StyleSheet.create({
    pageContainer: {
        flex: 1,
        alignItems: "center",
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: "600",
        
    },
    pageWidget: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    card: {
        width: "40%",
        marginVertical: 10,
        alignItems: "center",
    },

    imagePlaceholder: {
        width: "100%",
        height: 100,
        backgroundColor: "#bbbbbb86",
        borderRadius: 8,    
    },
    titlePlaceholder: {
        width: "80%",
        height: 20,
        backgroundColor: "#bbbbbb86",
        marginTop: 8,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: Colors.primaryTextColor,
    }
});

export default HomeStyle;