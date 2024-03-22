import React, {useState, useEffect} from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Border, FontFamily, FontSize, Color, Padding } from "../GlobalStyles";
import { Checkbox } from 'react-native-paper';
import {getTheme, _getPlayerName} from '../Api/ThemeApi'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const Validation = () => {

  const heightRef = 840;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const idCurrentTheme = useSelector((state) => state.idCurrentTheme);
  const currentBet = useSelector((state) => state.currentBet);
  const players = useSelector((state) => state.players);
  const [isChecked, setChecked] = useState(false);

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
  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('isTutoModal', value);
    } catch (e) {
      console.log(e);
    }
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
    text:"Pour terminer, voici la page de validation! C'est ici que tous les joueurs valideront ou pas, les réponses données.",
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
    text:"En cas de réussite, le joueur gagne autant de point que son enchère!",
    arrow: "display",
    topArrow : 0,
    arrowVertical: "bottom",
    arrowRight: (width/4)-4,
    bottom: 11,
    top: 0,
    suivant: "display",
    precedent: "display",
  },
  {
    id:3,
    text:"En cas d'échec, la moitié des points est répartie entre les autres joueurs!",
    arrow: "display",
    topArrow : 0,
    arrowVertical: "bottom",
    arrowRight: ((width/4)*3)-22,
    bottom: 11,
    top: 0,
    suivant: "display",
    precedent: "display",
  },
  {
    id:4,
    text:"Bonne partie à vous! ",
    arrow: "none",
    topArrow : 0,
    arrowVertical: "none",
    arrowRight: 0,
    bottom: 0,
    top: 45,
    suivant: "finish",
    precedent: "display",
  },
]

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

  // fonction de navigation entre la continuation du jeu ou la victoire,
  // maj du theme et des compteurs
  const changement = (choice) => {
    getData().then((isTutoModal) => {
     if (isTutoModal == false) {
      const actionSuccess ={type: choice, value: true}
      dispatch(actionSuccess)
      }
      _end()
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }

  //verifi s'il y a un gagnant et redirige en fonction
  const _end =() =>{

      if (isChecked) {
        storeData('false');
      } else {
        storeData('true');
      }

      const winners = []

      players.forEach((item, i) => {
        if(item.score >= 20) {
          winners.push(item.name)
        }
      });
      if (winners.length < 1){
        navigation.navigate('Theme')
      }
      else {
        navigation.navigate('Ranking')}
  }


  return (
    <View style={styles.validation}>

    <View style={[dynamicStyle.containerModal, topModal != "0%" ? dynamicStyle.containerModalTop: dynamicStyle.containerModalBottom]} >
      <View style={dynamicStyle.containerTextModal}
       onLayout={onLayout}>
        <View style={dynamicStyle.containerText}>
          <Text style={dynamicStyle.text}>
            {textModal}
          </Text>
        </View>
        {idModal == 5 &&
          <View style={[dynamicStyle.containerText, dynamicStyle.containerButtonModal]}>
          <Text
            style={[dynamicStyle.text]}>
            Ne plus afficher le tutoriel
            </Text>
            <Checkbox
              status={isChecked ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange()}
              color={Color.colorWhite} />
            </View>
            }
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

    <View style={styles.row(17)}>
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


      <View style={[styles.row(60), styles.resultParent]}>
        <View style={styles.entete}>
          <Text style={styles.result}>{nameTheme}</Text>
          <Text style={styles.thomasResults}>{player} pour : {currentBet}</Text>
        </View>

        <View style={styles.frameParent}>
          <Image
            style={styles.frameChild}
            contentFit="contain"
            cache="only-if-cached"
            source={require("../assets/Check.png")}
          />
        </View>
      </View>

      <View style={[styles.row(18), styles.frameGroup]}>
        <TouchableOpacity
          onPress={() => changement("FAIL")}
          style={[styles.failWrapper, styles.wrapperFlexBox, idModal == 4 ? styles.borderTuto : null]}>
          <Text style={[styles.fail, styles.passTypo]}>Echec</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => changement("SUCCESS")}
          style={[styles.passWrapper, styles.wrapperFlexBox, idModal == 3 ? styles.borderTuto : null]}>
          <Text style={[styles.pass, styles.passTypo]}>Reussite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentFlexBox: {
    alignItems: "center",
    position: "absolute",
  },
  row: (percentage, customStyle = {}) => ({
    flex: percentage,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...customStyle,
  }),
  borderTuto: {
    borderStyle: "solid",
    borderColor: Color.colorGold_100,
    borderWidth: 5,
    borderRadius: Border.br_10xs,
  },
  wrapperFlexBox: {
    flex: 1,
    height: 46,
    justifyContent: "center",

    borderRadius: Border.br_5xs,
    alignItems: "center",
    flexDirection: "row",
  },
  passTypo: {
    textAlign: "center",
    textTransform: "capitalize",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.calloutRegular_size,
  },

  frameChild: {
    width: width,
    height: '100%',
    resizeMode: 'contain'
  },
  frameItem: {
    borderRadius: Border.br_13xl,
  },
  frameParent: {
    flex: 1,
    flexDirection:'collunm',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  result: {
    fontSize: FontSize.size_5xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorDodgerblue,
    marginTop: 10,
    textAlign: "center",
  },
  thomasResults: {
    textAlign: "center",
    fontSize: FontSize.size_5xl,
    fontWeight: "500",
    color: Color.colorGray_200,
    fontFamily: FontFamily.poppinsMedium,
  },
  resultParent: {
    alignItems: "center",
    flexDirection: 'collunm',
    justifyContent: 'flex-Start'
  },
  pass: {
    color: Color.colorWhite,
  },
  failWrapper: {
    flex:1,
    borderColor: Color.colorDodgerblue,
    borderStyle: "solid",
    borderWidth: 1,

  },
  fail: {
    color: Color.colorDodgerblue,
    textAlign: "center",
    textTransform: "capitalize",
  },
  passWrapper: {
    backgroundColor: Color.colorDodgerblue,
    marginLeft: 16,
  },
  frameGroup: {
    flexDirection: "row",
    paddingHorizontal: Padding.p_5xl,
    alignItems: 'flex-end',
    marginBottom: Padding.p_5xl,
  },

  validation: {
    flex: 1,
  },
});

export default Validation;
