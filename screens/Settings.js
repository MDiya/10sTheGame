import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontFamily, Border, FontSize, Padding } from "../GlobalStyles";

const Settings = () => {
  return (
    <View style={styles.settings}>
      <Image
        style={styles.settingsChild}
        contentFit="cover"
        source={require("../assets/group-1.png")}
      />
      <View style={[styles.settingsItem, styles.groupChildPosition]} />
      <View style={styles.vectorParent}>
        <Image
          style={styles.vectorIcon}
          contentFit="cover"
          source={require("../assets/vector2.png")}
        />
        <Image
          style={styles.groupIcon}
          contentFit="cover"
          source={require("../assets/group.png")}
        />
      </View>
      <View style={styles.settingsParent}>
        <Text style={styles.settings1}>Settings</Text>
        <View style={styles.generalParent}>
          <Text style={[styles.general, styles.soundTypo]}>General</Text>
          <View style={styles.frameParent}>
            <View style={styles.frameGroup}>
              <View style={[styles.soundParent, styles.parentFlexBox1]}>
                <Text style={[styles.sound, styles.soundTypo]}>Sound</Text>
                <Image
                  style={styles.switchIcon}
                  contentFit="cover"
                  source={require("../assets/switch.png")}
                />
              </View>
              <View style={[styles.languageParent, styles.parentFlexBox]}>
                <Text style={[styles.sound, styles.soundTypo]}>Language</Text>
                <View style={[styles.englishParent, styles.wrapperFlexBox]}>
                  <Text style={[styles.english, styles.englishTypo]}>
                    English
                  </Text>
                  <Image
                    style={styles.vectorIcon1}
                    contentFit="cover"
                    source={require("../assets/vector3.png")}
                  />
                </View>
              </View>
              <View style={[styles.languageParent, styles.parentFlexBox]}>
                <Text style={[styles.sound, styles.soundTypo]}>
                  Points limit
                </Text>
                <View style={[styles.wrapper, styles.wrapperFlexBox]}>
                  <Text style={[styles.english, styles.englishTypo]}>5</Text>
                </View>
              </View>
            </View>
            <View style={styles.frameContainer}>
              <View style={styles.vectorGroup}>
                <Image
                  style={styles.frameLayout}
                  contentFit="cover"
                  source={require("../assets/line-1.png")}
                />
                <View style={styles.frameView}>
                  <View
                    style={[styles.vectorContainer, styles.soundParentFlexBox]}
                  >
                    <Image
                      style={styles.vectorIcon2}
                      contentFit="cover"
                      source={require("../assets/vector4.png")}
                    />
                    <Text style={[styles.shareTo, styles.soundTypo]}>
                      Share to :
                    </Text>
                  </View>
                  <View style={styles.parentFlexBox}>
                    <View style={styles.instagram1Parent}>
                      <Image
                        style={styles.groupChildLayout}
                        contentFit="cover"
                        source={require("../assets/instagram-1.png")}
                      />
                      <Text style={[styles.instagram, styles.englishTypo]}>
                        Instagram
                      </Text>
                    </View>
                    <View style={styles.vecteezyLogoDeWhatsappPngParent}>
                      <Image
                        style={styles.vecteezyLogoDeWhatsappPngIcon}
                        contentFit="cover"
                        source={require("../assets/vecteezy-logodewhatsapppngiconodewhatsapppngwhatsapp-18930746-1.png")}
                      />
                      <Text style={[styles.instagram, styles.englishTypo]}>
                        Whatsapp
                      </Text>
                    </View>
                    <View style={styles.vecteezyLogoDeWhatsappPngParent}>
                      <Image
                        style={styles.vecteezyLogotipoDeFacebookIcon}
                        contentFit="cover"
                        source={require("../assets/vecteezy-logotipodefacebookpngiconodefacebooktransparentepng-18930698-1.png")}
                      />
                      <Text style={[styles.instagram, styles.englishTypo]}>
                        Facebook
                      </Text>
                    </View>
                    <View style={styles.vecteezyLogoDeWhatsappPngParent}>
                      <View style={styles.groupChildLayout}>
                        <View
                          style={[styles.groupChild, styles.groupChildLayout]}
                        />
                        <Image
                          style={styles.vectorIcon3}
                          contentFit="cover"
                          source={require("../assets/vector5.png")}
                        />
                      </View>
                      <Text style={[styles.instagram, styles.englishTypo]}>
                        More
                      </Text>
                    </View>
                  </View>
                </View>
                <Image
                  style={[styles.frameItem, styles.frameLayout]}
                  contentFit="cover"
                  source={require("../assets/line-1.png")}
                />
              </View>
              <View style={styles.frameParent2}>
                <View style={[styles.groupGroup, styles.groupLayout]}>
                  <Image
                    style={styles.groupIcon1}
                    contentFit="cover"
                    source={require("../assets/group1.png")}
                  />
                  <Text style={styles.watchTutorial}>watch tutorial</Text>
                </View>
                <View style={[styles.vectorParent1, styles.groupLayout]}>
                  <Image
                    style={styles.vectorIcon4}
                    contentFit="cover"
                    source={require("../assets/vector6.png")}
                  />
                  <Text style={styles.watchTutorial}>Send email</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildPosition: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  soundTypo: {
    textAlign: "left",
    color: Color.colorGray_200,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  parentFlexBox1: {
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
  parentFlexBox: {
    marginTop: 24,
    alignItems: "center",
    flexDirection: "row",
  },
  wrapperFlexBox: {
    borderRadius: Border.br_9xs,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.colorWhite,
  },
  englishTypo: {
    fontFamily: FontFamily.calloutRegular,
    textAlign: "left",
    color: Color.colorGray_200,
    textTransform: "capitalize",
  },
  soundParentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupChildLayout: {
    height: 29,
    width: 29,
  },
  frameLayout: {
    width: 135,
    maxHeight: "100%",
  },
  groupLayout: {
    height: 40,
    borderRadius: Border.br_5xs,
    width: 272,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  settingsChild: {
    top: -335,
    left: -190,
    width: 467,
    height: 473,
    position: "absolute",
  },
  settingsItem: {
    backgroundColor: Color.colorGold_200,
    width: 360,
    display: "none",
    height: 800,
    top: 0,
  },
  vectorIcon: {
    height: 15,
    width: 20,
  },
  groupIcon: {
    height: 20,
    width: 20,
  },
  vectorParent: {
    top: 67,
    width: 310,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    left: 24,
    position: "absolute",
  },
  settings1: {
    fontSize: FontSize.size_5xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorDodgerblue,
    textAlign: "center",
  },
  general: {
    fontSize: FontSize.size_sm,
    color: Color.colorGray_200,
  },
  sound: {
    fontSize: FontSize.calloutRegular_size,
  },
  switchIcon: {
    width: 26,
    height: 14,
  },
  soundParent: {
    alignItems: "center",
    flexDirection: "row",
  },
  english: {
    fontSize: FontSize.size_xs,
  },
  vectorIcon1: {
    width: 5,
    height: 3,
    marginLeft: 20,
  },
  englishParent: {
    padding: 9,
  },
  languageParent: {
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
  wrapper: {
    width: 85,
    height: 26,
    paddingHorizontal: 16,
    paddingVertical: Padding.p_5xs,
    justifyContent: "center",
  },
  frameGroup: {
    paddingHorizontal: 20,
    paddingVertical: 0,
    justifyContent: "center",
    width: 312,
  },
  vectorIcon2: {
    width: 12,
    height: 13,
  },
  shareTo: {
    marginLeft: 9,
    fontSize: FontSize.size_sm,
    color: Color.colorGray_200,
  },
  vectorContainer: {
    alignItems: "center",
  },
  instagram: {
    fontSize: FontSize.size_3xs,
    marginTop: 8,
  },
  instagram1Parent: {
    alignItems: "center",
  },
  vecteezyLogoDeWhatsappPngIcon: {
    width: 32,
    height: 31,
  },
  vecteezyLogoDeWhatsappPngParent: {
    marginLeft: 24,
    alignItems: "center",
  },
  vecteezyLogotipoDeFacebookIcon: {
    width: 30,
    height: 31,
  },
  groupChild: {
    borderRadius: 6,
    left: 0,
    top: 0,
    position: "absolute",
    backgroundColor: Color.colorWhite,
    width: 29,
  },
  vectorIcon3: {
    height: "29.47%",
    width: "5.15%",
    top: "36.84%",
    right: "47.42%",
    bottom: "33.68%",
    left: "47.42%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  frameView: {
    marginTop: 32,
    width: 312,
    alignItems: "center",
  },
  frameItem: {
    marginTop: 32,
  },
  vectorGroup: {
    justifyContent: "center",
    alignItems: "center",
  },
  groupIcon1: {
    height: 12,
    width: 20,
  },
  watchTutorial: {
    fontSize: FontSize.size_mini,
    color: Color.colorWhite,
    marginLeft: 12,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textTransform: "capitalize",
    textAlign: "center",
  },
  groupGroup: {
    backgroundColor: "#f44242",
  },
  vectorIcon4: {
    width: 24,
    height: 13,
  },
  vectorParent1: {
    backgroundColor: Color.colorDodgerblue,
    marginTop: 14,
  },
  frameParent2: {
    width: 272,
    marginTop: 32,
  },
  frameContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  frameParent: {
    marginTop: 26,
  },
  generalParent: {
    borderRadius: Border.br_xs,
    backgroundColor: Color.colorPalegoldenrod,
    height: 538,
    paddingTop: Padding.p_5xl,
    paddingBottom: 50,
    marginTop: 34,
    alignItems: "center",
  },
  settingsParent: {
    top: 160,
    alignItems: "center",
    left: 24,
    position: "absolute",
  },
  settings: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height: 800,
    backgroundColor: Color.colorWhite,
  },
});

export default Settings;
