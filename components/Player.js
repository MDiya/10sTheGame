import React, { useState, useEffect, useRef  }  from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { useSelector, useDispatch } from 'react-redux';


const Player = (props) => {
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState(props.player.name);
  const [isOpen, setIsOpen] = useState(false);

  //Supprime le joueur de la liste des joueurs
  const _deletePlayer = () => {
    const action ={type: "DELETE_PLAYER", value: props.player}
    dispatch(action)
  }

  const modifPlayer = () => {
    setIsOpen(!isOpen);
  }

  const handleTextChange = (text) => {
    setPlayerName(text);
  }

  const updatePlayer = () => {
    const newPlayer =
    { name: playerName,
      score: 0,
      id: props.player.id,
      isSelected: false };
    dispatch({ type: "UPDATE_PLAYER", value: newPlayer});
  }

  return (
    <TouchableOpacity style={[styles.frameParent4, styles.frameParentSpaceBlock]} onPress={modifPlayer}>
      <View style={[styles.frameParent3, styles.parentFlexBox]}>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/frame-46.png")}
        />
        {isOpen &&
          <TextInput
            autoFocus
            onChangeText={handleTextChange}
            value={playerName || ''}
            style={[styles.thomas, styles.goTypo]}
            placeholder="Nom du joueur"
            maxLength={20}
            onSubmitEditing={updatePlayer} />
        }
        {!isOpen &&
          <Text style={[styles.thomas, styles.goTypo]}>{props.player.name}</Text>
        }
      </View>
      <TouchableOpacity
        onPress={_deletePlayer}
        style={styles.vectorIcon1}>
        <Image
          style={styles.vectorIcon1}
          contentFit="cover"
          source={require("../assets/CancelPlayer.svg")}
        />
      </TouchableOpacity>
    </TouchableOpacity>
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
  },
  goTypo: {
    fontSize: FontSize.size_xl,
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

export default Player;
