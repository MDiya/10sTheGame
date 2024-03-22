import React, { useRef, useEffect }  from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Dimensions, Animated, Easing, TouchableOpacity } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Splash = () => {

  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('isTuto');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };

    const goToNextPage = () => {
       getData().then((isTuto) => {
        console.log(isTuto);
        if (isTuto === null) {
          navigation.navigate('Slide1');
        } else if (isTuto === 'false') {
          navigation.navigate('PlayersList');
        } else {
          navigation.navigate('Slide1');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
        // Traitement en cas d'erreur, par exemple, naviguer vers une page d'erreur
      });
    };

    const animatedValue = useRef(new Animated.Value(0)).current;

   const startAnimation = () => {
     Animated.sequence([
       // Double la taille
       Animated.timing(animatedValue, {
         toValue: 2,
         duration: 1000,
         useNativeDriver: true,
         easing: Easing.linear,
       }),
       // Rotation et secousse
       Animated.parallel([
         Animated.sequence([
           Animated.timing(animatedValue, {
             toValue: 1.1,
             duration: 100,
             useNativeDriver: true,
           }),
           Animated.timing(animatedValue, {
             toValue: 0.9,
             duration: 100,
             useNativeDriver: true,
           }),
           Animated.timing(animatedValue, {
             toValue: 1,
             duration: 100,
             useNativeDriver: true,
           }),
         ]),

       ]),

     ]).start(() => {
       goToNextPage()

     });
   };

   useEffect(() => {

     startAnimation()
   },[])

  return (
    <TouchableOpacity  onPress={startAnimation} style={styles.splash}>
      <Image
      style={[styles.vectorIcon, { width: width/2, height: height / 4 }]}
        contentFit="contain"
        source={require("../assets/Vector.svg")}
        resizeMode="containt"
      />
      <Image
      style={[styles.vectorIcon1, { width: width/2, height: height / 4 }]}
        contentFit="contain"
        source={require("../assets/Vector1.svg")}
        resizeMode="contain"
      />
      <View style={styles.logo2Parent}>
        <Animated.Image
          style={[styles.logo2Icon, {
            transform: [{ scale: animatedValue }],

          }]}
          source={require("../assets/logo-2.png")}
        />

          <Text style={styles.sTheGame}>10’s The Game</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  vectorIcon: {
    top: -10,
    left: -10,
    position: "absolute",
  },
  vectorIcon1: {
    bottom: -10,
    right: 0,
    position: "absolute",
  },
  logo2Icon: {
    width: 137,
    height: 106,
  },
  sTheGame: {
    fontSize: FontSize.size_5xl,
    textTransform: "capitalize",
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorDodgerblue,
    textAlign: "left",
    marginTop: 20,
  },
  logo2Parent: {
    marginTop: -71,
    marginLeft: -88,
    top: "50%",
    left: "50%",
    alignItems: "center",
    position: "absolute",
  },
  splash: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default Splash;
