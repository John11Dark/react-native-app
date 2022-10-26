// const DIVISIONS = [
//   { amount: 60, name: "seconds" },
//   { amount: 60, name: "minutes" },
//   { amount: 24, name: "hours" },
//   { amount: 7, name: "days" },
//   { amount: 4.34524, name: "weeks" },
//   { amount: 12, name: "months" },
//   { amount: Number.POSITIVE_INFINITY, name: "years" },
// ];
// const RELATIVE_DATE_FORMATTER = new Intl.RelativeTimeFormat(undefined, {
//   numeric: "auto",
// });
// function formatRelativeDate(toDate, fromDate = new Date()) {
//   let duration = (toDate - fromDate) / 1000;

//   for (let i = 0; i <= DIVISIONS.length; i++) {
//     const division = DIVISIONS[i];
//     if (Math.abs(duration) < division.amount) {
//       return RELATIVE_DATE_FORMATTER.format(
//         Math.round(duration),
//         division.name
//       );
//     }
//     duration /= division.amount;
//   }
// }
// export default {
//   formatRelativeDate,
// };

const Today = new Date();
const hours = Today.getHours();

function greeting(userInitialDate) {
  let greet = "Good Morning";
  //TODO: Need to arrange welcome to app
  if (userInitialDate <= Today)
    return (greet = "Welcome to dolphin pools app!");
  if (hours >= 12 && hours <= 17) return (greet = "Good Afternoon");
  if (hours >= 17 && hours <= 24) return (greet = "Good Evening");
  return greet;
}

export default {
  greeting,
};
