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

  console.log("req.originalUrl:", req.originalUrl.replace("/api/", ""));
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

  const requestedRoute = req.originalUrl
    .replace("/api/", "")
    .split("/")
    .slice(0, 2)
    .join("/"); //filtering main route(such as: user/update from api/user/update/123) from full route
  console.log(requestedRoute);
  if (!user || !user.role.permissions.includes(requestedRoute)) {
    //checking do user have the permission for their requested API
    return res.status(401).json({
      success: false,
      message: "You are not authorized to perform this action.",
    });
  }

  res.locals.requestedUser = { role: user.role.role_name, _id: user._id }; //sending some info to the controllers
  next();
};

module.exports = { haveAccess };
