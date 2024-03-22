import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, Dimensions, TouchableOpacity } from 'react-native';
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import { Image } from "expo-image";
import { useNavigation } from '@react-navigation/native';
import { setUserChoice } from '../Api/TutoApi';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const Slide3 = () => {

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('isTuto', value);
    } catch (e) {
      console.log(e);
    }
  };

  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const goToNextPage = () => {
    if (isChecked) {
      storeData('false');
    } else {
      storeData('true');
    }
    navigation.navigate('PlayersList');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
      <Image
        style={{ width: width, height: '100%'}}
        source={require("../assets/slide3.svg")}
      />
      <TouchableOpacity style={styles.skipContainer} onPress={goBack}>
          <Image
            style={{ width: 25, height: 24}}
            source={require("../assets/frame-95.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomPart}>
        <View style={styles.imageContainer}>
          <Image style={{ width: width/3, height: '20%'}}
          contentFit="contain"
          resizeMode="containt"
          source={require('../assets/barreComplet3.svg')} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.integerCrasViverra]}>
            Comment jouer
          </Text>
          </View>
          <View style={styles.textContainer2}>
          <Text
            style={[styles.vitaeSapienAnte]}
            >&#8226;Le chrono se lance, le joueur commence son énumération.{'\n'}
            &#8226;C'est aux autres joueurs de valider ou non les réponses données.{'\n'}
            &#8226;Le premier joueur à 20 points à gagné{'\n'}
            </Text>
        </View>
        <View style={styles.textContainer3}>
          <Text
            style={[styles.vitaeSapienAnte]}>
            Ne plus afficher le tutoriel
            </Text>

            <Checkbox
              status={isChecked ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange()}
              color={Color.colorGold_100} />
        </View>
        <TouchableOpacity style={styles.nextWrapper} onPress={goToNextPage}>
          <Text style={styles.next}>Terminer</Text>
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
    position: "absolute",
      top: 71,
      left: width * 0.1,
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

    marginLeft: 40,
    marginRight: 40,
  },
  textContainer2: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 40,
    marginRight: 40,
  },
  textContainer3: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection : 'row',
    marginLeft: 40,
    marginRight: 40,
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

export default Slide3;
