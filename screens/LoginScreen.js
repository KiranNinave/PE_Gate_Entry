import React from "react";
import {
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    UIManager,
    ToastAndroid,
    Alert,
    BackHandler
} from "react-native";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { Input, Icon, Button } from "react-native-elements";

import baseStyles from "../styles/base";
import { userLoginAction } from "../actions/userActions";

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

class LoginScreen extends React.Component {
    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            inputsDisabled: false,
            username: "",
            password: ""
        };
        this.isComponentMounted = true;

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
        this.isComponentMounted = false;

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

    login = async () => {
        if (
            this.state.username.length !== 13 &&
            this.state.username.length !== 14
        ) {
            ToastAndroid.show("Invalid username!", ToastAndroid.LONG);
        } else if (
            this.state.password.length !== 7 &&
            this.state.password.length !== 8
        ) {
            ToastAndroid.show("Invalid password!", ToastAndroid.LONG);
        } else {
            // logged user
            const { username, password } = this.state;
            try {
                this.setState({ loading: true, inputsDisabled: true });
                await this.props.userLoginAction({ username, password });
                this.props.navigation.navigate("home");
            } catch (err) {
                ToastAndroid.show(err.message, ToastAndroid.LONG);
            } finally {
                if (this.isComponentMounted) {
                    this.setState({ loading: false, inputsDisabled: false });
                }
            }
        }
    };
    render() {
        return (
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={[
                    baseStyles.container,
                    baseStyles.center
                ]}
            >
                <KeyboardAvoidingView behavior="position">
                    <Text style={styles.signUpText}>LOGIN</Text>
                    <Input
                        ref={input => (this.username = input)}
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={styles.inputStyle}
                        leftIcon={
                            <Icon
                                name="user"
                                type={"simple-line-icon"}
                                color="#7384B4"
                                size={18}
                            />
                        }
                        placeholder="username"
                        placeholderTextColor="#7384B4"
                        value={this.state.username}
                        onChangeText={text => this.setState({ username: text })}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            // this.validatePassword();
                            this.password.focus();
                        }}
                        autoCorrect={false}
                        blurOnSubmit={false}
                        autoFocus={false}
                        disabled={this.state.inputsDisabled}
                    />
                    <Input
                        ref={input => (this.password = input)}
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={styles.inputStyle}
                        leftIcon={
                            <Icon
                                name="lock"
                                type={"simple-line-icon"}
                                color="#7384B4"
                                size={18}
                            />
                        }
                        placeholder="password"
                        placeholderTextColor="#7384B4"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                        returnKeyType="go"
                        onSubmitEditing={() => {
                            // this.validateConfirmationPassword();
                            this.login();
                        }}
                        autoCorrect={false}
                        blurOnSubmit={false}
                        autoFocus={false}
                        disabled={this.state.inputsDisabled}
                    />
                    <Button
                        title="LOGIN"
                        buttonStyle={styles.signUpButton}
                        linearGradientProps={{
                            colors: ["#FF9800", "#F44336"],
                            start: [1, 0],
                            end: [0.2, 0]
                        }}
                        ViewComponent={LinearGradient}
                        titleStyle={styles.signUpButtonText}
                        onPress={this.login}
                        loading={this.state.loading}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    signUpText: {
        color: "white",
        fontSize: 28,
        fontFamily: "UbuntuLight",
        marginLeft: 5,
        marginBottom: 10
    },
    inputContainer: {
        paddingLeft: 8,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: "rgba(110, 120, 170, 1)",
        height: 45,
        marginVertical: 10
    },
    inputStyle: {
        flex: 1,
        marginLeft: 10,
        color: "white",
        fontFamily: "UbuntuLight",
        fontSize: 16
    },
    signUpButtonText: {
        fontFamily: "UbuntuBold",
        fontSize: 13
    },
    signUpButton: {
        width: 250,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: Math.round(45 / 2),
        height: 45
    }
});

export default connect(
    null,
    { userLoginAction }
)(LoginScreen);
