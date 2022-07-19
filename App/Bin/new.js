
  /*
    <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            onChangeText={(poolPerimeterValue) =>
              setPoolPerimeter(poolPerimeterValue)
            }
            value={poolPerimeter}
            placeholder="ex: 23"
            title="Pool Perimeter"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            placeholder="ex: 23"
            title="Coping Perimeter"
            onChangeText={(poolCopingPerimeterValue) =>
              setPoolCopingPerimeter(poolCopingPerimeterValue)
            }
            value={poolCopingPerimeter}
          />
    // Animation State




const styles = StyleSheet.create({
  primaryContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  marginBottom: {
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  primaryText: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "900",
    padding: 5,
    color: Styles.colors.secondaryColor,
  },
  DateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: Styles.colors.primaryColorLight,
    borderWidth: 1.5,
    padding: 5,
    borderRadius: 5,
    width: "100%",
  },
    images: Yup.array()
  .min(1, "Please select at least on image")
  .max(3, "The maximum is three images"),
  description: Yup.string().label("Description"),
  dateText: {
    fontSize: Styles.colors.innerTextFontSize,
    color: Styles.colors.primaryColorLightGray,
    textAlign: "left",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});


