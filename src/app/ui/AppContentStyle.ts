import { StyleSheet } from "react-native";
import Colors from "../../features/config/Colors";

const AppContentStyle = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
    },
    topBar: {
        backgroundColor: "#333",
        height: 50,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    topBarIcon: {
        backgroundColor: "#bbb",
        height: 42,
        width: 42,
        marginHorizontal: 10,
    },
    topBarTitle: {
        color: Colors.primaryTextColor,
        flex: 1,
        textAlign: "center",
        fontSize: 16,
        fontWeight: 700,
    },
    pageWidget: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
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
    bottomBar: {
        backgroundColor: "#333",
        height: 60,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    bottomBarIcon: {
        backgroundColor: "#bbb",
        height: 42,
        width: 42,
    },
    text: {
        color: Colors.primaryTextColor,
    }
});

export default AppContentStyle;