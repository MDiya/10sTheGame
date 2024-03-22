import React, {useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, FlatList, Alert, ScrollView, Platform, Keyboard, BackHandler, Button } from 'react-native';
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";
import { Image } from "expo-image";
import { useNavigation } from '@react-navigation/native';
import Player from '../components/Player'
import { useSelector, useDispatch } from 'react-redux';
import NewPlayer from '../components/NewPlayer'
import { KeyboardAvoidingView } from 'react-native';
const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlayersList = () => {

  const heightRef = 840;

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isFirstModal, setIsFirstModal] = useState(true);

  const navigation = useNavigation();
  const players = useSelector((state) => state.players);
  const dispatch = useDispatch();

  const [viewHeight, setViewHeight] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);

  const [displayModal, setDisplayModal] = useState("display");

  const [topArrow, setTopArrow] = useState(0);

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

  const steps = [
    {
      id:1,
      text:"Vous voila sur la page d'accueil!",
      arrow: "none",
      topArrow : 0,
      arrowVertical: "none",
      arrowRight: 0,
      top: 45,
      suivant: "display",
      precedent: "none",
    },
    {
      id:2,
      text:"Ceci est le bouton pour accéder aux réglages. Vous pouvez y changer la limite de score et la langue ou alors partager l'application, revoir le tutoriel et même nous envoyer des messages",
      arrow: "display",
      topArrow : -16,
      arrowVertical: "top",
      arrowRight: 43,
      top: 13,
      bottom: 0,
      suivant: "display",
      precedent: "display",
    },
    {
      id:3,
      text:"Vous pouvez ajouter les joueurs de la partie en cliquant sur ce bouton!",
      arrow: "display",
      topArrow : 0,
      arrowVertical: "bottom",
      arrowRight: (width/2)-11,
      top: 0,
      bottom: 30,
      suivant: "display",
      precedent: "display",
    },
    {
      id:4,
      text:"Ensuite il suffit de lancer la partie juste ici!",
      arrow: "display",
      topArrow : 0,
      arrowVertical: "bottom",
      arrowRight: (width/2)-11,
      top: 0,
      bottom: 12,
      suivant: "finish",
      precedent: "display",
    }
  ]

  const goToNextPage = () => {
    if(players.length > 0 ) {
        const actionINITGame ={type: "INIT_GAME", value: false}
        dispatch(actionINITGame)
        navigation.navigate('Theme')
      } else {
        Alert.alert('Veuillez créer des joueurs')
      }
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const inputRef = useRef(null);

  const handleTextInputClick = () => {
    // Appeler la méthode focus() pour ouvrir le clavier
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const revoirTuto = () => {
    Alert.alert(
          'Tutoriel',
          'Voulez-vous revoir le tutoriel?',
          [
            {
              text: 'Non',
              onPress: () => console.log('Annulé'),
              style: 'cancel',
            },
            {
              text: 'Oui',
              onPress: () => {
                navigation.navigate('Slide1');
              },
            },
          ],
          { cancelable: false }
        );
  }

  useEffect(() => {

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      }
    );

    // Nettoyer les écouteurs d'événements lorsque le composant est démonté
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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


  useEffect(() => {

    backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => {
      backHandler.remove();
    };
  });

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
    <KeyboardAvoidingView
       style={styles.container}
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
     >
    <View style={styles.container} >
      {/* First row */}
        <View style={styles.row(17)}>
          <Image

            style={{ width: width/1.5, height: 150}}
            contentFit="cover"
            source={require("../assets/CercleJeu.svg")}
          />
          <TouchableOpacity onPress={revoirTuto} style={[styles.boutonTuto, idModal == 3 ? styles.borderTuto : null]}>
            <Image
              style={{ width: 25, height: 25} }
              contentFit="cover"
              source={require("../assets/point-dinterrogation.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.row(18, { justifyContent: 'center' })]}>
          <Image
            style={{ width: width/2, height: '100%'}}
            contentFit="cover"
            source={require("../assets/dessin.svg")}
          />
        </View>

      {/* Third row */}
      <View style={[styles.row(30), styles.containerPlayer]}>
        {isOpen && <NewPlayer toggle={toggle}/>}

        <FlatList
            data={players}
            renderItem={({item}) => <Player player={item}/> }
            keyExtractor={item => item.id}
            />
      </View>

      {!isKeyboardOpen && (
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
    )}


      {/* Fourth row */}
      {!isKeyboardOpen && (
        <TouchableOpacity
          style={[styles.row(5), styles.frameWrapper, idModal ==4 ? styles.borderTuto : null]}
          onPress={toggle}
          ref={inputRef}
          activeOpacity={0.7}>

          <View style={styles.parentFlexBox}>
            <Image
                style={styles.groupIcon1}
                contentFit="cover"
                source={require("../assets/AddPlayer.svg")}
              />
              <Text style={[styles.addPlayer, styles.addTypo]}>
                Ajouter un joueur
              </Text>
            </View>
        </TouchableOpacity>
      )}

      {/* Fifth row */}
      {!isKeyboardOpen && (
        <View style={styles.row(10)} />
      )}

      {/* Sixth row */}
      {!isKeyboardOpen && (

        <TouchableOpacity style={[styles.row(5), styles.goWrapper, idModal == 5 ? styles.borderTuto : null]} onPress={goToNextPage}>
        <Text style={[styles.go, styles.goTypo]}>Démarrer</Text>
      </TouchableOpacity>
      )}
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  containerPlayer : {
    flexDirection: 'column',
  },
  row: (percentage, customStyle = {}) => ({
    flex: percentage,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...customStyle,
  }),
  image: {
    width: 50,
    height: 50,
  },
  logo1Icon: {
    width: 39,
    height: 30,
  },
  sTheGameWrapper: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_7xs,
    marginLeft: 4,
  },
  sTheGame: {
    fontSize: FontSize.size_xl,
    color: Color.colorDodgerblue,
    textTransform: "capitalize",
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  addPlayer: {
    textAlign: "center",
    marginLeft: 6,
    color: Color.colorDodgerblue,
  },
  goTypo: {
    fontSize: FontSize.calloutRegular_size,
    textTransform: "capitalize",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  addTypo: {
    fontSize: FontSize.calloutRegular_size,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  frameWrapper: {
    padding: Padding.p_5xs,
    marginTop: 16,
    alignSelf: "center",
    alignItems: "center",
  },
  parentFlexBox: {
    flexDirection: "row",
    alignItems: "flex-top",
  },
  groupIcon1: {
    width: 15,
    height: 15,
    marginTop: 5,
  },
  goWrapper: {
    height : 10,
    width: 312,
    alignSelf:'center',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.colorDodgerblue,
    borderRadius: Border.br_5xs,
    marginBottom: 20,
  },
  go: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textTransform: "capitalize",
    fontSize: FontSize.calloutRegular_size,
  },
});

export default PlayersList;
