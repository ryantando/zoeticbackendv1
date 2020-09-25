module.exports = app => {
    const device = require("../controller/device.ctrl.js");
  
    app.post("/device/thermometer", device.createThermometer);
    app.post("/device/blood", device.createBlood);
    app.post("/device/oximeter", device.createOximeter);

    app.get("/device/:date/:type", device.findByDate);
    app.get("/device/:date/:type/summary", device.findSummaryByDate);
  };