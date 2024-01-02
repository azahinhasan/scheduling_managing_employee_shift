const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

/**
 * @namespace AuthCheckMiddleware
 */

/**
 * @memberof AuthCheckMiddleware
 * @async
 * @method
 * @description Check is user authorized or not for their requested action.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @param {function} next - next function.
 * @requires ../models/user.model
 * @requires ../config/config
 * @returns {JSON} - if user have access then will redirect to next function else unauthorized error.
 */
const haveAccess = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "No token found.",
    });
  }
  const decoded = jwt.verify(token, config.JWT_SECRET);
  const user = await User.findById(decoded._id).populate({
    path: "role",
  });
  console.log(user);
  if (!user || !user.role.permissions.includes(req.originalUrl.replace("/api/", ""))) {
    //checking do user have the permission for their requested API
    return res.status(401).json({
      success: false,
      message: "You are not authorized to perform this action.",
    });
  }
  console.log("req.originalUrl:", req.originalUrl.replace("/api/", ""));

  res.locals.requestedUser = { role: user.role.role_name, _id: user._id }; //sending some info to the controllers
  next();
};

module.exports = { haveAccess };
