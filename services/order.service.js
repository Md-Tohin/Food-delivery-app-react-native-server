const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");

const placeOrder = async ({ username, items, totalAmount }) => {
  try {
    const orderData = {
      username,
      items,
      totalAmount,
      status: "Pending",
      orderDate: new Date(),
    };

    let insertOrder = await MongoDB.db
      .collection(mongoConfig.collections.ORDERS)
      .insertOne(orderData);

    if (insertOrder.insertedId) {
      return {
        status: true,
        message: "Order Placed Successfully",
        order: {
          id: insertOrder.insertedId,
          ...orderData,
        }
      };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: "Order Failed!" };
  }
};

const getOrders = async ({ username }) => {
  try {
    console.log("user name", username);
    
    let orders = await MongoDB.db
      .collection(mongoConfig.collections.ORDERS)
      .find({ username })
      .toArray();

    return {
      status: true,
      message: "Orders fetched successfully",
      data: orders,
    };
  } catch (error) {
    console.log(error);
    return { status: false, message: "Orders fetch failed!" };
  }
};

module.exports = { placeOrder, getOrders };