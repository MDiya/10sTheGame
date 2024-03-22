import React, { useState, useEffect, useRef  }  from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard  } from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'react-native-uuid';

const NewPlayer = ({toggle}) => {
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState('');

 const handleTextChange = (text) => {
  setPlayerName(text);
};

  const addPlayer = () => {
    const newPlayer =
    { name: playerName,
      score: 0,
      id: uuid.v4(),
      isSelected: false };
    dispatch({ type: "ADD_PLAYER", value: newPlayer});
    toggle();
  }

  return (

    <View style={[styles.frameParent4, styles.frameParentSpaceBlock]}>
      <View style={[styles.frameParent3, styles.parentFlexBox]}>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/frame-46.png")}
        />
        <TextInput
                autoFocus
              onChangeText={handleTextChange}
              value={playerName}
              style={[styles.thomas, styles.goTypo]}
              placeholder="Nom du joueur"
              maxLength={20}
              onSubmitEditing={addPlayer} />
      </View>
      <TouchableOpacity
        onPress={addPlayer}
        style={[styles.containerVectorIcon1]}>
        <Image
          style={styles.vectorIcon1}
          contentFit="cover"
          source={require("../assets/NewPlayer.svg")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  frameParent4: {
    marginTop: 10,
  },
  frameParentSpaceBlock: {
    paddingBottom: Padding.p_5xs,
    paddingRight: Padding.p_xs,
    paddingTop: Padding.p_5xs,
    paddingLeft: Padding.p_5xs,
    backgroundColor: Color.colorPalegoldenrod,
    borderRadius: Border.br_5xs,
    width: 312,
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  frameParent3: {
    alignItems: "center",
    flex: 1,
  },
  frameChild: {
    width: 32,
    height: 32,
  },
  thomas: {
    marginLeft: 14,
    textAlign: "left",
    color: Color.colorGray_200,
    flex: 5
  },
  goTypo: {
    fontSize: FontSize.calloutRegular_size,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  vectorIcon1: {
    width: 20,
    height: 20,
  },
  parentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default NewPlayer;
