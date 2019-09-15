import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";

import buttonStyle from "../styles/button";

import baseStyle from "../styles/base";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clock: `${new Date().getHours()} : ${new Date().getMinutes()}`,
            date: `${new Date().toDateString()}`
        };
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({
                clock: `${new Date().getHours()} : ${new Date().getMinutes()}`,
                date: `${new Date().toDateString()}`
            });
        }, 1000 * 60); // tick on 1 minute
    }

    onScan = () => {
        this.props.navigation.navigate("days");
    };
    render() {
        return (
            <ScrollView contentContainerStyle={baseStyle.container}>
                <Text style={baseStyle.headerTitle}>HOME</Text>
                <View style={styles.content}>
                    <View>
                        <Text style={styles.clock}>{this.state.clock}</Text>
                        <Text style={styles.date}>{this.state.date}</Text>
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
    }
});

const mapStateToProps = state => ({
    username: state.user.username
});

export default connect(
    mapStateToProps,
    null
)(HomeScreen);
