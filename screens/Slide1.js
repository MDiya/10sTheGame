import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, Dimensions, TouchableOpacity } from 'react-native';
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import { Image } from "expo-image";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Slide1 = () => {
  const navigation = useNavigation();

  const goToNextPage = () => {
    navigation.navigate('Slide2');
  };

  const goToPlayersList = () => {
    navigation.navigate('PlayersList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
      <Image
        style={{ width: width, height: '100%'}}
        source={require("../assets/slide.svg")}
      />
        <TouchableOpacity style={styles.skipContainer} onPress={goToPlayersList}>
          <Text style={styles.skipText}>Ignorer</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomPart}>
        <View style={styles.imageContainer}>
          <Image style={{ width: width/3, height: '20%'}}
          contentFit="contain"
          resizeMode="containt"
          source={require('../assets/barreComplet1.svg')} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.integerCrasViverra]}>
            Bienvenue dans 10'Sec
          </Text>
          </View>
          <View style={styles.textContainer2}>
          <Text
            style={[styles.vitaeSapienAnte]}
            >{`10'Sec est un jeu qui met au défi les joueurs à énumérer un maximum de réponses sur un thème donné en seulement 10 secondes. `}</Text>
        </View>
        <TouchableOpacity style={styles.nextWrapper} onPress={goToNextPage}>
          <Text style={styles.next}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.colorGold_100,
  },
  topPart: {
    flex: 1,
  },
  image: {
    top:0,
  },
  skipContainer: {
      top: 71,
      right: width * 0.1,
      position: "absolute",
  },
  skipText: {
    color: Color.colorGray_200,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  bottomPart: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: width * 0.1,
    marginRight: width * 0.1,
    marginBottom: width * 0.1,

    borderRadius: Border.br_21xl,
    backgroundColor: Color.colorWhite,
  },
  imageContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'flex-start',

    marginLeft: 15,
    marginRight: 15,
  },
  textContainer2: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 15,
    marginRight: 15,
  },
  vitaeSapienAnte: {
    lineHeight: 21,
    fontFamily: FontFamily.calloutRegular,
    fontSize: FontSize.size_sm,
    textAlign: "justify",
    color: Color.colorGray_200,
  },
  integerCrasViverra: {
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    textAlign: "center",
    color: Color.colorGray_200,
    fontSize: FontSize.calloutRegular_size,
  },
  nextWrapper: {
    flex: 0.1,
    width: 234,
    alignSelf:'center',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.colorDodgerblue,
    borderRadius: Border.br_base,

  },
  next: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textTransform: "capitalize",
    fontSize: FontSize.calloutRegular_size,
  },

});

export default Slide1;
