import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { white, gray } from "../utils/colors";
import TextButton from "./TextButton";
import { addCardToDeck } from "../utils/helpers";
export default class AddCard extends Component {
  state = { question: "", answer: "" };
  handleQuestion = (value) => {
    this.setState((state) => {
      return {
        ...state,
        question: value,
      };
    });
  };
  handleAnswer = (value) => {
    this.setState((state) => {
      return {
        ...state,
        answer: value,
      };
    });
  };
  handleSubmit = () => {
    addCardToDeck(
      this.props.route.params.id,
      this.state.question,
      this.state.answer
    );
    this.props.navigation.navigate("Deck", { id: this.props.route.params.id });
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={(value) => this.handleQuestion(value)}
          style={styles.input}
          placeholder="Question"
        />
        <TextInput
          onChangeText={(value) => this.handleAnswer(value)}
          style={styles.input}
          placeholder="Answer"
        />
        <TextButton onPress={this.handleSubmit}>Submit</TextButton>
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    textAlign: "center",
    width: "100%",
  },
});
