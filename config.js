const config = require("./package.json").projectConfig;

module.exports = {
    mongoConfig: {
        connectionUrl: config.mongoConnectionUrl,
        database: "FoodDeliveryDemo",
        Collections: {
            USERS: "users"
        }
    },
    serverConfig: {
        ip: config.serverIp,
        port: config.serverPort
    }
}