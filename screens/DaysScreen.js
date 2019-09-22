import React from "react";
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
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
                    subtitle: new Date("9/29/2019"),
                    linearGradientColors: ["#FF9800", "#F44336"]
                },
                {
                    id: 2,
                    name: "Day 2",
                    subtitle: new Date("9/30/2019"),
                    linearGradientColors: ["#FF0000", "#BF2121"]
                },
                {
                    id: 3,
                    name: "Day 3",
                    subtitle: new Date("10/1/2019"),
                    linearGradientColors: ["#f4f1f1", "#dfd8d8"]
                },
                {
                    id: 4,
                    name: "Day 4",
                    subtitle: new Date("10/2/2019"),
                    linearGradientColors: ["#2196F3", "#3F51B5"]
                },
                {
                    id: 5,
                    name: "Day 5",
                    subtitle: new Date("10/3/2019"),
                    linearGradientColors: ["#FFD600", "#FF9800"]
                },
                {
                    id: 6,
                    name: "Day 6",
                    subtitle: new Date("10/4/2019"),
                    linearGradientColors: ["#8BC34A", "#4CAF50"]
                },
                {
                    id: 7,
                    name: "Day 7",
                    subtitle: new Date("10/5/2019"),
                    linearGradientColors: ["#b301b3", "#800080"]
                },
                {
                    id: 8,
                    name: "Day 8",
                    subtitle: new Date("10/6/2019"),
                    linearGradientColors: ["#808080", "#646262"]
                },
                {
                    id: 9,
                    name: "Day 9",
                    subtitle: new Date("10/7/2019"),
                    linearGradientColors: ["#00A989", "#068a71"]
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
                                component={TouchableOpacity}
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
                                subtitle={item.subtitle.toDateString()}
                                chevronColor="white"
                                chevron
                                containerStyle={{
                                    marginHorizontal: 16,
                                    marginVertical: 8,
                                    borderRadius: 8,
                                    width: "90%"
                                }}
                                onPress={() => {
                                    let day = "";
                                    if (item.id === 1) {
                                        day = "9-29-2019";
                                    } else if (item.id === 2) {
                                        day = "9-30-2019";
                                    } else if (item.id === 3) {
                                        day = "10-1-2019";
                                    } else if (item.id === 4) {
                                        day = "10-2-2019";
                                    } else if (item.id === 5) {
                                        day = "10-3-2019";
                                    } else if (item.id === 6) {
                                        day = "10-4-2019";
                                    } else if (item.id === 7) {
                                        day = "10-5-2019";
                                    } else if (item.id === 8) {
                                        day = "10-6-2019";
                                    } else if (item.id === 9) {
                                        day = "10-7-2019";
                                    }
                                    this.props.navigation.navigate("camera", {
                                        day
                                    });
                                }}
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
