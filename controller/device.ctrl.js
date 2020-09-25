var Device = require("../model/device.model.js");
const moment = require("moment");

exports.createThermometer = (req, res) => {
    const { temperature } = req.body;
    if (!temperature) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const device = new Device({ temperature });

    Device.postThermometer(device.thermometer, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while adding thermometer data."
        });
        else res.json({ data });
    });
};

exports.createBlood = (req, res) => {
  const { diastolic, systolic } = req.body;
  if (!diastolic || !systolic) {
      res.status(400).send({
          message: "Content can not be empty!"
      });
  }

  const device = new Device({ diastolic, systolic });

  Device.postBlood(device.blood, (err, data) => {
    if (err)
    res.status(500).send({
        message:
        err.message || "Some error occurred while adding blood data."
    });
    else res.json({ data });
  });
};

exports.createOximeter = (req, res) => {
  const { sp02, pulse_rate } = req.body;
  if (!sp02 || !pulse_rate) {
      res.status(400).send({
          message: "Content can not be empty!"
      });
  }

  const device = new Device({ sp02, pulse_rate });

  Device.postOximeter(device.oximeter, (err, data) => {
    if (err)
    res.status(500).send({
        message:
        err.message || "Some error occurred while adding blood data."
    });
    else res.json({ data });
  });
};

exports.findByDate = (req, res) => {
    const { date, type = '' } = req.params;
    const { order = 'date desc' } = req.query;
    const isValid = moment(date, 'YYYY-MM-DD', true).isValid();
    if (!date && !isValid && !type) {
        res.status(400).send({
            message: "Can not be empty, date should be in YYYY-MM-DD and type should be correct!"
        });
    }
    Device.getByDate(date, order, type, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving data."
        });
        else res.json({ data });
    });
};

exports.findSummaryByDate = (req, res) => {
  const { date, type = '' } = req.params;
  const { order = 'date desc' } = req.query;
  const isValid = moment(date, 'YYYY-MM-DD', true).isValid();
  if (!date && !isValid && !type) {
      res.status(400).send({
          message: "Can not be empty and date should be in YYYY-MM-DD!"
      });
  }
  Device.getSummaryByDate(date, order, type, (err, data) => {
      if (err)
      res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving data."
      });
      else res.json({ data });
  });
};
