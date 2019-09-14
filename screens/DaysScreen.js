import React from "react";
import {
    Text,
    StyleSheet,
    View,
    TouchableHighlight,
    FlatList
} from "react-native";
import { ListItem } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import baseStyles from "../styles/base";

class DaysScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    name: "Day 1",
                    subtitle: "date",
                    linearGradientColors: ["#FF9800", "#F44336"]
                },
                {
                    id: 2,
                    name: "Day 2",
                    subtitle: "date",
                    linearGradientColors: ["#3F51B5", "#2196F3"]
                },
                {
                    id: 3,
                    name: "Day 3",
                    subtitle: "date",
                    linearGradientColors: ["#FFD600", "#FF9800"]
                },
                {
                    id: 4,
                    name: "Day 4",
                    subtitle: "date",
                    linearGradientColors: ["#4CAF50", "#8BC34A"]
                },
                {
                    id: 5,
                    name: "Day 5",
                    subtitle: "date",
                    linearGradientColors: ["#F44336", "#E91E63"]
                },
                {
                    id: 6,
                    name: "Day 6",
                    subtitle: "date",
                    linearGradientColors: ["#3F51B5", "#2196F3"]
                },
                {
                    id: 7,
                    name: "Day 7",
                    subtitle: "date",
                    linearGradientColors: ["#FFD600", "#FF9800"]
                },
                {
                    id: 8,
                    name: "Day 8",
                    subtitle: "date",
                    linearGradientColors: ["#4CAF50", "#8BC34A"]
                },
                {
                    id: 9,
                    name: "Day 9",
                    subtitle: "date",
                    linearGradientColors: ["#F44336", "#E91E63"]
                }
            ]
        };
    }
    render() {
        return (
            <View style={baseStyles.container}>
                <Text style={baseStyles.headerTitle}>SELECT DAY</Text>
                <FlatList
                    data={this.state.data}
                    style={styles.list}
                    contentContainerStyle={styles.container}
                    renderItem={({ item, index }) => {
                        let i = index;
                        return (
                            <ListItem
                                component={TouchableHighlight}
                                friction={90}
                                tension={100}
                                activeScale={0.95}
                                leftIcon={{
                                    name: "ios-cloudy-night",
                                    type: "ionicon",
                                    size: 24
                                }}
                                key={i}
                                linearGradientProps={{
                                    colors: item.linearGradientColors,
                                    start: [1, 0],
                                    end: [0.2, 0]
                                }}
                                ViewComponent={LinearGradient}
                                title={item.name}
                                titleStyle={{
                                    color: "white",
                                    fontWeight: "bold"
                                }}
                                subtitleStyle={{ color: "white" }}
                                subtitle={item.subtitle}
                                chevronColor="white"
                                chevron
                                containerStyle={{
                                    marginHorizontal: 16,
                                    marginVertical: 8,
                                    borderRadius: 8,
                                    width: "90%"
                                }}
                                onPress={() =>
                                    this.props.navigation.navigate("camera")
                                }
                            />
                        );
                    }}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    },
    container: {
        justifyContent: "center",
        paddingBottom: 20
    }
});

export default DaysScreen;
