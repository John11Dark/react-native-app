//   /*
//     <AppFormField
//             autoCapitalize="none"
//             autoCorrect={false}
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             onChangeText={(poolPerimeterValue) =>
//               setPoolPerimeter(poolPerimeterValue)
//             }
//             value={poolPerimeter}
//             placeholder="ex: 23"
//             title="Pool Perimeter"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             autoCorrect={false}
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             placeholder="ex: 23"
//             title="Coping Perimeter"
//             onChangeText={(poolCopingPerimeterValue) =>
//               setPoolCopingPerimeter(poolCopingPerimeterValue)
//             }
//             value={poolCopingPerimeter}
//           />
//     // Animation State

//             <AppForm
//           initialValues={{
//             email: values.email,
//             clientPhoneNumber: values.clientPhoneNumber,
//             clientFirstName: values.clientFirstName,
//             clientLastName: values.clientLastName,
//             streetLineOne: values.address.streetLineOne,
//             streetLineTwo: values.address.streetLineTwo,
//             locality: values.address.locality,
//             status: values.status,
//             indoor: values.indoor,
//             poolSteps: values.poolSteps,
//             // option pickers
//             projectType: values.projectType,
//             poolType: values.poolType,
//             poolLocation: values.poolLocation,
//             optionalPackages: [],
//             // number of options
//             numberOfWallInlets: values.numberOfWallInlets
//               ? values.numberOfWallInlets.toString()
//               : "0",
//             numberOfSkimmers: values.numberOfSkimmers
//               ? values.numberOfSkimmers.toString()
//               : "0",
//             numberOfSumps: values.numberOfSumps
//               ? values.numberOfSumps.toString()
//               : "0",
//             numberOfLights: values.numberOfLights
//               ? values.numberOfLights.toString()
//               : "0",
//             spaJets: values.spaJets ? values.spaJets.toString() : "0",
//             counterCurrent: values.counterCurrent
//               ? values.counterCurrent.toString()
//               : "0",
//             vacuumPoints: values.vacuumPoints
//               ? values.vacuumPoints.toString()
//               : "0",
//           }}
//           //onSubmit={handleSubmit}
//           validationSchema={validationSchema}
//         >
//           <AppFormField
//             autoCapitalize="words"
//             autoCorrect={false}
//             textContentType="name"
//             name="clientFirstName"
//             title={"Client First Name"}
//             editable={edit}
//             defaultValue={values.clientFirstName}
//             clearButtonMode="while-editing"
//             style={{ padding: 5 }}
//             icon="email"
//           />

//           <AppFormField
//             autoCapitalize="words"
//             autoCorrect={false}
//             textContentType="name"
//             name="clientLastName"
//             title="Client Last Name"
//             editable={edit}
//             defaultValue={values.clientLastName}
//             clearButtonMode="while-editing"
//             style={{ padding: 5 }}
//             icon="email"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             autoCorrect={false}
//             icon="email"
//             keyboardType="email-address"
//             name="email"
//             textContentType="emailAddress"
//             title="Email Address"
//             editable={edit}
//             defaultValue={values.email}
//             clearButtonMode="while-editing"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             autoCorrect={false}
//             icon="cellphone"
//             name="clientPhoneNumber"
//             keyboardType="numeric"
//             textContentType="telephoneNumber"
//             title="Phone Number"
//             editable={edit}
//             defaultValue={values.clientPhoneNumber}
//             clearButtonMode="while-editing"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             autoCorrect={false}
//             icon="map"
//             name="streetLineOne"
//             textContentType="streetAddressLine1"
//             editable={edit}
//             defaultValue={values.clientAddressStreetOne}
//             clearButtonMode="while-editing"
//             title="Street Address "
//           />
//           <AppFormField
//             autoCapitalize="none"
//             autoCorrect={false}
//             icon="map"
//             name="streetLineTwo"
//             textContentType="streetAddressLine2"
//             placeholder="Street address Line 2"
//             editable={edit}
//             defaultValue={values.clientAddressStreetTow}
//             clearButtonMode="while-editing"
//             title="Street address Line 2"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             autoCorrect={false}
//             icon="map"
//             name="locality"
//             textContentType="addressCity"
//             title="Locality"
//             editable={edit}
//             defaultValue={values.clientAddressLocality}
//             clearButtonMode="while-editing"
//           />

//           <CheckBox
//             name="indoor"
//             placeholder="indoor"
//             choiceOne="Yes"
//             choiceTwo="No"
//             onPress={setPoolIndoorValue}
//             selected={indoor}
//             disabled={edit}
//           />
//           <CheckBox
//             name="mosaicOrTile"
//             placeholder="Mosaic or Tile"
//             choiceOne="Mosaic"
//             choiceTwo="Tile"
//             onPress={setPoolTileValue}
//             selected={poolTile}
//             disabled={edit}
//           />
//           <CheckBox
//             name="poolSteps"
//             placeholder="Pool Steps"
//             choiceOne="Yes"
//             choiceTwo="No"
//             onPress={setPoolStepsValue}
//             selected={poolSteps}
//             disabled={edit}
//           />
//           <CheckBox
//             name="poolLeaking"
//             placeholder="Pool Leaking"
//             choiceOne="Yes"
//             choiceTwo="No"
//             onPress={setPoolLeakingValue}
//             selected={poolLeaking}
//             disabled={edit}
//           />

//           {/* pool calculation input  */}
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             clearButtonMode="while-editing"
//             autoCorrect={false}
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             defaultValue={
//               values.poolLength ? values.poolLength.toString() : "0"
//             }
//             onChangeText={(lengthValue) => setPoolLength(lengthValue)}
//             placeholder="ex: 23"
//             title="pool Length"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             clearButtonMode="while-editing"
//             autoCorrect={false}
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             defaultValue={values.poolWidth ? values.poolWidth.toString() : "0"}
//             onChangeText={(widthValue) => setPoolWidth(widthValue)}
//             placeholder="ex: 23"
//             title="Pool Width"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={
//               values.poolDepthStart ? values.poolDepthStart.toString() : "0"
//             }
//             clearButtonMode="while-editing"
//             autoCorrect={false}
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             onChangeText={(DepthStartValue) =>
//               setPoolDepthStart(DepthStartValue)
//             }
//             placeholder="ex: 23"
//             title="Pool Depth Start"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={
//               values.poolDepthEnd ? values.poolDepthEnd.toString() : "0"
//             }
//             clearButtonMode="while-editing"
//             autoCorrect={false}
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             onChangeText={(depthEndValue) => setPoolDepthEnd(depthEndValue)}
//             placeholder="ex: 23"
//             title="Pool Depth End"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={
//               values.poolPerimeter ? values.poolPerimeter.toString() : "0"
//             }
//             clearButtonMode="while-editing"
//             autoCorrect={false}
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             onChangeText={(poolPerimeterValue) =>
//               setPoolPerimeter(poolPerimeterValue)
//             }
//             placeholder="ex: 23"
//             title="Pool Perimeter"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={
//               values.poolCopingPerimeter
//                 ? values.poolCopingPerimeter.toString()
//                 : "0"
//             }
//             clearButtonMode="while-editing"
//             autoCorrect={false}
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             placeholder="ex: 23"
//             title="Coping Perimeter"
//             onChangeText={(poolCopingPerimeterValue) =>
//               setPoolCopingPerimeter(poolCopingPerimeterValue)
//             }
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={
//               values.balanceTankLength
//                 ? values.balanceTankLength.toString()
//                 : "0"
//             }
//             clearButtonMode="while-editing"
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             placeholder="ex: 23"
//             title="Balance Tank Length"
//             onChangeText={(poolBalanceTank) =>
//               setPoolBalanceTankLength(poolBalanceTank)
//             }
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={
//               values.balanceTankWidth ? values.balanceTankWidth.toString() : "0"
//             }
//             clearButtonMode="while-editing"
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             placeholder="ex: 23"
//             onChangeText={(balanceTankWidthValue) =>
//               setBalanceTankWidth(balanceTankWidthValue)
//             }
//             title="Balance Tank Width"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={
//               values.balanceTankDepth ? values.balanceTankDepth.toString() : "0"
//             }
//             clearButtonMode="while-editing"
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             placeholder="ex: 23"
//             onChangeText={(BalanceTankDepthValue) =>
//               setBalanceTankDepth(BalanceTankDepthValue)
//             }
//             title="Balance Tank Depth"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={
//               values.balanceTankPipe ? values.balanceTankPipe.toString() : "0"
//             }
//             clearButtonMode="while-editing"
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             placeholder="ex: 23"
//             onChangeText={(BalanceTankPipeValue) =>
//               setBalanceTankPipe(BalanceTankPipeValue)
//             }
//             title="Balance Tank Pipe"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={
//               values.numberOfWallInlets
//                 ? values.numberOfWallInlets.toString()
//                 : "0"
//             }
//             clearButtonMode="while-editing"
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             placeholder="ex: 23"
//             name="numberOfWallInlets"
//             onChangeText={(numberOfWallInletsValue) =>
//               setNumberOfWallInlets(numberOfWallInletsValue)
//             }
//             title="No. of Wall inlets"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={
//               values.numberOfSumps ? values.numberOfSumps.toString() : "0"
//             }
//             clearButtonMode="while-editing"
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             placeholder="ex: 23"
//             name="numberOfSumps"
//             onChangeText={(numberOfSumpsValue) =>
//               setNumberOfSumps(numberOfSumpsValue)
//             }
//             title="No. of Sumps"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={
//               values.numberOfSkimmers ? values.numberOfSkimmers.toString() : "0"
//             }
//             clearButtonMode="while-editing"
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             placeholder="ex: 23"
//             name="numberOfSkimmers"
//             onChangeText={(numberOfSkimmersValue) =>
//               setNumberOfSkimmers(numberOfSkimmersValue)
//             }
//             title="No. of skimmers"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={
//               values.numberOfLights ? values.numberOfLights.toString() : "0"
//             }
//             clearButtonMode="while-editing"
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             placeholder="ex: 23"
//             name="numberOfLights"
//             onChangeText={(numberOfLightsValue) =>
//               setNumberOfLights(numberOfLightsValue)
//             }
//             title="No. of Lights"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={values.spaJets ? values.spaJets.toString() : "0"}
//             clearButtonMode="while-editing"
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             placeholder="ex: 23"
//             name="spaJets"
//             onChangeText={(spaJetsValue) => setSpaJets(spaJetsValue)}
//             title="No. of Spa Jets"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={
//               values.counterCurrent ? values.counterCurrent.toString() : "0"
//             }
//             clearButtonMode="while-editing"
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             placeholder="ex: 23"
//             name="counterCurrent"
//             onChangeText={(counterCurrentValue) =>
//               setCounterCurrent(counterCurrentValue)
//             }
//             title="Counter Current"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={
//               values.vacuumPoints ? values.vacuumPoints.toString() : "0"
//             }
//             clearButtonMode="while-editing"
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             placeholder="ex: 23"
//             name="vacuumPoints"
//             onChangeText={(vacuumPointsValue) =>
//               setVacuumPoints(vacuumPointsValue)
//             }
//             title="Vacuum points"
//           />

//           <AppFormField
//             autoCapitalize="none"
//             editable={edit}
//             defaultValue={
//               values.poolVolume ? values.poolVolume.toString() : "0"
//             }
//             clearButtonMode="while-editing"
//             keyboardType="decimal-pad"
//             icon="move-resize-variant"
//             onChangeText={(volumeValue) => setPoolVolume(volumeValue)}
//             title="Pool Volume"
//           />

//           <AppFormField
//             autoCapitalize="none"
//             editable={!edit}
//             defaultValue={values.Price ? values.Price.toString() : "5500"}
//             clearButtonMode="while-editing"
//             keyboardType="decimal-pad"
//             icon="currency-eur"
//             onChangeText={(volumeValue) => setPoolVolume(volumeValue)}
//             title="Price"
//           />

//           <AppFormField
//             autoCapitalize="sentences"
//             editable={edit}
//             defaultValue={
//               values.description
//                 ? values.description
//                 : "Type a description or extra remarks"
//             }
//             clearButtonMode="while-editing"
//             autoCorrect
//             name="description"
//             placeholder="Type a description or extra remarks"
//             title="Description"
//             numberOfLines={5}
//             multiline
//           />

//           <SubmitButton
//             title="Save"
//             visible={edit}
//             iconName="content-save-check"
//           />
//         </AppForm>

// const styles = StyleSheet.create({
//   primaryContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//   },
//   marginBottom: {
//     paddingBottom: 50,
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "#ecf0f1",
//     padding: 8,
//   },
//   primaryText: {
//     textAlign: "center",
//     fontSize: 50,
//     fontWeight: "900",
//     padding: 5,
//     color: Styles.colors.secondaryColor,
//   },
//   DateContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderColor: Styles.colors.primaryColorLight,
//     borderWidth: 1.5,
//     padding: 5,
//     borderRadius: 5,
//     width: "100%",
//   },
//     images: Yup.array()
//   .min(1, "Please select at least on image")
//   .max(3, "The maximum is three images"),
//   description: Yup.string().label("Description"),
//   dateText: {
//     fontSize: Styles.colors.innerTextFontSize,
//     color: Styles.colors.primaryColorLightGray,
//     textAlign: "left",
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   flexRow: {
//     flexDirection: "row",
//     width: "100%",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
// });
