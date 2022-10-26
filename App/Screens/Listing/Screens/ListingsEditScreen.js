// ? * -->  Third parties libraries
import React, { useEffect, useState } from "react";
import { Text, View, Alert } from "react-native";
import * as Yup from "yup";

// ? * -->  Project components  and configurations
import { customProps, Styles } from "../../../config";
import Functions from "../Functions/Functions";
import routes from "../../../Navigation/routes";
import {
  AppForm,
  AppFormField,
  PageIndicators,
  SubmitButton,
  Wrapper,
  CheckBox,
} from "../../../components";

// ? * --> main stack
export default function ListingEditScreen({ route, navigation }) {
  // ? * --> Variables
  const data = route?.params;
  const validationSchema = Yup.object().shape({
    poolLength: Yup.number().required().label("Pool Length"),
    poolWidth: Yup.number().required().label("Pool Width"),
    poolDepthEnd: Yup.number().notRequired().label("Pool Depth End"),
    poolDepthStart: Yup.number().required().label("Pool Depth Start"),
    //poolVolume: Yup.number().notRequired().label("Pool Volume"),
    balanceTankLength: Yup.number().notRequired().label("Balance Tank Length"),
    balanceTankWidth: Yup.number().notRequired().label("Balance Tank Width"),
    balanceTankDepth: Yup.number().notRequired().label("Balance Tank Depth"),
    //copingPerimeter: Yup.number().required().label("Coping Perimeter"),
    // poolPerimeter: Yup.number().required().label("Pool Perimeter"),
  });

  // ? * --> Functions

  /// *-->// Global Functions
  const { calculatePoolVolume, calculatePoolPerimeter } = Functions;

  /// *-->// Next page
  const next = (values, { resetForm }) => {
    values.totalVolume = totalVolumeState.toString();
    values.poolVolume = poolVolume.toString();
    values.balanceTankVolume = balanceTankVolume.toString();
    const newData = { ...data, ...values };
    if (balanceTankVolume === 0 && !data.poolType)
      return Alert.alert(
        "Balance Tank Volume",
        "balance tank volume can not be zero please check you inputs or reenter the pool volume again and do not modify the balance tank to be default to 20% of the pool"
      );

    if (
      !data.poolType &&
      balanceTankVolume?.toString()?.includes("20% of pool volume") &&
      (poolBalanceTankLength === 0 || poolBalanceTankLength == null) &&
      (balanceTankWidth === 0 || balanceTankWidth == null) &&
      (balanceTankDepth === 0 || balanceTankDepth == null)
    )
      return Alert.alert(
        "balance Tank Volume",
        "Balance tank volume did not receive any parameters so it defaults to 20% of pool volume\n do you want  to proceed? ",
        [
          {
            text: "yes",
            style: "destructive",
            onPress: navigation.navigate("Options", newData),
          },
          {
            text: "No",
            style: "cancel",
          },
        ]
      );

    navigation.navigate(routes.LISTING_EDIT_OPTIONS, newData);
    resetForm();
  };

  // ? * -->  States

  ///*--> Application states
  const [error, setError] = useState(false);
  const [optionOne, setOptionOne] = useState(false);
  const [optionTwo, setOptionTwo] = useState(false);
  const [optionThree, setOptionThree] = useState(false);
  const [optionFour, setOptionFour] = useState(false);
  const [optionFive, setOptionFive] = useState(false);

  ///  *-->// Pool parameters states
  const [poolLength, setPoolLength] = useState("");
  const [poolWidth, setPoolWidth] = useState("");
  const [poolDepthStart, setPoolDepthStart] = useState("");
  const [poolDepthEnd, setPoolDepthEnd] = useState("");
  const [poolVolume, setPoolVolume] = useState(0);
  const [totalVolumeState, setTotalVolume] = useState(0);
  const [poolPerimeter, setPoolPerimeter] = useState("");
  const [poolCopingPerimeter, setPoolCopingPerimeter] = useState("");

  ///  *-->// balance tank parameters states
  const [poolBalanceTankLength, setPoolBalanceTankLength] = useState("");
  const [balanceTankWidth, setBalanceTankWidth] = useState("");
  const [balanceTankDepth, setBalanceTankDepth] = useState("");
  const [balanceTankVolume, setBalanceTankVolume] = useState(0);

  // ? * --> Effects
  /// *-->//  skimmer pool Effect
  useEffect(() => {
    if (data.poolType) {
      const { volume, totalVolume } = calculatePoolVolume(
        data.poolType,
        poolLength,
        poolWidth,
        poolDepthStart,
        poolDepthEnd
      );
      const { copingParameter, poolPerimeterValue } = calculatePoolPerimeter(
        poolWidth,
        poolLength
      );
      setPoolVolume(volume);
      setTotalVolume(totalVolume);
      setPoolCopingPerimeter(copingParameter);
      setPoolPerimeter(poolPerimeterValue);
    }
  }, [poolWidth, poolLength, poolDepthStart, poolDepthEnd]);

  /// *-->// overflow pool effect
  useEffect(() => {
    if (data.poolType) return;
    if (!data.poolType) {
      const { totalVolume, volume, balanceVolume } = calculatePoolVolume(
        data.poolType,
        poolWidth,
        poolLength,
        poolDepthStart,
        poolDepthEnd,
        poolBalanceTankLength,
        balanceTankWidth,
        balanceTankDepth
      );
      const { copingParameter, poolPerimeterValue } = calculatePoolPerimeter(
        poolWidth,
        poolLength
      );
      setBalanceTankVolume(balanceVolume);
      setPoolVolume(volume);
      setTotalVolume(totalVolume);
      setPoolCopingPerimeter(copingParameter);
      setPoolPerimeter(poolPerimeterValue);
    }
  }, [
    poolWidth,
    poolLength,
    poolDepthStart,
    poolDepthEnd,
    poolBalanceTankLength,
    balanceTankWidth,
    balanceTankDepth,
  ]);

  // ? * --> main
  return (
    <>
      <PageIndicators
        title={`${
          data.newPool
            ? `New ${data.poolType ? "Skimmer" : "Overflow"}`
            : `Refurbishment ${data.poolType ? "Skimmer" : "Overflow"}`
        } Pool Quotation 📜`}
        indicatorTwo={{ id: 2, active: true, current: true, error: error }}
      />
      <Wrapper>
        <AppForm
          onSubmit={next}
          validationSchema={validationSchema}
          initialValues={{
            poolLength: "5",
            poolWidth: "5",
            poolDepthEnd: "5",
            poolDepthStart: "5",
            copingPerimeter: "",
            poolPerimeter: "",
            poolVolume: "",
            optionOne: false,
            optionTwo: false,
            optionThree: false,
          }}
        >
          <View style={Styles.inputContinuer}>
            {/* 
           // ? * -->  If Old | refurbishment pool
           */}

            {!data.newPool && (
              <>
                {/* <Text
                  style={{
                    ...customProps.font,
                    color: customProps.primaryColorLight,
                  }}
                >
                  Refurbishment pool Options
                </Text> */}
                <CheckBox
                  choiceOne={"Yes"}
                  choiceTwo={"No"}
                  name={"optionOne"}
                  placeholder={"Changes of white goods"}
                  onPress={() => setOptionOne(!optionOne)}
                  selected={optionOne}
                />
                <CheckBox
                  choiceOne={"Yes"}
                  choiceTwo={"No"}
                  name={"optionTwo"}
                  placeholder={"Removal of tile border"}
                  onPress={() => setOptionTwo(!optionTwo)}
                  selected={optionTwo}
                />
                <CheckBox
                  choiceOne={"Yes"}
                  choiceTwo={"No"}
                  name={"optionThree"}
                  placeholder={"Require pressure test "}
                  onPress={() => setOptionThree(!optionThree)}
                  selected={optionThree}
                />
              </>
            )}

            {/* 
           // ? * -->  Pool parameters
           */}
            <>
              <AppFormField
                name="poolLength"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                getValue={(value) => setPoolLength(value)}
                placeholder="ex: 23"
                title="pool Length"
              />

              <AppFormField
                name="poolWidth"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                title="Pool Width"
                getValue={(value) => setPoolWidth(value)}
              />

              <AppFormField
                name="poolDepthStart"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                getValue={(value) => setPoolDepthStart(value)}
                placeholder="ex: 23"
                title="Pool Depth Start"
              />

              <AppFormField
                name="poolDepthEnd"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                getValue={(value) => setPoolDepthEnd(value)}
                placeholder="Optional"
                title="Pool Depth End"
              />

              <AppFormField
                //  Todo: set pool volume
                // ? * -->  name="poolVolume"
                autoCapitalize="none"
                name="poolVolume"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                value={poolVolume.toString()}
                title="Pool Volume"
              />

              <AppFormField
                //  Todo: set pool coping
                // ? * -->   name="copingPerimeter"
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                value={poolCopingPerimeter.toString()}
                getValue={(value) => setPoolCopingPerimeter(value)}
                placeholder="ex: 23"
                title="Coping Perimeter"
              />
              <AppFormField
                //  Todo: set pool Perimeter
                // ? * --> name="poolPerimeter"
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                value={poolPerimeter.toString()}
                getValue={(value) => setPoolPerimeter(value)}
                placeholder="ex: 23"
                title="Pool Perimeter"
              />
            </>

            {/*
            // ? * --> Balance Tank Parameters
            if data.poolType "false" || "Overflow"?    
          */}
            {!data.poolType && (
              <>
                <AppFormField
                  name="balanceTankLength"
                  autoCapitalize="none"
                  keyboardType="decimal-pad"
                  icon="move-resize-variant"
                  placeholder="ex: 23"
                  title="Balance Tank Length"
                  getValue={(value) => setPoolBalanceTankLength(value)}
                />
                <AppFormField
                  name="balanceTankWidth"
                  autoCapitalize="none"
                  keyboardType="decimal-pad"
                  icon="move-resize-variant"
                  placeholder="ex: 23"
                  title="Balance Tank Width"
                  getValue={(value) => setBalanceTankWidth(value)}
                />
                <AppFormField
                  name="balanceTankDepth"
                  autoCapitalize="none"
                  keyboardType="decimal-pad"
                  icon="move-resize-variant"
                  placeholder="ex: 23"
                  title="Balance Tank Depth"
                  getValue={(value) => setBalanceTankDepth(value)}
                />
                <AppFormField
                  name="balanceTankVolume"
                  autoCapitalize="none"
                  keyboardType="decimal-pad"
                  icon="move-resize-variant"
                  value={balanceTankVolume.toString()}
                  title="Balance Tank Volume"
                  numberOfLines={3}
                  multiline
                  getValue={(value) => setBalanceTankVolume(value)}
                />
              </>
            )}
          </View>
          <SubmitButton title={"Next"} iconName={"page-next"} width={250} />
        </AppForm>
      </Wrapper>
    </>
  );
}

//
// balanceTankLength: Yup.lazy(() => {
//   if (!data.poolType) {
//     return Yup.number().required().label("Balance Tank Length");
//   }
//   return Yup.number().notRequired().label("Balance Tank Length");
// }),
// balanceTankWidth: Yup.lazy(() => {
//   if (!data.poolType) {
//     return Yup.number().required().label("Balance Tank Width");
//   }
//   return Yup.number().notRequired().label("Balance Tank Width");
// }),
// balanceTankDepth: Yup.lazy(() => {
//   if (!data.poolType) {
//     return Yup.number().required().label("Balance Tank Depth");
//   }
//   return Yup.number().notRequired().label("Balance Tank Depth");
// }),
// if (balanceTankVolume === 0 && !data.poolType)
//       return Alert.alert(
//         "Balance Tank Volume",
//         "balance tank volume can not be zero please check you inputs or reenter the pool volume again and do not modify the balance tank to be default to 20% of the pool"
//       );
//     if (
//       !data.poolType &&
//       balanceTankVolume.includes("20% of pool volume") &&
//       (poolBalanceTankLength === 0 || poolBalanceTankLength == null) &&
//       (balanceTankWidth === 0 || balanceTankWidth == null) &&
//       (balanceTankDepth === 0 || balanceTankDepth == null)
//     )
//       return Alert.alert(
//         "balance Tank Volume",
//         "Balance tank volume did not receive any parameters so it defaults to 20% of pool volume\n do you want  to proceed? ",
//         [
//           {
//             text: "yes",
//             style: "destructive",
//             onPress: navigation.navigate("Options", values),
//           },
//           {
//             text: "No",
//             style: "cancel",
//           },
//         ]
//       );
//     values.totalVolume = totalVolumeState;
//     values.poolVolume = poolVolume.toString();
//     values.balanceTankVolume = balanceTankVolume.toString();
