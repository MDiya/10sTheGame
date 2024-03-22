import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { FontFamily, Color } from "../GlobalStyles";

const CheckMarkIcon = () => {
  return <Text style={styles.checkMarkIcon}>check mark Icon</Text>;
};

const styles = StyleSheet.create({
  checkMarkIcon: {
    fontSize: 125,
    fontFamily: FontFamily.interRegular,
    color: Color.graysBlack,
    textAlign: "left",
    width: 671,
  },
});

export default CheckMarkIcon;
