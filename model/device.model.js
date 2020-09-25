var sql = require("./db");

const date = new Date();
// Supposed tody's date is 30 July based on the ui
const today = `2020-07-30 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

const deviceType = {
  thermometer: 'thermometer',
  blood: 'blood',
  oximeter: 'oximeter'
}

const deviceSummaryType = {
  thermometer: `truncate(avg(temperature), 1) as avgTemp`,
  blood: `truncate(avg(systolic), 0) as avgSystolic, truncate(avg(diastolic), 0) as avgDiastolic`,
  oximeter: `truncate(avg(sp02), 0) as avgSp02, truncate(avg(pulse_rate), 0) as avgPulseRate`,
}

const Device = function(device) {
  this.thermometer = {
    temperature: device.temperature,
    date: today,
    updated: today
  };
  this.blood = {
    systolic: device.systolic,
    diastolic: device.diastolic,
    date: today,
    updated: today
  };
  this.oximeter = {
    sp02: device.sp02,
    pulse_rate: device.pulse_rate,
    date: today,
    updated: today
  };
};

Device.postThermometer = (newData, result) => {
  const sql2 = sql.query("INSERT INTO thermometer SET ?", newData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newData });
  });
  console.log(sql2.sql);
};

Device.postBlood = (newData, result) => {
  sql.query("INSERT INTO blood SET ?", newData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newData });
  });
};

Device.postOximeter = (newData, result) => {
  sql.query("INSERT INTO oximeter SET ?", newData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newData });
  });
};

Device.getByDate = (date, order = 'date asc', type = '', result) => {
    const tableType = deviceType[type];
    console.log({ tableType });
    if (!tableType) {
      result(new Error('Specify correct type'), null);
      return;
    }
    const query = `select * from ${tableType} where date(date) = ? order by ?`
    const data = [date, order];
    sql.query(query, data, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
};

Device.getSummaryByDate = (date, order = 'date asc', type = '', result) => {
  const tableType = deviceType[type];
  const tableTypeQuery = deviceSummaryType[type];
  if (!tableType && !tableTypeQuery) {
    result(new Error('Specify correct type'), null);
    return;
  }
  const query = `select ${tableTypeQuery} from ${tableType} where date(date) = ? order by ?`
  const data = [date, order];
  sql.query(query, data, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res[0]);
  });
};

module.exports = Device;