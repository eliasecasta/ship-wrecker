import $ from "jquery";
// import regeneratorRuntime from "regenerator-runtime";
import "regenerator-runtime/runtime.js";

// export function getScores() {
// let settings = {
//   url:
//     "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/xqMJNqqBSt2kP4jkYOVq/scores",
//   method: "GET",
//   timeout: 0,
// };

// $.ajax(settings).done(function (response) {
//     console.log(response);
// });
// }

export const getScores = async () => {
  let API =
    "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/xqMJNqqBSt2kP4jkYOVq/scores";

  let response = "";
  let leaderboard;

  try {
    response = await fetch(API);

    if (response.ok === false) {
      throw Error("Something went wrong with the Score API");
    }

    leaderboard = await response.json();
  } catch (error) {
    API =
      "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/xqMJNqqBSt2kP4jkYOVq/scores";
    response = await fetch(API);
    leaderboard = await response.json();
  }

  return leaderboard;
};

export const setScore = async (playerNameScore) => {
  let API =
    "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/xqMJNqqBSt2kP4jkYOVq/scores";

  let response = "";
  let leaderboard;

  const settings = {
    method: "POST",
    body: JSON.stringify(playerNameScore),
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    response = await fetch(API, settings);

    if (response.ok === false) {
      throw Error("Player name is of an incorrect format");
    }

    leaderboard = await response.json();
  } catch (error) {
    API =
      "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/xqMJNqqBSt2kP4jkYOVq/scores";
    response = await fetch(API);
    leaderboard = await response.json();
  }

  return leaderboard;
};
