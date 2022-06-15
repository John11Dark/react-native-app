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
    marginVertical: 10,
  },
  containerFlexRow: {
    width: "90%",
    height: "30%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  heroImage: {
    width: "90%",
    height: 300,
    alignSelf: "center",
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
    transform: [{ translateY: 100 }],
    alignItems: "center",
    justifyContent: "space-around",
    height: "30%",
  },
  mainLogo: {
    width: 300,
    height: 150,
  },
  ErrorMessage: {
    color: customProps.importantIconColor,
    fontFamily: customProps.font.fontFamily,
    fontSize: 20,
  },
  primaryText: {
    fontFamily: customProps.font.fontFamily,
    color: customProps.primaryColorLight,
    fontWeight: "bold",
    fontSize: customProps.primaryTextFontSize,
  },
  secondaryTextHeroSection: {
    fontFamily: customProps.font.fontFamily,
    color: customProps.primaryColorLight,
    fontWeight: "bold",
    fontSize: 35,
  },

  secondaryText: {
    fontFamily: customProps.font.fontFamily,
    color: customProps.primaryColorLight,
    textTransform: "capitalize",
    fontSize: 20,
  },
  containerFlexRowLinks: {
    position: "absolute",
    bottom: 35,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
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
