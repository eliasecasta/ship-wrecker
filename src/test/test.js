var expect = require("chai").expect;
import { getScores, setScore } from "../Config/scoresApi";

describe("Array", function () {
  describe("Scores API", function () {
    it("Get public API Scores", async () => {
      const result = await getScores();
      const response = { user: "e71az", score: 30 };
      expect(result[0]).to.deep.equal(response);
    });

    it("If no name value sent, setScore should be undefined", async () => {
      const score = "";
      const result = await setScore(score);
      expect(result[0]).to.deep.equal(undefined);
    });

    it("Get public API Scores", async () => {
      const score = { user: "e71az", score: 30 };
      const result = await setScore(score);

      expect(result.result).to.deep.equal(
        "Leaderboard score created correctly."
      );
    });
  });
});
