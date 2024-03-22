import React, { useCallback, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import { FontSize, Color, FontFamily, Border, Padding } from '../GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import CountdownScreen from './Chrono';
import { Image } from "expo-image";
import {getTheme, _getPlayerName} from '../Api/ThemeApi'
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Bets} from '../components/Bets';

const Splash = () => {

  const heightRef = 840;

  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const players = useSelector((state) => state.players);
  const idCurrentTheme = useSelector((state) => state.idCurrentTheme);
  const idCurrentPlayer = useSelector((state) => state.idCurrentPlayer);
  const currentBet = useSelector((state) => state.currentBet);

  const [valeurParent, setValeurParent] = useState(1);

  const [nameTheme, setNameTheme] = useState(getTheme(idCurrentTheme));
  const [player, setplayer] = useState(_getPlayerName());

  const [viewHeight, setViewHeight] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);

  const [displayModal, setDisplayModal] = useState("display");

  const [topArrow, setTopArrow] = useState(0);
  const [isFirstModal, setIsFirstModal] = useState(true);

  const [idModal, setIdModal] = useState(1);
  const [textModal, setTextModal] = useState("");
  const [displayVerticalArrowModal, setDisplayVerticalArrowModal] = useState("");
  const [borderTopWidthArrow, setBorderTopWidthArrow] = useState(0);
  const [borderBottomWidthArrow, setBorderBottomWidthArrow] = useState(0);
  const [rightArrowModal, setRightArrowModal] = useState(0);
  const [topModal, setTopModal] = useState(0);
  const [bottomModal, setBottomModal] = useState(0);
  const [suivantModal, setSuivantModal] = useState(null);
  const [suivantTextModal, setSuivantTextModal] = useState("");
  const [suivantDisplayModal, setSuivantDisplayModal] = useState("");

  const [precedentModal, setPrecedentModal] = useState(null);
  const [precedentDisplayModal, setPrecedentDisplayModal] = useState("");

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setViewHeight(height);
    setViewWidth(width);
  };

  const childRef = useRef();

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

  useEffect(() => {
    getData().then((isTutoModal) => {
     if (isTutoModal !== 'false' && isFirstModal) {
       setIsFirstModal(false);
       nextTuto(1);
     } else if (isTutoModal === 'false'){
       setDisplayModal("none")
     }
   })
   .catch((error) => {
     console.error('Erreur lors de la récupération des données :', error);
   });
}, [isFirstModal]);

const steps = [
  {
    id:1,
    text:"Vous voila arrivé au chrono!",
    arrow: "none",
    topArrow : 0,
    arrowVertical: "none",
    arrowRight: 0,
    bottom: 0,
    top: 45,
    suivant: "display",
    precedent: "none",
  },
  {
    id:2,
    text:"Le thème apparait en bleu, en dessous s'affiche le nom du joueur qui a gagné l'enchère ainsi que sa mise.",
    arrow: "display",
    topArrow : -16,
    arrowVertical: "top",
    arrowRight: (width/2)-11,
    bottom: 0,
    top: 30,
    suivant: "display",
    precedent: "display",
  },
  {
    id:3,
    text:"Si plusieurs joueurs ont été sélectionné alors un tirage au sort s'est automatiquement effectué.",
    arrow: "display",
    topArrow : -16,
    arrowVertical: "top",
    arrowRight: (width/2)-11,
    bottom: 0,
    top: 30,
    suivant: "display",
    precedent: "display",
  },
  {
    id:4,
    text:"Si à la fin du chronomètre de saissie d'enchère aucun joueur n'a été selectionné alors un joueur aléatoire est automatiquement selectionné avec une mise à 2.",
    arrow: "display",
    topArrow : -16,
    arrowVertical: "top",
    arrowRight: (width/2)-11,
    bottom: 0,
    top: 30,
    suivant: "display",
    precedent: "display",
  },
  {
    id:5,
    text:"Prêt! Go! Voici le tant attendu chronomètre de 10 secondes!",
    arrow: "display",
    topArrow : 0,
    arrowVertical: "bottom",
    arrowRight: (width/2)-11,
    bottom: 70,
    top: 0,
    suivant: "display",
    precedent: "display",
  },
  {
    id:6,
    text:"Voici un compteur qui vous aidra à compter le bonne réponse du joueur. C'est aux autres joueurs de valider ou non les réponses données.",
    arrow: "display",
    topArrow : 0,
    arrowVertical: "bottom",
    arrowRight: (width/2)-11,
    bottom: 28,
    top: 0,//faire plus 6 pour la fleche
    suivant: "display",
    precedent: "display",
  },
  {
    id:7,
    text:"Vous pouvez terminer plus tôt si le joueur à réussi avant la fin du chronomètre.",
    arrow: "display",
    topArrow : 0,
    arrowVertical: "bottom",
    arrowRight: (width/2)-11,
    bottom: 10,
    top: 0,
    suivant: "finish",
    precedent: "display",
  }
]

  // Fonction dans le parent pour mettre à jour l'état du composant enfant
  const updateChildState = () => {
    // Accéder au composant enfant via la ref
    if (childRef.current) {
      // Appeler une méthode spécifique dans le composant enfant pour mettre à jour son état
      childRef.current.updateState(0);
    }
  };

  // Fonction dans le parent pour mettre à jour l'état du composant enfant
  const updateChildTimerStart = () => {
    if (childRef.current) {
      childRef.current.startTimer();
    }
  };

  useEffect(() => {

    backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => {
      backHandler.remove();
    };
  });


  const _finish = () => {
    updateChildState()
      const actionUpdateGo ={type: "UPDATE_GO", value: false}
      dispatch(actionUpdateGo)

      const actionUpdatePlayerSelected ={type: "UPDATE_PLAYER_SELECTED", value: false}
      dispatch(actionUpdatePlayerSelected)

      navigation.navigate('Validation')
  }

  const previusTuto = () => {
    const newId = idModal-2;
    nextTuto(newId);
  }

  const nextTuto = (id) => {
    if (id <= steps.length) {
        const newStepTuto = steps.find((item, _) => item.id === id);
        setTextModal(newStepTuto.text);
        if(newStepTuto.arrow == "display") {
          if(newStepTuto.arrowVertical == "top"){
            setBorderTopWidthArrow(0);
            setBorderBottomWidthArrow(22)
          } else if(newStepTuto.arrowVertical == "bottom"){
            setBorderBottomWidthArrow(0);
            setBorderTopWidthArrow(22);
          }
          setRightArrowModal(newStepTuto.arrowRight);
        } else {
          setBorderBottomWidthArrow(0);
          setBorderTopWidthArrow(0);
        }

        if (height == heightRef){
          setTopModal(newStepTuto.top+'%');
          setBottomModal(newStepTuto.bottom+'%');
        } else {
          const adapteTop = heightRef - height;
          if (adapteTop > 0){
            const pourcentage = (adapteTop/100)+newStepTuto.top;
            setTopModal(pourcentage+'%');
            setBottomModal(pourcentage+'%');
          } else {
            const pourcentage = newStepTuto.top-((-adapteTop)/60);
            setTopModal(pourcentage+'%');
            setBottomModal(pourcentage+'%');
          }
        }
        setTopArrow(newStepTuto.topArrow);

        if (newStepTuto.suivant === "display") {
          setSuivantTextModal("Suivant");
          setSuivantDisplayModal("display");
        } else if (newStepTuto.suivant === "finish") {
          setSuivantTextModal("Terminer")
          setSuivantDisplayModal("display");

        } else {
          setSuivantModal(null);
          setSuivantDisplayModal("none");
        }

        if (newStepTuto.precedent === "display") {
          setPrecedentDisplayModal("display");
        } else {
          setPrecedentModal(null);
          setPrecedentDisplayModal("none");
        }
        setIdModal(id+1)
      } else {
        updateChildTimerStart();
        setIdModal(1)
        setDisplayModal("none")
      }
  }

  // Met à jour la data enchere du joueur
  const _updateBets = (count) => {
    setValeurParent(count)
  }

  const dynamicStyle = {
    arrow: {
      position:'absolute',
      top: topArrow != 0 ? topArrow : viewHeight, //variable
        right: rightArrowModal, //variable
        width: 0,
        height: 0,
        borderLeftWidth: 11,
        borderRightWidth: 11,
        borderTopWidth: borderTopWidthArrow, //variable
        borderBottomWidth: borderBottomWidthArrow, //variable
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: Color.colorGold_200,
        borderBottomColor: Color.colorGold_200,
    },
    containerModal: {
      position: 'absolute',
      width: width,
      zIndex : 1,
      paddingHorizontal: 20,
      display: displayModal
    },
    containerModalTop: {
      top: topModal, //variable
    },
    containerModalBottom: {
      bottom: bottomModal,
    },
    buttonText2: {
      alignSelf: 'right',
      justifyContent: 'right',
      alignItems: 'flex-end',
      display: suivantDisplayModal, //variable
      borderStyle: "solid",
      borderColor: Color.colorDodgerblue,
      borderWidth: 2,
      borderRadius: Border.br_base,
      paddingHorizontal: Padding.p_7xs,
    },
    containerButtonText1: {
      alignSelf: 'left',
      justifyContent: 'right',
      alignItems: 'flex-start',
    },
    buttonText1: {
      alignSelf: 'left',
      justifyContent: 'right',
      alignItems: 'flex-start',
      display: precedentDisplayModal, //variable
      borderStyle: "solid",
      borderColor: Color.colorDodgerblue,
      borderWidth: 2,
      borderRadius: Border.br_base,
      paddingHorizontal: Padding.p_7xs,
    },

    text: {
      margin:5,
      textAlign: "center",
      color: Color.colorWhite,
      fontSize: FontSize.bodyRegular_size,
      fontFamily: FontFamily.poppinsMedium,
      fontWeight: "500",
   },
   containerButtonModal: {
     flexDirection: 'row',
     justifyContent: "space-between",
   },
   containerText: {
     justifyContent: 'center',
     alignSelf: 'center',
     alignItems: 'center'
   },

   text2: {
     color: Color.colorDodgerblue,
     fontSize: FontSize.size_sm,
     fontFamily: FontFamily.poppinsMedium,
     fontWeight: "500",
  },
    containerTextModal: {
      padding: 20,
      backgroundColor: Color.colorGold_200,
      borderRadius: 8,
      alignSelf:"center",
      borderStyle: "solid",
      borderColor: Color.colorWhite,
      borderWidth: 2,
    },
  }


  return (
    <View style={{ flex: 1}}>

    <View style={[dynamicStyle.containerModal, topModal != "0%" ? dynamicStyle.containerModalTop: dynamicStyle.containerModalBottom]} >
      <View style={dynamicStyle.containerTextModal}
       onLayout={onLayout}>
        <View style={dynamicStyle.containerText}>
          <Text style={dynamicStyle.text}>
            {textModal}
          </Text>
        </View>
        <View style={dynamicStyle.containerButtonModal}>
          <View style={dynamicStyle.containerButtonText1}>
            <TouchableOpacity style={dynamicStyle.buttonText1} onPress={previusTuto}>
              <Text style={dynamicStyle.text2}>
                Précédent
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={dynamicStyle.buttonText2} onPress={() => nextTuto(idModal)}>
            <Text style={dynamicStyle.text2}>
              {suivantTextModal}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={dynamicStyle.arrow} />
    </View>


    <View style={styles.row(16)}>
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
    <View style={[styles.row(60), styles.frameContainer]} >
      <View style={[styles.entete, (idModal == 3 || idModal == 4 || idModal == 5) ? styles.borderTuto : null]}>
        <Text style={styles.organe}>{nameTheme}</Text>
        <Text style={styles.joueur}>{player} pour : {currentBet}</Text>
      </View>
      <View style={styles.timer}>
       <CountdownScreen ref={childRef} _finish={_finish}/>
      </View>
    </View>
    <View>
      <Bets imagePng={require("../assets/123.png")} textTitre={"Compteur"} style={idModal == 7 ? styles.borderTuto : null} data={valeurParent} sendDataToParent={_updateBets}/>
    </View>
    <View style={styles.row(10)}/>
     <TouchableOpacity
      onPress= {_finish}
       style={[styles.startCountdownWrapper, styles.frameParent5FlexBox, idModal == 8 ? styles.borderTuto : null]}>
       <Text style={[styles.startCountdown, styles.thomasTypo]}>
          Terminer
        </Text>
     </TouchableOpacity>
   </View>
 )
};

const styles = StyleSheet.create({

  row: (percentage, customStyle = {}) => ({
    flex: percentage,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...customStyle,
  }),
  timer: {
    flex: 1,
    flexDirection:'collunm',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  entete: {
    flex: 0,
  },
  borderTuto: {
    borderStyle: "solid",
    borderColor: Color.colorGold_100,
    borderWidth: 5,
    borderRadius: Border.br_10xs,
  },
  startCountdownWrapper: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorDodgerblue,
    height: 46,
    marginBottom: 20,
  },
  frameParent5FlexBox: {
    justifyContent: "center",
    width: 312,
    alignItems: "center",
    alignSelf:'center',
    flexDirection: "row",
  },
  startCountdown: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  thomasTypo: {
    textTransform: "capitalize",
    textAlign: "left",
    fontSize: FontSize.calloutRegular_size,
  },
  frameContainer: {
    alignItems: "center",
    flexDirection: 'collunm',
    justifyContent: 'flex-Start'
  },
  joueur: {
    textAlign: "center",
    fontSize: FontSize.size_5xl,
    fontWeight: "500",
    color: Color.colorGray_200,
    fontFamily: FontFamily.poppinsMedium,
  },
  organe: {
    fontSize: FontSize.size_5xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorDodgerblue,
    marginTop: 10,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vectorIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  vectorIcon1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo2Icon: {
    width: '50%',
    height: '50%',
  },
  sTheGame: {
    fontSize: FontSize.size_5xl,
    textTransform: 'capitalize',
    fontWeight: '700',
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorDodgerblue,
    textAlign: 'left',
    marginTop: 20,
  },
  logo2Parent: {
    alignItems: 'center',
  },
  splash: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
});

export default Splash;
