import React, { Component } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { generateID } from "../utils/helpers";
import { white } from "../utils/colors";
import { getDecks } from "../utils/helpers";
import DisplayCard from "./DisplayCard";
import { gray } from "../utils/colors";
import Constants from "expo-constants";
import Deck from "./Deck";

export default class Home extends Component {
  state = {
    decks: {},
  };
  componentDidMount() {
    this.setState({
      decks: getDecks(),
    });
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>FlashCards</Text>
        {Object.keys(this.state.decks).map((key) => {
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
        })}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  title: {
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
