import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

import { connect } from "react-redux";
import { cameraPermissionAction } from "../actions/appActions";

import baseStyle from "../styles/base";

class CameraScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scanned: false
        };
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.props.cameraPermissionAction({
            hasCameraPermission: status === "granted"
        });
    };

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        console.log(type, data);
    };

    render() {
        const { scanned } = this.state;
        const { hasCameraPermission } = this.props;

        if (hasCameraPermission === null) {
            return (
                <View style={baseStyle.container}>
                    <Text style={baseStyle.headerTitle}>SCAN</Text>
                    <View style={styles.content}>
                        <Text style={styles.contentText}>
                            Requesting for camera permission
                        </Text>
                    </View>
                </View>
            );
        }
        if (hasCameraPermission === false) {
            return (
                <View style={baseStyle.container}>
                    <Text style={baseStyle.headerTitle}>SCAN</Text>
                    <View style={styles.content}>
                        <Text style={styles.contentText}>
                            No access to camera
                        </Text>
                        <Button
                            title="Give access"
                            type="clear"
                            titleStyle={styles.buttonTitile}
                            onPress={async () => this.getPermissionsAsync()}
                        />
                    </View>
                </View>
            );
        }

        return (
            <BarCodeScanner
                onBarCodeScanned={
                    scanned ? undefined : this.handleBarCodeScanned
                }
                style={[styles.container]}
            >
                <View style={styles.layerTop}></View>
                <View style={styles.layerCenter}>
                    <View style={styles.layerLeft} />
                    <View style={styles.focused} />
                    <View style={styles.layerRight} />
                </View>
                <View style={styles.layerBottom}>
                    <Button
                        title="cancel"
                        type="clear"
                        titleStyle={styles.buttonTitile}
                        onPress={() => this.props.navigation.navigate("days")}
                    />
                </View>
            </BarCodeScanner>
        );
    }
}

let color = "#000";
let opacity = 0.6;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    contentText: {
        color: "white",
        fontSize: 25,
        fontFamily: "UbuntuBold",
        textAlign: "center"
    },
    buttonTitile: {
        fontFamily: "UbuntuBold",
        fontSize: 20,
        color: "yellow",
        textDecorationLine: "underline",
        textDecorationColor: "yellow"
    },
    container: {
        flex: 1,
        flexDirection: "column"
    },
    layerTop: {
        flex: 1,
        backgroundColor: color,
        opacity
    },
    layerCenter: {
        flex: 2,
        flexDirection: "row"
    },
    layerLeft: {
        flex: 1,
        backgroundColor: color,
        opacity
    },
    focused: {
        flex: 10,
        borderWidth: 2,
        borderColor: "#fff",
        borderStyle: "solid"
    },
    layerRight: {
        flex: 1,
        backgroundColor: color,
        opacity
    },
    layerBottom: {
        flex: 1,
        backgroundColor: color,
        opacity,
        justifyContent: "center",
        alignItems: "center"
    }
});

const mapStateToProps = state => ({
    hasCameraPermission: state.app.hasCameraPermission
});

export default connect(
    mapStateToProps,
    {
        cameraPermissionAction
    }
)(CameraScreen);
