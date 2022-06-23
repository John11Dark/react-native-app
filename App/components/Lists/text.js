// // date start => *******
// const [date, setDate] = useState(new Date());
// const [mode, setMode] = useState("date");
// const [show, setShow] = useState(true);
// const [text, setText] = useState("date");

// const [poolWidth, setPoolWidth] = useState();
// const [poolDepthStart, setPoolDepthStart] = useState();
// const [poolDepthEnd, setPoolDepthEnd] = useState();
// const [poolLength, setPoolLength] = useState();
// const [poolVolume, setPoolVolume] = useState(calculateVolume());

// const onChange = (e, selectedDate) => {
//   const currentDate = selectedDate || date;
//   setShow(Platform.OS === "ios");
//   setDate(currentDate);
//   let tempDate = new Date(currentDate);
//   let formatDate = `${tempDate.getDate()}  /  ${tempDate.getMonth() + 1} / ${
//     tempDate.getFullYear
//   }`;
//   let formateTime = `Hours: ${tempDate.getHours()} | Minutes: ${tempDate.getMinutes()} | Seconds: ${tempDate.getSeconds()} `;
//   setText(`${formatDate} \ ${formateTime}`);
// };
// const showMode = (currentMode) => {
//   setShow(true);
//   setMode(currentMode);
// };

// <Text style={customProps.labelStyle}>initial Date</Text>
// <View style={styles.DateContainer}>
//   <View style={[styles.flexRow, { justifyContent: "flex-start" }]}>
//     <Icon
//       name={"calendar"}
//       backgroundColor="transparent"
//       iconColor={customProps.primaryColorLightGray}
//       innerSize={24}
//     />
//     <Text style={styles.dateText} onPress={() => showMode("date")}>
//       {initialDate}
//     </Text>
