import React, {useState, useEffect} from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import CardContainer from "./CardContainer";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { useSelector, useDispatch } from 'react-redux';

const ThomasContainer = () => {

  const players = useSelector((state) => state.players);
  const [winners, setWinners] = useState([]);
  const [others, setOthers] = useState([]);

    useEffect(() => {
      players.sort((a,b) => b.score - a.score);
      let newWinners = [];
      let newOthers = [];
      let highScore = 0;
      let rank = 1;
      let scoreRank = 0;
      players.forEach((item, i) => {
          if(item.score > highScore) {
            highScore = item.score;
            scoreRank = item.score;
            newWinners = [item]
          } else if(item.score === highScore) {
            newWinners.push(item)
          } else {
            if (item.score === scoreRank) {
              newOthers.push({item, rank:rank})
            } else if (item.score < scoreRank) {
              rank++;
              scoreRank = item.score;
              newOthers.push({item, rank:rank})
            }
          }
        });
      setOthers(newOthers);
      setWinners(newWinners);
    }, []);


  return (
    <ScrollView >
    <View style={styles.frameParent}>
      {winners.map((joueur, index) => (
        <View key={joueur.id} style={[styles.frameGroup, styles.frameFlexBox]}>
          <View style={styles.groupParent}>
            <Image
              style={styles.frameChild}
              contentFit="cover"
              source={require("../assets/group-7.png")}
            />
            <View style={styles.winnerParent}>
              <Text style={styles.winner}>Gagnant</Text>
              <Text style={[styles.thomas, styles.thomasText]}>{joueur.name}</Text>
            </View>
          </View>
          <View style={[styles.frameContainer, styles.frameFlexBox]}>
            <View>
              <Text style={[styles.points, styles.thomasText]}>Points</Text>
              <Text style={[styles.thomas, styles.thomasText]}>{joueur.score}</Text>
            </View>
            <View>
              <Text style={[styles.points, styles.thomasText]}>Classement</Text>
              <Text style={[styles.thomas, styles.thomasText]}>1er</Text>
            </View>
          </View>
        </View>
      ))}

      {others.map((joueur, index) => (

        <CardContainer
          key={joueur.item.id}
          personName={joueur.item.name}
          personPoint={joueur.item.score}
          personPosition={joueur.rank}
        />
      ))}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  frameFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  thomasText: {
    color: Color.colorGray_200,
    textAlign: "left",
    textTransform: "capitalize",
  },
  frameChild: {
    width: 34,
    height: 34,
  },
  winner: {
    color: Color.colorLimegreen,
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xs,
  },
  thomas: {
    fontSize: FontSize.calloutRegular_size,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    color: Color.colorGray_200,
  },
  winnerParent: {
    marginLeft: 9,
  },
  groupParent: {
    flexDirection: "row",
    alignItems: "center",
  },
  points: {
    fontFamily: FontFamily.calloutRegular,
    color: Color.colorGray_200,
    fontSize: FontSize.size_xs,
  },
  frameContainer: {
    width: 135,
  },
  frameGroup: {
    marginTop: 14,
    borderRadius: Border.br_xs,
    backgroundColor: Color.colorPalegoldenrod,
    width: 313,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_5xl,
    alignItems: "center",
  },
  frameParent: {
    alignItems: "center",
  },
});

export default ThomasContainer;
