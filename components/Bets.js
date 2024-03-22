import  React, {useState, useEffect} from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { useSelector, useDispatch } from 'react-redux';

const Bets = ({ imagePng, textTitre, style, data, sendDataToParent }) => {

  //Ajoute 1 à l'enchère du joueur à chaque click
  const add = () => {
    if(data < 20)
    {
      sendDataToParent(data+1);
    }
  }

  //Retire 1 à l'enchère du joueur à chaque click si l'enchère est supp à 0
   const substract = () => {
    if (data > 1) {
      sendDataToParent(data -1);

      }
    }

    useEffect(() => {
      sendDataToParent(data);
    }, [data]);

  return(
  <View style={[styles.frameParent5, styles.frameParent5FlexBox, style]}>
    <View style={styles.vectorParent}>
      <Image
        style={styles.vectorIcon2}
        contentFit="cover"
        source={imagePng}
      />
      <Text style={[styles.placeBid, styles.thomasTypo]}>
        {textTitre}
      </Text>
    </View>
    <View style={styles.frameParent6}>
    <TouchableOpacity onPress={substract}>
      <Image
        style={styles.frameIcon}
        contentFit="cover"
        source={require("../assets/frame-73.png")}/>
      </TouchableOpacity>
      <View
        style={[styles.rectangleParent, styles.frameChild1SpaceBlock,styles.rectangleView]}>
        <Text style={[styles.text3, styles.textTypo]}>{data}</Text>
      </View>
      <TouchableOpacity onPress={add}>
        <Image
          style={[styles.frameChild1, styles.frameChild1SpaceBlock]}
          contentFit="cover"
          source={require("../assets/frame-72.png")}/>
        </TouchableOpacity>
    </View>
  </View>
)
}

const styles = StyleSheet.create({

  frameParent5FlexBox: {
    justifyContent: "space-between",
  },
  vectorParent: {
    alignSelf: 'left',
    paddingLeft: Padding.p_5xl,
    paddingRight: Padding.p_5xl,
    alignItems: "center",
    flexDirection: "row",
  },
  vectorIcon2: {
    width: 16,
    height: 16,
  },
  placeBid: {
    marginLeft: 8,
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
  frameParent6: {
    alignSelf: 'right',
    flexDirection: "row",
    paddingRight: Padding.p_5xl,
  },
  frameIcon: {
    height: 40,
    width: 40,
    borderRadius: Border.br_10xs,
  },
  rectangleParent: {
    width: 44,
  },
  rectangleView: {
    justifyContent: 'center',
    borderStyle: "solid",
    borderColor: Color.colorGold_100,
    borderWidth: 0.5,
    height: 40,
    borderRadius: Border.br_10xs,
    width: 45,
    backgroundColor: Color.colorWhite,
  },
  textTypo: {
    fontSize: FontSize.size_xl,
    textTransform: "capitalize",
    textAlign: "left",
    color: Color.colorGray_200,
  },
  text3: {
    alignSelf:'center',
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    justifyContent: 'center',
  },
  frameChild1: {
    width: 40,
    marginLeft: 3,
    borderRadius: Border.br_10xs,
  },
  frameChild1SpaceBlock: {
    marginLeft: 3,
    height: 40,
  },
  frameParent5: {
    paddingVertical: Padding.p_xs,
    marginTop: 16,
    backgroundColor: Color.colorPalegoldenrod,
    borderRadius: Border.br_xs,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

})

export {Bets};
