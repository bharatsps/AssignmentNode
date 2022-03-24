const express = require("express");
const bodyParser = require("body-parser");
const Service = require("../src/service/index");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(201).json({ message: "done!" });
});

app.listen(8080, function () {
  console.log("Server is running on 8080");
});

/**
 * Description:Get Customers List by first_name ,last_name car_make gender  into application
 * @param {first_name last_name sort car_make limit page} req
 * @param {*} res
 * @param {*} next
 */
app.get("/customers/list", async (req, res) => {
  const param = req.query.filter;
  const getCustomerdata = await Service.getCustomersList(req, res, param);
  res
    .status(201)
    .json({ status: 200, message: "success", data: getCustomerdata });
});

/**
 * Description:Get Customers List by first_name ,last_name car_make gender  into application
 * @param {first_name last_name sort car_make limit page} req
 * @param {*} res
 * @param {*} next
 */

app.get("/customers", async (req, res) => {
  const param = req.query;
  const getCustomers = await Service.getCustomers(req, res, param);
  res.status(201).json({ status: 200, message: "success", data: getCustomers });
});
