import React, {  forwardRef, useImperativeHandle, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Easing } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { Image } from "expo-image";
import AsyncStorage from '@react-native-async-storage/async-storage';


const CountdownScreen = forwardRef(({_finish}, ref) => {
  const [isPaused, setIsPaused] = useState(true);
  const [isGo, setIsGo] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [displayTime, setDisplayTime] = useState(0); // État pour stocker le temps restant

  const [remainingTime, setRemainingTime] = useState(10); // Initial time in seconds
  const opacityValue = useRef(new Animated.Value(1)).current;


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('isTutoModal');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const insideTimer = (remainingTime) => {
    const translateY1 = useRef(new Animated.Value(0)).current;
    const translateY2 = useRef(new Animated.Value(0)).current;
    const opacity1 = useRef(new Animated.Value(1)).current;
    const opacity2 = useRef(new Animated.Value(1)).current;
    const [textColor, setTextColor] = useState('black');

    // Méthode pour mettre à jour l'état du composant enfant
      const updateState = (newState) => {
        setRemainingTime(newState);
      };

      const startTimer = () => {
        const createAnimation = (animatedValue, opacityValue) =>
          Animated.sequence([
            Animated.parallel([
              Animated.timing(animatedValue, {
                toValue: -100,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
              }),
              Animated.timing(opacityValue, {
                toValue: 0,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
              }),
            ]),
          ]);

        const animation1 = createAnimation(translateY1, opacity1);
        const animation2 = createAnimation(translateY2, opacity2);

        Animated.sequence([animation1]).start(() => {
          setIsGo(true);
          Animated.sequence([animation2]).start(() => {
            handlePauseResume()
            setIsStart(true)
            startBlinking()
          });
        });
      }

      // Exposer la méthode de mise à jour via useImperativeHandle
      useImperativeHandle(ref, () => ({
        updateState,
        startTimer
      }));


     const startBlinking = () => {
       Animated.loop(
         Animated.sequence([
           Animated.timing(opacityValue, {
             toValue: 0,
             duration: 600,
             easing: Easing.linear,
             useNativeDriver: true,
           }),
           Animated.timing(opacityValue, {
             toValue: 1,
             duration: 600,
             easing: Easing.linear,
             useNativeDriver: true,
           }),
         ]),
       ).start();
     };

    useEffect(() => {
      let timeout;

      getData().then((isTutoModal) => {
       console.log(isTutoModal);
       if (isTutoModal == false) {
         startTimer();
         timeout = setTimeout(() => {
           setTextColor('#F44242');
         }, 8000);
       }
      })
      .catch((error) => {
       console.error('Erreur lors de la récupération des données :', error);
      });

      return () => clearTimeout(timeout);

    }, [translateY1, translateY2, opacity1, opacity2]);

    return (
      <TouchableOpacity style={{  alignItems: 'center' }} onPress={handlePauseResume}>
        <Animated.View style={{ position: 'absolute', transform: [{ translateY: translateY1 }], opacity: opacity1 }}>
          <Text style={[styles.textClr, { marginTop: -20 }]}>Prêt</Text>
        </Animated.View>
        {isGo &&
          <Animated.View style={{ position: 'absolute', transform: [{ translateY: translateY2 }], opacity: opacity2 }}>
            <Text style={[styles.textClr, { marginTop: -40 }]}>Go</Text>
          </Animated.View>
        }

        {!isPaused &&
          <View>
            <Animated.View style={{opacity: opacityValue }}>
              <Text  style={{ color: textColor ,
                 alignSelf:'center',
                fontSize: 70,
                fontFamily: FontFamily.poppinsSemiBold,
                fontWeight: "600"}}>{Math.max(0, remainingTime)}</Text>
            </Animated.View>
              <Text style={[styles.tapToPause, styles.tapToStartTypo]}>
                Mettre sur pause
              </Text>
          </View>
        }
        {(isPaused && isStart) &&
          <View>
          <Text  style={styles.textClr}>{Math.max(0, remainingTime)}</Text>
          <Text style={[styles.tapToPause, styles.tapToStartTypo]}>
            Reprendre
          </Text>
          </View>
        }
      </TouchableOpacity>
    );

}

  return (
    <View>
      <CountdownCircleTimer
        isPlaying={!isPaused}
        duration={remainingTime}
        size={300}
        colors={Color.colorGold_100}
        onComplete={() => _finish()}
      >
        {({ remainingTime }) => insideTimer(remainingTime)}
      </CountdownCircleTimer>

    </View>
  );
});

const styles = StyleSheet.create({
  vectorIcon: {
    width: 58,
    height: 67.5,
    alignSelf:'center'
  },
  tapToStartTypo: {
    color: Color.colorGray_200,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "center",
  },
  tapToStart: {
    top: 45,
    fontSize: FontSize.size_xs,
  },
  tapToPause: {
    top: 20,
    fontSize: FontSize.size_xs,
  },
  textClr: {
    color: Color.colorGray_200,
    alignSelf:'center',
    fontSize: 70,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  textClr2: {

  },
})

export default CountdownScreen;
