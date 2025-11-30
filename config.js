const config = require("./package.json").projectConfig;

module.exports = {
    mongoConfig: {
        connectionUrl: config.mongoConnectionUrl,
        database: "FoodDeliveryDemo",
        collections: {
            USERS: "users",
            RESTAURANTS: "restaurants",
            CARTS: "carts",
            FOODS: "foods",
            BOOKMARKS: "bookmarks",
            ORDERS: "orders",
        }
    },
    serverConfig: {
        ip: config.serverIp,
        port: config.serverPort
    },
    tokenSecret: "fooddelivery_secret",
}