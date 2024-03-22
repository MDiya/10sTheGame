import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Color } from "../GlobalStyles";

const Vector1 = () => {
  return <View style={styles.vector} />;
};

const styles = StyleSheet.create({
  vector: {
    backgroundColor: Color.graysBlack,
    width: 82,
    height: 82,
  },
});

export default Vector1;
