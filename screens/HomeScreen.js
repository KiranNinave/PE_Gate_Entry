import React from "react";
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Alert,
    BackHandler,
    Dimensions
} from "react-native";
import { Button, Image } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";

import buttonStyle from "../styles/button";

import baseStyle from "../styles/base";

let SCREEN_WIDTH = Dimensions.get("window").width;
SCREEN_WIDTH = SCREEN_WIDTH * 0.85;

class HomeScreen extends React.Component {
    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props);

        this._didFocusSubscription = props.navigation.addListener(
            "didFocus",
            payload =>
                BackHandler.addEventListener(
                    "hardwareBackPress",
                    this.onBackButtonPressAndroid
                )
        );
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener(
            "willBlur",
            payload =>
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    this.onBackButtonPressAndroid
                )
        );
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
        Alert.alert(
            "Exit App",
            "Do you want to exit?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => BackHandler.exitApp() }
            ],
            { cancelable: false }
        );
        return true;
    };

    onScan = () => {
        this.props.navigation.navigate("days");
    };
    render() {
        return (
            <ScrollView contentContainerStyle={baseStyle.container}>
                <Text style={baseStyle.headerTitle}>HOME</Text>
                <View style={styles.content}>
                    <View></View>
                    <View>
                        <Image
                            source={require("../assets/logo.png")}
                            style={styles.logo}
                        />
                    </View>
                    <View>
                        {this.props.username && (
                            <Text style={styles.subtitle}>
                                {this.props.username}
                            </Text>
                        )}
                        <Button
                            title="SCAN"
                            buttonStyle={buttonStyle.buttonContainer}
                            linearGradientProps={{
                                colors: ["#FF9800", "#F44336"],
                                start: [1, 0],
                                end: [0.2, 0]
                            }}
                            ViewComponent={LinearGradient}
                            titleStyle={buttonStyle.buttonText}
                            onPress={this.onScan}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center"
    },
    subtitle: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center"
    },
    clock: {
        color: "#FF9800",
        fontFamily: "UbuntuLight",
        fontSize: 50
    },
    date: {
        color: "#FF9800",
        fontFamily: "UbuntuBold",
        fontSize: 18
    },
    logo: {
        minWidth: SCREEN_WIDTH,
        minHeight: SCREEN_WIDTH - parseInt(SCREEN_WIDTH / (SCREEN_WIDTH / 20))
    }
});

const mapStateToProps = state => ({
    username: state.user.username
});

export default connect(
    mapStateToProps,
    null
)(HomeScreen);
