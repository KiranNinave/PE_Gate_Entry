import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Icon, Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

class ResultScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: "out"
        };
    }
    render() {
        if (this.state.screen === "new") {
            return (
                <LinearGradient
                    colors={["#4CAF50", "#8BC34A"]}
                    style={styles.container}
                >
                    <Icon
                        name="ios-checkmark-circle-outline"
                        type="ionicon"
                        size={100}
                    />
                    <Text style={styles.title}>In</Text>
                    <Button
                        title="NEXT SCAN"
                        buttonStyle={styles.button}
                        linearGradientProps={{
                            colors: ["#FF9800", "#F44336"],
                            start: [1, 0],
                            end: [0.2, 0]
                        }}
                        ViewComponent={LinearGradient}
                        titleStyle={styles.buttonText}
                        onPress={() => this.props.navigation.navigate("camera")}
                    />
                </LinearGradient>
            );
        }
        if (this.state.screen === "in") {
            return (
                <LinearGradient
                    colors={["#FFD600", "#FF9800"]}
                    style={styles.container}
                >
                    <Icon name="ios-checkmark" type="ionicon" size={100} />
                    <Text style={styles.title}>Already In</Text>
                    <Button
                        title="NEXT SCAN"
                        buttonStyle={styles.button}
                        linearGradientProps={{
                            colors: ["#FF9800", "#F44336"],
                            start: [1, 0],
                            end: [0.2, 0]
                        }}
                        ViewComponent={LinearGradient}
                        titleStyle={styles.buttonText}
                        onPress={() => this.props.navigation.navigate("camera")}
                    />
                </LinearGradient>
            );
        }
        if (this.state.screen === "out") {
            return (
                <LinearGradient
                    colors={["#F44336", "#E91E63"]}
                    style={styles.container}
                >
                    <Icon name="ios-close" type="ionicon" size={100} />
                    <Text style={styles.title}>Out</Text>
                    <Button
                        title="NEXT SCAN"
                        buttonStyle={styles.button}
                        linearGradientProps={{
                            colors: ["#FF9800", "#F44336"],
                            start: [1, 0],
                            end: [0.2, 0]
                        }}
                        ViewComponent={LinearGradient}
                        titleStyle={styles.buttonText}
                        onPress={() => this.props.navigation.navigate("camera")}
                    />
                </LinearGradient>
            );
        }
        return (
            <View style={styles.container}>
                <Icon name="ios-barcode" type="ionicon" size={100} />
                <Text style={styles.title}>Processing...</Text>
                <Button
                    title="CANCEL"
                    buttonStyle={styles.button}
                    linearGradientProps={{
                        colors: ["#FF9800", "#F44336"],
                        start: [1, 0],
                        end: [0.2, 0]
                    }}
                    ViewComponent={LinearGradient}
                    titleStyle={styles.buttonText}
                    onPress={() => this.props.navigation.navigate("camera")}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontFamily: "UbuntuBold",
        fontSize: 50
    },
    buttonText: {
        fontFamily: "UbuntuBold",
        fontSize: 13
    },
    button: {
        width: 250,
        marginTop: 50,
        borderRadius: Math.round(45 / 2),
        height: 45
    }
});

export default ResultScreen;
