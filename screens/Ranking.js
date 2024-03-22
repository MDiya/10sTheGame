import React, {useEffect, useRef} from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from "react-native";
import ThomasContainer from "../components/ThomasContainer";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Confetti from 'react-native-confetti';

const Ranking = () => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const confettiRef = useRef(null);

   const handleShowConfetti = () => {
     if (confettiRef.current) {
       confettiRef.current.startConfetti();
     }
   };

   const conf = () => {
     confettiRef.current.stopConfetti()
   }

   useEffect(() => {
     handleShowConfetti()
   }, []);

  // Initialisation de la partie et navigation vers l'accueil
  const _goToAccueil = () => {

    const action ={type: "INIT_GAME", value: true}
    dispatch(action)

    navigation.navigate('PlayersList')
  }

  return (
    <TouchableOpacity style={styles.ranking} onPress={conf}  activeOpacity={1}>
      <View style={styles.row(18)}>
        <Image
          style={{ width: width/1.5, height: 150}}
          contentFit="cover"
          source={require("../assets/CercleJeu.svg")}
        />
        <Image
          style={{ width: 25, height: 25, top: 50, right: 30, display:'none'}}
          contentFit="cover"
          source={require("../assets/Reglage.svg")}
        />
      </View>

      <View style={[styles.row(35), styles.frameGroup]}>
        <Text style={styles.scoreRanking}>Classement</Text>
        <Image
          style={styles.awardFront1Icon}
          contentFit="cover"
          source={require("../assets/award-front-1.png")}
        />
      </View>
      <View style={[styles.row(35), styles.frameGroup, styles.rankingGlobal]}>

        <ThomasContainer/>
      </View>
      <View style={[styles.row(12), styles.vectorParentFlexBox]}>
      <TouchableOpacity style={[styles.startNewGameWrapper, styles.test]} onPress={() => _goToAccueil()}>
        <Text style={[styles.startNewGame, styles.thomasTypo]}>Nouvelle partie</Text>
      </TouchableOpacity>
      </View>
      <Confetti
           ref={confettiRef}
           confettiCount={200} // Nombre de confettis à afficher
           untilStopped={true} // Durée de l'effet
         />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: (percentage, customStyle = {}) => ({
    flex: percentage,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...customStyle,
  }),
  vectorParentFlexBox: {
    justifyContent: 'flex-end',
    alignSelf:'center',
    flexDirection: "column",
  },
  test: {
    justifyContent: "center",
    width: 312,
    alignItems: "center",
  },
  vectorIcon: {
    height: 15,
    width: 20,
  },
  groupIcon: {
    height: 20,
    width: 20,
  },
  scoreRanking: {
    fontSize: FontSize.size_5xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorDodgerblue,
    textAlign: "center",
  },
  frameGroup: {
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'column'
  },
  rankingGlobal: {
    justifyContent: 'flex-start'
  },
  awardFront1Icon: {
    width: 162,
    height: 162,
    marginTop: 20,
  },
  startNewGame: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  thomasTypo: {
    textTransform: "capitalize",
    textAlign: "left",
    fontSize: FontSize.calloutRegular_size,
  },
  startNewGameWrapper: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorDodgerblue,
    height: 46,
    marginBottom: 20,
  },
  frameParent: {
    top: 160,
    height: 590,
  },
  ranking: {
    flex: 1,
  },
});

export default Ranking;
