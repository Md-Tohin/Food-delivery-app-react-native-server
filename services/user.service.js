const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");

const getUserData = async (username) => {
  try {
    console.log(username);
    let userObject = await MongoDB.db
      .collection(mongoConfig.collections.USERS)
      .findOne({ username });

    if (userObject) {
      return {
        status: true,
        message: "User found successfully",
        data: userObject,
      };
    } else {
      return {
        status: false,
        message: "No user found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "User finding failed",
      error: `User finding failed : ${error?.message}`,
    };
  }
};

const getUserDetails = async (username) => {
  try {
    console.log(username);
    
    let user = await MongoDB.db
      .collection(mongoConfig.collections.USERS)
      .findOne({ username });
    console.log(user);
    
    if (!user) {
      return { status: false, message: "User not found" };
    }
    return {
      status: true,
      message: "User fetched",
      data: user,
    };
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

module.exports = { getUserData,  getUserDetails};
