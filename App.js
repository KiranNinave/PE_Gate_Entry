import React from "react";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import * as Permissions from "expo-permissions";
import { Provider } from "react-redux";
import { ThemeProvider } from "react-native-elements";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

// redux
import store from "./store/store";

// screens
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import DaysScreen from "./screens/DaysScreen";
import CameraScreen from "./screens/CameraScreen";
import ResultScreen from "./screens/ResultScreen";

// apis
import { getUser } from "./apis/storageApis";

// actions
import { setUserAction } from "./actions/userActions";
import { cameraPermissionAction } from "./actions/appActions";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            screen: "login"
        };
    }

    async componentDidMount() {
        SplashScreen.preventAutoHide();

        // check for existing user
        await this.checkLoggedUser();

        // check for camera permissions
        this.checkPermissions();

        // load custom font
        await Font.loadAsync({
            UbuntuBold: require("./assets/fonts/Ubuntu-Bold.ttf"),
            UbuntuLight: require("./assets/fonts/Ubuntu-Light.ttf"),
            UbuntuLightItalic: require("./assets/fonts/Ubuntu-Light-Italic.ttf")
        });
        this.setState({ fontLoaded: true });
        SplashScreen.hide();
    }

    checkLoggedUser = async () => {
        const user = await getUser();
        if (user) {
            this.setState({ screen: "app" });
            store.dispatch(setUserAction(user));
        }
    };

    checkPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        store.dispatch(
            cameraPermissionAction({
                hasCameraPermission: status === "granted"
            })
        );
    };

    render() {
        if (!this.state.fontLoaded) return null; // wait for font
        const ScanerNavigation = createSwitchNavigator(
            {
                camera: {
                    screen: CameraScreen
                },
                result: {
                    screen: ResultScreen
                }
            },
            {
                initialRouteName: "result"
            }
        );
        const AppNavigation = createStackNavigator(
            {
                home: {
                    screen: HomeScreen,
                    navigationOptions: {
                        header: null
                    }
                },
                days: {
                    screen: DaysScreen,
                    navigationOptions: {
                        header: null
                    }
                },
                scan: {
                    screen: ScanerNavigation,
                    navigationOptions: {
                        header: null
                    }
                }
            },
            {
                // initialRouteName: "home"
            }
        );
        const RootNavigation = createBottomTabNavigator(
            {
                login: {
                    screen: LoginScreen,
                    navigationOptions: {
                        tabBarVisible: false
                    }
                },
                app: {
                    screen: AppNavigation,
                    navigationOptions: {
                        tabBarVisible: false
                    }
                }
            },
            {
                tabBarVisible: false,
                initialRouteName: this.state.screen
            }
        );
        const AppContainer = createAppContainer(RootNavigation);
        return (
            <Provider store={store}>
                <ThemeProvider>
                    <AppContainer />
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;
