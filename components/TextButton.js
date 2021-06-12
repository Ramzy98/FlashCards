import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { blue, gray, white } from "../utils/colors";

export default function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.button, style]}> {children}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    color: blue,
    backgroundColor: white,
    padding: 10,
    borderStyle: "solid",
    borderColor: gray,
    borderWidth: 2,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 7,
    height: 45,
    marginTop: 10,
    borderRadius: 2,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
