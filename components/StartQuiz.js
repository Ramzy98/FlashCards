import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { white, mint, green, red } from "../utils/colors";
import {
  generateID,
  getDeck,
  clearLocalNotification,
  setLocalNotification,
} from "../utils/helpers";
import FlipCard from "react-native-flip-card";
import TextButton from "./TextButton";
var counter = 0;
var correct = 0;
var incorrect = 0;

export default class StartQuiz extends Component {
  state = { questions: [] };
  componentDidMount() {
    let info = getDeck(this.props.route.params.id);
    this.setState({
      questions: info.questions,
    });
    counter = 0;
  }
  showPrecentage = () => {
    var answered = correct + incorrect;
    if (answered === this.state.questions.length) {
      var message =
        "You answered " +
        ((correct / this.state.questions.length) * 100).toString() +
        "% of the questions right";
      correct = 0;
      incorrect = 0;
      clearLocalNotification().then(setLocalNotification);
      return Alert.alert(message);
    }
  };
  handleCorrect = () => {
    correct = correct + 1;
    this.showPrecentage();
  };
  handleIncorrect = () => {
    incorrect = incorrect + 1;
    this.showPrecentage();
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.questions.map((question) => {
          counter = counter + 1;
          return (
            <View key={generateID()}>
              <Text>
                {counter}/{this.state.questions.length}
              </Text>
              <FlipCard>
                <View style={styles.face}>
                  <Text style={styles.title}>{question.question}</Text>
                </View>
                <View style={styles.back}>
                  <Text style={styles.title}>{question.answer}</Text>
                </View>
              </FlipCard>
              <TextButton
                style={{
                  marginTop: 1,
                  width: "50%",
                  textAlign: "center",
                  backgroundColor: green,
                }}
                onPress={this.handleCorrect}
              >
                Correct
              </TextButton>
              <TextButton
                style={{
                  width: "50%",
                  textAlign: "center",
                  backgroundColor: red,
                  marginBottom: 10,
                }}
                onPress={this.handleIncorrect}
              >
                Incorrect
              </TextButton>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  title: {
    fontSize: 20,
    flexDirection: "row",
    borderRadius: 12,
    backgroundColor: mint,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    borderRadius: 10,
    width: "100%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    textAlign: "center",
    alignItems: "center",
  },
});
