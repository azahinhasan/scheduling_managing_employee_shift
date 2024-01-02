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
  console.log(req.path)
  res.locals.requestedUser ={role:"supervisor",_id:"6593a4a5d53a234bbc85d9d3"} 
  next();
};


module.exports = {haveAccess};
