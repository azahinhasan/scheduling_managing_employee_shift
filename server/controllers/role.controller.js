const Role = require("../models/role.model");
const SupervisorEmployeeRelations = require("../models/supervisor_employee_relations.model");

/**
 * @namespace RoleController
 **/

/**
 * @memberof RoleController
 * @async
 * @method
 * @description Get the list of all roles.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/role.model
 * @returns {JSON} -  if success returns the array of object as data else error.
 */
const getAllRole= async (req, res) => {
  try {
    const roles = await Role.find().select('-permissions');;
    res
      .status(200)
      .json({ success: true, message: "Data Found", data: roles });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

/**
 * @memberof RoleController
 * @async
 * @method
 * @description Create a new role.With this information they can login to the system.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/role.model
 * @returns {JSON} - if success returns the object as data else error.
 */
const createRole = async (req, res) => {
  try {
   
    const role = await Role.find({role_name:req.body.role_name}); 
    console.log(role)
    if(!role||role.length===0){
      await Role.create({role_name:req.body.role_name}); 
    }
    res
      .status(201)
      .json({ success: true, message: "Role created", data: role });
  } catch (error) {
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

module.exports = {
  getAllRole,
  createRole
};
