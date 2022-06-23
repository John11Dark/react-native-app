import { StyleSheet } from "react-native";
import customProps from "../customProps";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customProps.primaryColorDark,
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%",
    width: "100%",
    paddingVertical: 30,
  },
  primaryImage: {
    width: "100%",
    height: "90%",
    alignSelf: "center",
    marginVertical: 10,
    marginRight: 15,
  },
  containerFlexRow: {
    width: "65%",
    height: "22%",
    transform: [{ translateY: -50 }],
    alignItems: "center",
    justifyContent: "space-between",
  },
  secondaryContainerPadding: {
    padding: 10,
    height: 75,
    justifyContent: "space-between",
  },
  containerFlexRow: {
    width: "65%",
    height: "22%",
    transform: [{ translateY: -50 }],
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroImage: {
    width: "90%",
    height: 265,
    alignSelf: "center",
  },
  heroImageVertical: {
    width: "95%",
    height: 310,
    top: 30,
    alignSelf: "flex-end",
  },
  inputContinuer: {
    padding: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: "95%",
  },
  linkText: {
    color: customProps.primaryColor,
    fontWeight: "600",
    textTransform: "capitalize",
    fontSize: 20,
  },
  linkTextPrimary: {
    margin: 30,
    textAlign: "right",
  },
  primaryTextHeroSection: {
    color: customProps.primaryColorLight,
    fontWeight: "bold",
    fontSize: 50,
    marginLeft: 25,
    transform: [{ translateY: -20 }],
    fontFamily: customProps.font.fontFamily,
  },
  containerFlexColumn: {
    transform: [{ translateY: 150 }],
    alignItems: "center",
    justifyContent: "space-around",
    height: "30%",
  },
  mainLogo: {
    width: "95%",
    height: "60%",
  },
  mainLogoHeroSection: {
    width: "90%",
    height: "50%",
  },
  ErrorMessage: {
    color: customProps.importantIconColor,
    fontFamily: customProps.font.fontFamily,
    fontSize: 25,
    padding: 5,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  primaryText: {
    fontFamily: customProps.font.fontFamily,
    color: customProps.primaryColor,
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 20,
    textAlign: "center",
  },
  secondaryTextHeroSection: {
    fontFamily: customProps.font.fontFamily,
    color: customProps.primaryColorLight,
    fontWeight: "bold",
    fontSize: 35,
    padding: 10,
  },

  secondaryText: {
    fontFamily: customProps.font.fontFamily,
    color: customProps.primaryColorLight,
    fontSize: 20,
    textTransform: "capitalize",
  },
  secondaryTextGray: {
    fontFamily: customProps.font.fontFamily,
    color: customProps.primaryColorLightGray,
    fontSize: 20,
    lineHeight: 28,
    padding: 10,
    paddingTop: 0,
    fontWeight: "400",
  },
  containerFlexRowLinks: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    margin: 30,
    top: 20,
  },
  containerFlexRowLinksAbsolute: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    margin: 30,
    top: 50,
  },

  innerText: {
    fontFamily: customProps.font.fontFamily,
    fontSize: customProps.innerTextFontSize,
  },
  innerPrimaryText: {
    color: customProps.primaryColor,
  },
  innerSecondaryText: {
    fontFamily: customProps.font.fontFamily,

    color: customProps.secondaryColor,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: 250,
    padding: 5,
    margin: 15,
  },
  primaryButton: {},
});

export default Styles;
