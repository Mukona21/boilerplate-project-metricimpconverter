function ConvertHandler() {
  this.getNum = function(input) {
    let result;
    const regex = /[a-z]/i;
    const fractionRegex = /[/]/g;

    const index = input.indexOf(input.match(regex));

    if (index === 0) {
      result = 1;
    } else {
      result = input.split("", index).join("");

      const fractionChecker = fractionRegex.test(result);
      if (fractionChecker === true) {
        const doubleFractionMatch = result.match(fractionRegex);
        if (doubleFractionMatch.length !== 1) {
          result = "Invalid Number";
        } else {
          result = parseFloat(result);
        }
      } else {
        result = parseFloat(result);
      }
    }
    return result;
  };

  this.getUnit = function(input) {
    let result;
    const regex = /[a-z]/i;
    const index = input.indexOf(input.match(regex));
    result = input.slice(index, input.length).toLowerCase();
    const unitBank = ["gal", "l", "mi", "km", "lbs", "kg"];
    if (unitBank.includes(result)) {
      if (result === "l") {
        result = "L";
      }
      return result;
    } else {
      return "Invalid Unit";
    }
  };

  this.getReturnUnit = function(initUnit) {
    const initialUnit = initUnit.toLowerCase();
    switch (initialUnit) {
      case "mi":
        return "km";
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "l":
        return "gal";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default:
        return "Invalid Unit";
    }
  };

  this.spellOutUnit = function(unit) {
    const initialUnit = unit.toLowerCase();
    switch (initialUnit) {
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "l":
        return "liters";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      default:
        return "Invalid Unit";
    }
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = null;
    const initialUnit = initUnit.toLowerCase();
    switch (initialUnit) {
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
    }
    if (result !== null) {
      result = parseFloat(result.toFixed(5));
    }
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return (
      initNum +
      " " +
      this.spellOutUnit(initUnit) +
      " converts to " +
      returnNum.toFixed(5) +
      " " +
      this.spellOutUnit(returnUnit)
    );
  };
}

module.exports = ConvertHandler;
