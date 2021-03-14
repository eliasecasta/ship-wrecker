var expect = require("chai").expect;
let { getScores } = require("../Config/scoresApi");

describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      expect(getScores).to.deep.equal(true);
    });
  });
});
