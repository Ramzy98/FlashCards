import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { white } from "../utils/colors";
import TextButton from "./TextButton";
import { saveDeckTitle } from "../utils/helpers";
import Home from "./Home";
export default class AddNewDeck extends Component {
  state = { title: "" };
  handleDeckTitle = (value) => {
    this.setState((state) => {
      return {
        ...state,
        title: value,
      };
    });
  };
  addNewDeck = () => {
    if (this.state.title.length) {
      saveDeckTitle(this.state.title);
      this.props.navigation.navigate("Home");
      this.setState((state) => {
        return {
          ...state,
          title: "",
        };
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> What is the title of your new deck? </Text>
        <TextInput
          value={this.state.title}
          onChangeText={(value) => this.handleDeckTitle(value)}
          style={styles.input}
          placeholder="Deck Title"
        />
        <TextButton onPress={this.addNewDeck}>Submit</TextButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    borderRadius: 12,
    paddingBottom: 20,
    textAlign: "center",
    alignItems: "center",
  },
  input: {
    borderRadius: 10,
    width: "100%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    textAlign: "center",
  },
});
