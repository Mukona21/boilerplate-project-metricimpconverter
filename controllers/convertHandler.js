function ConvertHandler() {
  this.getNum = function (input) {
    const regex = /[a-zA-Z]+$/; // Regex to match alphabetic characters at the end
    const result = input.replace(regex, ""); // Remove alphabetic characters from the end
    const numRegex = /^(?:\d+\.?\d*|\.\d+|\d+\/\d+)$/;
    
    if (!numRegex.test(result)) {
      return 1; // Default to 1 if no valid number is provided
    }
    
    if (result.includes("/")) {
      const parts = result.split("/");
      return parseFloat(parts[0]) / parseFloat(parts[1]);
    }
    
    return parseFloat(result);
  };

  this.getUnit = function (input) {
    const regex = /[a-zA-Z]+$/; // Regex to match alphabetic characters at the end
    const result = input.match(regex)[0].toLowerCase();
    
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    if (!validUnits.includes(result)) {
      return "invalid unit";
    }
    
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: "L",
      l: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };
    return unitMap[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function (unit) {
    const unitMap = {
      gal: "gallons",
      l: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
    return unitMap[unit.toLowerCase()];
  };

  this.convert = function (initNum, initUnit) {
    const conversionMap = {
      gal: 3.78541, // Gallons to liters
      l: 0.264172, // Liters to gallons
      mi: 1.60934, // Miles to kilometers
      km: 0.621371, // Kilometers to miles
      lbs: 0.453592, // Pounds to kilograms
      kg: 2.20462, // Kilograms to pounds
    };
    return initNum * conversionMap[initUnit.toLowerCase()];
  };

  this.getInvalidUnitMessage = function () {
    return "invalid unit";
  };

  this.convertHandler = function (req, res) {
    const input = req.query.input;
    const initNum = this.getNum(input);
    const initUnit = this.getUnit(input);

    if (initUnit === "invalid unit" && initNum === 1) {
      return res.send(this.getInvalidUnitMessage());
    } else if (initUnit === "invalid unit") {
      return res.send("invalid number and unit");
    } else if (initNum === 1) {
      return res.json({
        initNum,
        initUnit,
        returnNum: this.convert(initNum, initUnit),
        returnUnit: this.getReturnUnit(initUnit),
        string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${this.convert(
          initNum,
          initUnit
        )} ${this.spellOutUnit(this.getReturnUnit(initUnit))}`,
      });
    } else {
      return res.json({
        initNum,
        initUnit,
        returnNum: this.convert(initNum, initUnit),
        returnUnit: this.getReturnUnit(initUnit),
        string: `${initNum} ${this.spellOutUnit(initUnit)}s converts to ${this.convert(
          initNum,
          initUnit
        )} ${this.spellOutUnit(this.getReturnUnit(initUnit))}`,
      });
    }
  };
}

module.exports = ConvertHandler;
