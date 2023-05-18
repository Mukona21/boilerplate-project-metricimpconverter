const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  // #1
  test("Convert a valid input such as 10L: GET request to /api/convert.", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end((err, res) => {
        assert.strictEqual(res.body.initNum, 10);
        assert.strictEqual(res.body.initUnit, "L");
        assert.strictEqual(
          res.body.returnNum,
          parseFloat((10 / 3.78541).toFixed(5))
        );
        assert.strictEqual(res.body.returnUnit, "gal");
        assert.strictEqual(
          res.body.string,
          "10 liters converts to 2.64172 gallons"
        );
        done();
      });
  });

  // #2
  test("Convert an invalid input such as 32g: GET request to /api/convert.", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((err, res) => {
        assert.strictEqual(res.body, "invalid unit");
        done();
      });
  });

  // #3
  test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end((err, res) => {
        assert.strictEqual(res.body, "invalid number");
        done();
      });
  });

  // #4
  test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end((err, res) => {
        assert.strictEqual(res.body, "invalid number and unit");
        done();
      });
  });

  // #5
  test("Convert with no number such as kg: GET request to /api/convert.", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end((err, res) => {
        assert.strictEqual(res.body.initNum, 1);
        assert.strictEqual(res.body.initUnit, "kg");
        assert.strictEqual(res.body.returnNum, 2.20462);
        assert.strictEqual(res.body.returnUnit, "lbs");
        assert.strictEqual(
          res.body.string,
          "1 kilograms converts to 2.20462 pounds"
        );
        done();
      });
  });
});
