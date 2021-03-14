import { APIString } from "../Config/apiString";
import "regenerator-runtime/runtime.js";
import fetch from "node-fetch";

export const getScores = async () => {
  let API = APIString;

  let response = "";
  let leaderboard;
  try {
    response = await fetch(API);

    if (response.ok === false) {
      throw Error("Something went wrong with the Score API");
    }

    leaderboard = await response.json();
  } catch (error) {
    API = APIString;
    response = await fetch(API);
    leaderboard = await response.json();
  }

  return leaderboard.result;
};

export const setScore = async (playerNameScore) => {
  let API = APIString;
  let response = "";
  let leaderboard;

  const settings = {
    method: "POST",
    body: JSON.stringify(playerNameScore),
    headers: {
      Accept: "application/json",
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
    API = APIString;
    response = await fetch(API);
    leaderboard = await response.json();
  }

  return leaderboard;
};
