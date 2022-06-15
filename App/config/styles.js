import customProps from "./customProps";

export default {
  colors: customProps,
  text: {
    color: customProps.primaryColorDark,
    ...Platform.select({
      ios: {
        fontSize: 18,
        fontFamily: "Avenir",
      },
      android: {
        fontSize: 16,
        fontFamily: "Roboto",
      },
    }),
  },
  formField: {
    alignItems: "center",
    backgroundColor: customProps.primaryColorLight,
    borderColor: "#ddd",
    borderRadius: 50,
    borderWidth: 1,
    marginVertical: 6,
    overflow: "hidden",
  },
};
