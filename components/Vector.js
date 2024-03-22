import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Color } from "../GlobalStyles";

const Vector = () => {
  return <View style={styles.vectorView} />;
};

const styles = StyleSheet.create({
  vectorView: {
    borderStyle: "solid",
    borderColor: Color.graysBlack,
    borderWidth: 9,
    width: 700,
    height: 9,
  },
});

export default Vector;
