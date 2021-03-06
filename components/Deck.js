import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { getDeck } from "../utils/helpers";
import TextButton from "./TextButton";
import { white, gray } from "../utils/colors";
import AddCard from "./AddCard";
import StartQuiz from "./StartQuiz";
export default class Deck extends Component {
  state = { info: { title: "", questions: [] } };
  componentDidMount() {
    this.setState({ info: getDeck(this.props.route.params.id) });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.info.title}</Text>
        <Text>{Object.keys(this.state.info.questions).length} Cards</Text>
        <TextButton
          onPress={() => {
            this.props.navigation.navigate("AddCard", {
              id: this.props.route.params.id,
            });
          }}
        >
          Add Card
        </TextButton>
        <TextButton
          onPress={() => {
            this.props.navigation.navigate("StartQuiz", {
              id: this.props.route.params.id,
            });
          }}
        >
          Start Quiz
        </TextButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 10,
    paddingTop: 20,
    textAlign: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: "center",
    justifyContent: "center",
  },
});
