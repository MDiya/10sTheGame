import React, {useState, useEffect} from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, FlatList, Alert, BackHandler } from "react-native";
import { Color, Border, FontSize, Padding, FontFamily } from "../GlobalStyles";
import {getTheme, getLengthThemeList, getRandomTheme} from '../Api/ThemeApi';
import { useSelector, useDispatch } from 'react-redux';
import {HeaderGamePlayerList, GamePlayerList, FooterComponent} from '../components/GamePlayerList';
import {Bets} from '../components/Bets';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Theme = () => {

  const heightRef = 840;


  const dispatch = useDispatch();

  const { width, height } = Dimensions.get('window');

  const [nameTheme, setNameTheme] = useState('');
  const navigation = useNavigation();
  const [valeurParent, setValeurParent] = useState(1);
  const [is1fois, setIs1fois] = useState(0);
  const [timer1Seconds, setTimer1Seconds] = useState(8);
  const [timer2Seconds, setTimer2Seconds] = useState(5);
  const [isFirstTimer, setIsFirstTimer] = useState(true);
  const [intervalId, setIntervalId] = useState(null);

  const players = useSelector((state) => state.players);
  const idThemesUsed = useSelector((state) => state.idThemesUsed);
  const updateTheme = useSelector((state) => state.updateTheme);
  const updateCounts = useSelector((state) => state.updateCounts);


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

    useEffect(() => {
      getData().then((isTutoModal) => {
       if (isTutoModal != false && isFirstModal) {
         setIsFirstModal(false);
         nextTuto(1);
       }
     })
     .catch((error) => {
       console.error('Erreur lors de la récupération des données :', error);
     });
  }, [isFirstModal]);

    const steps = [
      {
        id:1,
        text:"Vous voila sur la page d'enchère!",
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
        text:"Ceci est le bouton pour quitter la partie.",
        arrow: "display",
        topArrow : -16,
        arrowVertical: "top",
        arrowRight: 43,
        bottom: 0,
        top: 13, //px
        suivant: "display",
        precedent: "display",
      },
      {
        id:3,
        text:"Voici le thème de la manche avec sur la gauche un bouton qui permet (une fois par manche) de changer le thème.",
        arrow: "display",
        topArrow : -16,
        arrowVertical: "top",
        arrowRight: (width/2)-11,
        bottom: 0,
        top: 29,//faire plus 6 pour la fleche
        suivant: "display",
        precedent: "display",
      },
      {
        id:4,
        text:"Vous disposez de temps pour débattre. Lors de ce premier chrono les joueurs vont donc enchérir les uns après les autres. L'enchère correspond au nombre de bonne réponse qu'un joueur peut énumérer en seulement 10 secondes sur le thème donné.",
        arrow: "display",
        topArrow : -16,
        arrowVertical: "top",
        arrowRight: (width/2)-11,
        bottom: 0,
        top: 37,//faire plus 6 pour la fleche
        suivant: "display",
        precedent: "display",
      },
      {
        id:5,
        text:"A la fin du premier chrono, s'affiche un deuxième chrono qui vous laisse le temps de saisir les enchères des joueurs.",
        arrow: "display",
        topArrow : -16,
        arrowVertical: "top",
        arrowRight: (width/2)-11,
        bottom: 0,
        top: 36,//faire plus 6 pour la fleche
        suivant: "display",
        precedent: "display",
      },
      {
        id:6,
        text:"Cliquez sur le nom DU ou DES joueurs ayant dit l'enchère la plus élevé.",
        arrow: "display",
        topArrow : 0,
        arrowVertical: "bottom",
        arrowRight: (width/2)-11,
        bottom: 68,
        top: 0,
        suivant: "display",
        precedent: "display",
      },
      {
        id:7,
        text:"Saisissez ensuite la valeur de l'enchère.",
        arrow: "display",
        topArrow : -16,
        arrowVertical: "top",
        arrowRight: (width/2)-11,
        bottom: 0,
        top: 81,
        suivant: "display",
        precedent: "display",
      },
      {
        id:8,
        text:"Pour finir lancez le chrono grâce à ce bouton",
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

    // Met à jour la data enchere du joueur
    const _updateBets = (count) => {
      setValeurParent(count)
      const actionUpdateBet ={type: "UPDATE_CURRENT_BET", value: count}
      dispatch(actionUpdateBet)
    }

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

    const close = () => {
      Alert.alert(
            'Jeu',
            'Voulez-vous quitter la partie?',
            [
              {
                text: 'Non',
                onPress: () => console.log('Annulé'),
                style: 'cancel',
              },
              {
                text: 'Oui',
                onPress: () => {
                  navigation.navigate('PlayersList')
                },
              },
            ],
            { cancelable: false }
          );
    }

    const startSecondTimer = () => {
      const timer2 =  setInterval(() => {
        // Actions à effectuer à chaque itération du premier timer
       setTimer2Seconds((prevSeconds2) => {
         if (prevSeconds2 === 1) {
           clearInterval(timer2);
           // lancementTimer()
           return 0;
         }
         return prevSeconds2 - 1;
       });
     }, 1000);
    }

    const startInterval = () => {
      if (!intervalId) {
        const timer1 =  setInterval(() => {
            // Actions à effectuer à chaque itération du premier timer
           setTimer1Seconds((prevSeconds) => {
             if (prevSeconds === 1) {
               clearInterval(timer1);
               setIsFirstTimer(false);
               startSecondTimer();
               stopInterval();
               return 0;
             }
             return prevSeconds - 1;
           });
         }, 1000);
        setIntervalId(timer1);
      }
    };

    const stopInterval = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    };

    const restartInterval = () => {
       setTimer1Seconds(8); // Réinitialiser la valeur du timer si nécessaire
     };

  //Avant la création de la page, on met à jour le thème
  useEffect(() => {

    if (updateTheme){
      setIsFirstTimer(true);
      _updateTheme()
      setIs1fois(0)
      setTimer1Seconds(8)
      setTimer2Seconds(5)
      getData().then((isTutoModal) => {
       if (isTutoModal == false) {
         startInterval()
       }
     })
     .catch((error) => {
       console.error('Erreur lors de la récupération des données :', error);
     });
    }
    if (updateCounts){
      _updateBets(1)
      const actionUpdateCounts ={type: "UPDATE_COUNTS", value: false}
      dispatch(actionUpdateCounts)
    }
});

  const _updateTheme1fois = () => {
    if (is1fois === 0) {
        setIsFirstTimer(true);
        setIs1fois(1)
        _updateTheme()
        setTimer1Seconds(8)
        setTimer2Seconds(5)
        restartInterval()
    }
  }

  //Selection du nouveau thème, ajout du thème à la liste des thèmes utilisés
  // on enregistre de ne pas mettre à jour le thème
  const _updateTheme = () => {
    if (idThemesUsed.length >= getLengthThemeList()){
      const actionCurrentTheme =
        {type: "RESET_THEME", value: true}
      dispatch(actionCurrentTheme)
    } else {
      const localIdThemeUsed = getRandomTheme(idThemesUsed)
      setNameTheme(getTheme(localIdThemeUsed))

      const actionCurrentTheme =
        {type: "MODIFY_CURRENT_THEME", value: localIdThemeUsed}
      dispatch(actionCurrentTheme)

      const actionThemeUsed =
        {type: "ADD_THEME", value: localIdThemeUsed}
      dispatch(actionThemeUsed)

      const actionUpdateTheme =
        {type: "UPDATE_THEME", value: false}
      dispatch(actionUpdateTheme)
    }

  }

  const lancementTimer = () => {
    const playersSelected = players.filter((item, _) => item.isSelected == true)
    if (playersSelected.length == 0) {
      const idPlayer =
        players[Math.floor(Math.random()*players.length)].id;
        _updateBets(2)
        _goToGo(idPlayer)
    } else {
      _isSelected()
    }
  }

  // on recupère le pari le plus élevé, on choisi aléatoirement un joueur si
    // deux joueurs on le même partie, on met à jour la valeur de l'enchère avec
    // le nom du joueur qui pari et on lance la page Go avec le chronomètre
  const _isSelected = () => {
      var idPlayer = 0;
      const playersSelected = players.filter((item, _) => item.isSelected == true)
      if (playersSelected.length > 1) {
        idPlayer =
          playersSelected[Math.floor(Math.random()*playersSelected.length)].id;
          _goToGo(idPlayer)
      } else if (playersSelected.length == 1) {
        idPlayer = playersSelected[0].id
        _goToGo(idPlayer)
      } else {
        Alert.alert('Veuillez selectionner au moins un joueur')
      }
    }

  const _goToGo = (idPlayer) => {
      const actionUpdateCurrentPlayer =
        {type: "UPDATE_CURRENT_PLAYER", value: idPlayer}
      dispatch(actionUpdateCurrentPlayer)

      const actionUpdateGo ={type: "UPDATE_GO", value: true}
      dispatch(actionUpdateGo)
      navigation.navigate('Splash2')
      stopInterval()
    }

  const startTimer = () => {
   };

   const previusTuto = () => {
     const newId = idModal-2;
     nextTuto(newId);
   }

   const nextTuto = (id) => {
     if (id <= steps.length) {
        if(id ===5){
          setIsFirstTimer(false);
        }
        if(id ===4){
          setIsFirstTimer(true);
        }
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
         setIdModal(1)
         setDisplayModal("none")
       }
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
    <View style={styles.theme}>
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
        <TouchableOpacity style={[styles.boutonTuto, idModal == 3 ? styles.borderTuto : null]} onPress={close}>
          <Image
            style={{ width: 25, height: 25}}
            contentFit="cover"
            source={require("../assets/CancelPlayer.svg")}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.row(12), styles.frameGroup]}>


        {isFirstTimer&&
        <View style={[ styles.frameContainer]}>
          <View style={[idModal == 4 ? styles.borderTuto : null, {paddingHorizontal: 20}]}>
          <Text style={styles.theme1}>Thème :</Text>
          <View style={styles.themeOrgane}>
            <TouchableOpacity style={styles.frameInner1} onPress={() => _updateTheme1fois()} activeOpacity={is1fois}>
              <Image
                style={styles.frameInner}
                contentFit="cover"
                source={is1fois === 0 ? require("../assets/group-2.png") : require("../assets/group-2-BaW.png")}
              />
            </TouchableOpacity>

            <Text style={styles.organe}>{nameTheme}</Text>
          </View>
          </View>
          <View style={[styles.themeOrgane, idModal == 5 ? styles.borderTuto : null] }>
            <Text style={styles.timerText}>Il vous reste </Text>
            <Text style={styles.timerNumber}>{Math.max(0, timer1Seconds)}</Text>
            <Text style={styles.timerText}> pour débattre! </Text>
          </View>
        </View>
      }
      {!isFirstTimer &&
        <View style={[ styles.frameContainer, idModal == 6 ? styles.borderTuto : null]}>
        <View style={styles.frameTimer2}>
          <Text style={styles.timer2Text}>Saissez l'enchère !</Text>
          <Text style={styles.timerText}>Début du minuteur dans :</Text>
          <Text style={[styles.timer3Text, styles.timer2Text]}>{Math.max(0, timer2Seconds)}</Text>
        </View>
        </View>
      }
      </View>
      <View style={[styles.row(46), styles.frameGroup2]}>
        <View style={[styles.frameContainer2]}>
          <FlatList
            style={[styles.frameParent2, styles.frameParentBg, idModal == 7 ? styles.borderTuto : null]}
             ListHeaderComponent={<HeaderGamePlayerList isMultiple={players.length>1}/>}
             ListFooterComponent={FooterComponent}
             data={players}
             renderItem={({item}) => <GamePlayerList player={item}/> }
             keyExtractor={item => item.id}
           />
        </View>

        <View style={[styles.frameContainer3]}>
          <Bets imagePng={require("../assets/vector11.png")} textTitre={"Enchère"} style={idModal == 8 ? styles.borderTuto : null} data={valeurParent} sendDataToParent={_updateBets}/>
        </View>

      </View>
      <View style={[styles.row(12)]}/>
      <TouchableOpacity
        style={styles.row(18), [styles.startCountdownWrapper, styles.frameParent5FlexBox, idModal == 9 ? styles.borderTuto : null]}
        onPress={_isSelected}>
        <Text style={[styles.startCountdown, styles.buttonTypo]}>
          Lancer le chrono
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  theme: {
    flex: 1,
  },
  row: (percentage, customStyle = {}) => ({
    flex: percentage,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...customStyle,
  }),
  boutonTuto: {
    top: 50,
    right: 30,
    height: 45,
    padding: 5
  },
  borderTuto: {
    borderStyle: "solid",
    borderColor: Color.colorGold_100,
    borderWidth: 5,
    borderRadius: Border.br_10xs,
  },
  timerNumber: {
    fontSize: FontSize.size_xxl,
    color: Color.colorGray_200,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  timerText: {
    fontSize: FontSize.size_xl,
      color: Color.colorGray_200,
      fontFamily: FontFamily.poppinsMedium,
      fontWeight: "500",
  },
  timer2Text: {
    fontSize: FontSize.size_xxl,
      color: Color.colorGold_200,
      fontFamily: FontFamily.poppinsMedium,
      fontWeight: "700",
  },
  timer3Text: {
      marginBottom: 30,
  },
  themeOrgane: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  frameTimer2: {
    flexDirection: 'collunm',
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  frameGroup: {
    justifyContent: "flex-start",
    flexDirection: 'column',
  },
  frameGroup2: {
    justifyContent: "center",
    flexDirection: 'column',
  },
  frameParentBg: {
    backgroundColor: Color.colorPalegoldenrod,
    borderRadius: Border.br_xs,
  },
  thomasTypo: {
    textTransform: "capitalize",
    textAlign: "left",
    fontSize: FontSize.calloutRegular_size,
  },
  buttonTypo: {
    textAlign: "left",
    fontSize: FontSize.calloutRegular_size,
  },
  frameParent5FlexBox: {
    justifyContent: "center",
    width: 312,
    alignItems: "center",
    alignSelf:'center',
    flexDirection: "row",
  },
  themeItem: {
    backgroundColor: Color.colorGold_200,
    width: 360,
    display: "none",
    left: 0,
    top: 0,
    position: "absolute",
    height: 800,
  },
  frameItem: {
    borderRadius: Border.br_13xl,
    width: 28,
    height: 28,
  },
  frameParent: {
    top: 57,
    left: 33,
    width: 311,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  theme1: {
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
    textAlign: "left",
  },
  frameContainer: {
    alignItems: "center",
    flex: 0,
  },
  frameContainer2: {
    alignItems: "center",
    marginTop: 30,
    maxHeight: 300
  },

  frameContainer3: {
    alignItems: "center",
    marginTop: 10,
  },

  frameInner1: {
    alignItems: "center",
    justifyContent: "center",
  },
  frameInner: {
    height: 40,
    width: 40,
    alignSelf: "center"
  },

  frameParent2: {
    paddingHorizontal: 0,
    paddingTop: Padding.p_5xs,
  },
  startCountdown: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  startCountdownWrapper: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorDodgerblue,
    height: 46,
    marginBottom: 20,
  },
});

export default Theme;
