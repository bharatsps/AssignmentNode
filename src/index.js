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

app.get("/customers/list", async (req, res) => {
  const param = req.query.filter;
  const getCustomerdata = await Service.getCustomersList(req, res, param);
  res
    .status(201)
    .json({ status: 200, message: "success", data: getCustomerdata });
});

app.get("/customers", async (req, res) => {
  const param = req.query;
  const getCustomers = await Service.getCustomers(req, res, param);
  res.status(201).json({ status: 200, message: "success", data: getCustomers });
});
