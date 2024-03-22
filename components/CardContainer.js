import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";

const CardContainer = ({ personName, personPoint, personPosition }) => {
  return (
    <View style={[styles.frameParent, styles.frameFlexBox]}>
      <View style={styles.frameGroup}>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/frame-90.png")}
        />
        <View style={styles.nicolasWrapper}>
          <Text style={[styles.nicolas, styles.textText]}>{personName}</Text>
        </View>
      </View>
      <View style={[styles.frameContainer, styles.frameFlexBox]}>
        <View>
          <Text style={[styles.points, styles.textText]}>Point(s)</Text>
          <Text style={[styles.text, styles.textText]}>{personPoint}</Text>
        </View>
        <View>
          <Text style={[styles.points, styles.textText]}>Classement</Text>
          <Text style={[styles.text, styles.textText]}>{personPosition}ème</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textText: {
    textAlign: "left",
    color: Color.colorGray_200,
  },
  frameChild: {
    width: 34,
    height: 34,
  },
  nicolas: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.calloutRegular_size,
    color: Color.colorGray_200,
    textTransform: "capitalize",
  },
  nicolasWrapper: {
    marginLeft: 9,
  },
  frameGroup: {
    alignItems: "center",
    flexDirection: "row",
  },
  points: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.calloutRegular,
    color: Color.colorGray_200,
  },
  text: {
    marginTop: 10,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.calloutRegular_size,
    color: Color.colorGray_200,
  },
  frameContainer: {
    width: 135,
  },
  frameParent: {
    borderRadius: Border.br_xs,
    backgroundColor: Color.colorWhitesmoke_200,
    width: 313,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_3xs,
    marginTop: 12,
    alignItems: "center",
  },
});

export default CardContainer;
