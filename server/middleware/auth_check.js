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
  res.locals.can_create_any_user = true;
  //will help to let know is it create request from Sign up(role=employee) or from admin want to create user.
  const requestedRoute = req.originalUrl
    .replace("/api/", "")
    .split("/")
    .slice(0, 2)
    .join("/"); //filtering main route(such as: user/update from api/user/update/123) from full route
  console.log(requestedRoute);

  console.log("req.originalUrl:", req.originalUrl.replace("/api/", ""));
  console.log(token);

  if (!token) {
    if (requestedRoute === "user/create") {
      res.locals.can_create_any_user = false;
      return next();
    }
    return res.status(403).json({
      success: false,
      message: "No token found.",
    });
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);
  const user = await User.findById(decoded._id).populate({
    path: "role",
  });

  if (!user || !user.role.permissions.includes(requestedRoute)) {
    //checking do user have the permission for their requested API

    if (requestedRoute === "user/create") {
      //this flag will tell controller this is a sign up req who is not a user of system.
      res.locals.can_create_any_user = false;
    } else {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to perform this action.",
      });
    }
  }

  res.locals.requestedUser = { role: user.role.role_name, _id: user._id }; //sending some info to the controllers
  next();
};

module.exports = { haveAccess };
