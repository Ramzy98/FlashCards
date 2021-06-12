import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { white, blue, gray } from "../utils/colors";
import { getDecks } from "../utils/helpers";
import DisplayCard from "./DisplayCard";
import Constants from "expo-constants";
import { Ionicons, refresh } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";

export default class Home extends Component {
  state = {
    decks: {},
  };

  async componentDidMount() {
    this.setState({
      decks: await getDecks(),
    });
    console.log("FROM HOMMEEEEEEEEEEEEEEEEEEEEEEEEE", this.state.decks);
  }
  refresh = async () => {
    var refreshedData = await getDecks();
    this.setState(() => {
      return {
        decks: refreshedData,
      };
    });
    console.log("refreshed", this.state.decks);
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>FlashCards </Text>
        <TouchableOpacity>
          <Text style={{ textAlign: "center" }}>
            Added a new Deck?
            <Text
              style={{ alignItems: "center", fontSize: 15, color: blue }}
              onPress={this.refresh}
            >
              Refresh
            </Text>
          </Text>
        </TouchableOpacity>
        {this.state.decks !== undefined && this.state.decks !== null ? (
          Object.keys(this.state.decks).map((key) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() =>
                  this.props.navigation.navigate("Deck", { id: key })
                }
              >
                <DisplayCard info={this.state.decks[key]} />
              </TouchableOpacity>
            );
          })
        ) : (
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Ionicons name={"add-circle-outline"} size={100}></Ionicons>
            <Text>You don't have any decks yet!</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    flexDirection: "row",
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    backgroundColor: gray,
    paddingBottom: 20,
    textAlign: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  container: { flex: 1, backgroundColor: white },
});
