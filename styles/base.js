import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#293046",
        paddingTop: StatusBar.currentHeight
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    headerTitle: {
        color: "white",
        fontSize: 28,
        fontFamily: "UbuntuLight",
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 20
    }
});
