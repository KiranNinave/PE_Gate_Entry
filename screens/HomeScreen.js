import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

import buttonStyle from "../styles/button";

import baseStyle from "../styles/base";

class HomeScreen extends React.Component {
    onScan = () => {
        this.props.navigation.navigate("days");
    };
    render() {
        return (
            <ScrollView contentContainerStyle={baseStyle.container}>
                <Text style={baseStyle.headerTitle}>HOME</Text>
                <View style={styles.content}>
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
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default HomeScreen;
