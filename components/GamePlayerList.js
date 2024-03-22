import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { useSelector, useDispatch } from 'react-redux';


const HeaderGamePlayerList = ({isMultiple}) => {

return (
  <View style={styles.frameParent3}>
    <View style={styles.vectorParent}>
      <Image
        style={styles.vectorIcon}
        contentFit="cover"
        source={require("../assets/vector9.png")}
      />
      <Text style={[styles.playerName, styles.thomasTypo]}>
      {isMultiple && (<Text >joueurs</Text >)}
      {!isMultiple && (<Text >joueur</Text >)}

      </Text>
    </View>
    <View style={styles.vectorParent}>
      <Image
        style={styles.frameChildLayout}
        contentFit="cover"
        source={require("../assets/vector10.png")}
      />
      <Text style={[styles.playerName, styles.thomasTypo]}>
        Points
      </Text>
    </View>
  </View>
  );
};


const GamePlayerList = (props) => {
  const dispatch = useDispatch();

  actionOnRow = () => {
    const actionUpdateBet ={type: "UPDATE_SELECTED", value: props.player}
    dispatch(actionUpdateBet)
  }

  return (
    <TouchableOpacity style={styles.frameParent4} onPress={actionOnRow}>
      <View style={[styles.thomasParent(props.player), styles.parentFlexBox]}>
        <Text style={[styles.thomas, styles.thomasTypo]}>{props.player.name}</Text>
        <Text style={[styles.text, styles.textTypo]}>{props.player.score}</Text>
      </View>
    </TouchableOpacity>
    );
  };

  const FooterComponent = (props) => {

    return(
    <View style={styles.footer}>
     </View>
   );
  }

const styles = StyleSheet.create({

  thomas: {
    fontFamily: FontFamily.calloutRegular,
    color: Color.colorGray_200,
    textTransform: "capitalize",
  },
  textTypo: {
    fontSize: FontSize.size_xl,
    textTransform: "capitalize",
    textAlign: "left",
    color: Color.colorGray_200,
  },
  text: {
    fontFamily: FontFamily.size_xl,
  },
  parentFlexBox: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_26xl,
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  thomasParent: (player) => {
    const backgroundColorT = player.isSelected ? Color.colorGold_100 : Color.colorPalegoldenrod;
     return {
       backgroundColor: backgroundColorT,
     }
  },
  frameParent4: {
    marginTop: 4,
    width: 312,
    justifyContent: "space-between",
  },
  vectorParent: {
    paddingLeft: Padding.p_5xl,
    paddingRight: Padding.p_5xl,
    alignItems: "center",
    flexDirection: "row",
  },
  frameParent3: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  vectorIcon: {
    width: 12,
    height: 15,
  },

  frameChildLayout: {
    height: 14,
    width: 14,
  },
  playerName: {
    marginLeft: 7,
    color: Color.colorGray_200,
    textTransform: "capitalize",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  thomasTypo: {
    textTransform: "capitalize",
    textAlign: "left",
    fontSize: FontSize.size_xl,
  },
  footer: {
     padding: 10,
     alignItems: 'center',
     justifyContent: 'center',
   },
});

export {HeaderGamePlayerList};
export {FooterComponent};
export {GamePlayerList};
