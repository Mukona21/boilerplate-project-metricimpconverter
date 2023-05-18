"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    const input = req.query.input;
    const num = convertHandler.getNum(input);
    const unit = convertHandler.getUnit(input);
    const returnUnit = convertHandler.getReturnUnit(unit);
    const returnNum = convertHandler.convert(num, unit);
    const string = convertHandler.getString(num, unit, returnNum, returnUnit);

    if (num === "invalid number" && unit === "invalid unit") {
      res.json("invalid number and unit");
    } else if (num === "invalid number") {
      res.json("invalid number");
    } else if (unit === "invalid unit") {
      res.json("invalid unit");
    } else {
      res.json({
        initNum: num,
        initUnit: unit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string,
      });
    }
  });
};
