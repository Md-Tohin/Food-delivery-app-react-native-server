var express = require("express");
var router = express.Router();

const { placeOrder, getOrders } = require("../services/order.service");

router.get("/", async (req, res) => {
  let username = req?.username;
  let response = await getOrders({ username });
  res.json(response);
});

router.post("/", async (req, res) => {
  let username = req?.username;
  let { items, totalAmount } = req.body;

  let response = await placeOrder({ username, items, totalAmount });
  res.json(response);
});

module.exports = router;