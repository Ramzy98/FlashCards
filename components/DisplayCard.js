import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { blue, mint, gray, white } from "../utils/colors";
export default class DisplayCard extends Component {
  render() {
    return (
      <View>
        <Text style={styles.Title}>{this.props.info.title}</Text>
        <Text style={styles.content}>
          {this.props.info.questions.length} Cards
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Title: {
    fontSize: 20,
    backgroundColor: blue,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "center",
    alignItems: "center",
  },
  content: {
    color: gray,
    fontSize: 20,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: mint,
  },
  container: { flex: 1, padding: 20, backgroundColor: white },
});
