import React from "react";
import { Audio } from "expo-av";
import {
    Text,
    View,
    StyleSheet,
    BackHandler,
    ToastAndroid
} from "react-native";
import { Icon, Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { qrValidationApi } from "../apis/qrApis";

class ResultScreen extends React.Component {
    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props);
        this.state = {
            screen: "loading", // loading, new, in, out, error
            type: "user"
        };

        this._didFocusSubscription = props.navigation.addListener(
            "didFocus",
            payload =>
                BackHandler.addEventListener(
                    "hardwareBackPress",
                    this.onBackButtonPressAndroid
                )
        );
    }
    async componentDidMount() {
        // back handling
        this._willBlurSubscription = this.props.navigation.addListener(
            "willBlur",
            payload =>
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    this.onBackButtonPressAndroid
                )
        );

        // fetching day and qr details
        const day = this.props.navigation.getParam("day", null);
        const qr = this.props.navigation.getParam("qr", null);
        console.log("result", day, qr);
        const data = { day, qr };
        await this.validQr(data);
    }

    componentWillUnmount() {
        this._willBlurSubscription = this.props.navigation.addListener(
            "willBlur",
            payload =>
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    this.onBackButtonPressAndroid
                )
        );
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    onBackButtonPressAndroid = () => {
        const day = this.props.navigation.getParam("day", null);
        if (day) {
            this.props.navigation.navigate("camera", { day });
        }
        return true;
    };

    playRingtone = async type => {
        try {
            if (type === "out") {
                const soundObject = new Audio.Sound();
                await soundObject.loadAsync(require("../assets/out.mp3"));
                await soundObject.playAsync();
            } else if (type === "new") {
                const soundObject = new Audio.Sound();
                await soundObject.loadAsync(require("../assets/new.mp3"));
                await soundObject.playAsync();
            } else if (type === "in") {
                const soundObject = new Audio.Sound();
                await soundObject.loadAsync(require("../assets/in.mp3"));
                await soundObject.playAsync();
            }
        } catch (err) {
            ToastAndroid.show(err.message, ToastAndroid.LONG);
        }
    };

    validQr = async data => {
        try {
            const response = await qrValidationApi(data);
            await this.playRingtone(response.message);
            this.setState({ screen: response.message, type: response.type });
        } catch (err) {
            this.setState({ screen: "error" });
            ToastAndroid.show(err.message, ToastAndroid.LONG);
        }
    };

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
                    <Text style={styles.title}>Valid</Text>
                    {this.state.type && (
                        <Text style={styles.subtitle}>{this.state.type}</Text>
                    )}

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
                        onPress={() => {
                            const day = this.props.navigation.getParam(
                                "day",
                                null
                            );
                            this.props.navigation.navigate("camera", { day });
                        }}
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
                    {this.state.type && (
                        <Text style={styles.subtitle}>{this.state.type}</Text>
                    )}
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
                        onPress={() => {
                            const day = this.props.navigation.getParam(
                                "day",
                                null
                            );
                            this.props.navigation.navigate("camera", { day });
                        }}
                    />
                </LinearGradient>
            );
        }
        if (this.state.screen === "out") {
            return (
                <LinearGradient
                    colors={["#FF0000", "#BF2121"]}
                    style={styles.container}
                >
                    <Icon name="ios-close" type="ionicon" size={100} />
                    <Text style={styles.title}>Invalid</Text>
                    {this.state.type && (
                        <Text style={styles.subtitle}>{this.state.type}</Text>
                    )}
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
                        onPress={() => {
                            const day = this.props.navigation.getParam(
                                "day",
                                null
                            );
                            this.props.navigation.navigate("camera", { day });
                        }}
                    />
                </LinearGradient>
            );
        }
        if (this.state.screen === "error") {
            return (
                <View style={styles.container}>
                    <Icon name="ios-sync" type="ionicon" size={100} />
                    <Text style={styles.title}>Can't reach to server</Text>
                    <Text style={styles.title}>Please retry again!</Text>
                    <Button
                        title="RETRY"
                        buttonStyle={styles.button}
                        linearGradientProps={{
                            colors: ["#FF9800", "#F44336"],
                            start: [1, 0],
                            end: [0.2, 0]
                        }}
                        ViewComponent={LinearGradient}
                        titleStyle={styles.buttonText}
                        onPress={() => {
                            const day = this.props.navigation.getParam(
                                "day",
                                null
                            );
                            this.props.navigation.navigate("camera", { day });
                        }}
                    />
                </View>
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
                    onPress={() => {
                        const day = this.props.navigation.getParam("day", null);
                        this.props.navigation.navigate("camera", { day });
                    }}
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
    subtitle: {
        fontFamily: "UbuntuBold",
        fontSize: 30
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
