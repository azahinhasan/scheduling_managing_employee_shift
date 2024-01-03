const User = require("../models/user.model");
const SupervisorEmployeeRelations = require("../models/supervisor_employee_relations.model");
const Role = require("../models/role.model");
/**
 * @namespace UserController
 **/

/**
 * @memberof UserController
 * @async
 * @method
 * @description Get the list of all users.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/user.model
 * @returns {JSON} -  if success returns the array of object as data else error.
 */
const getAllUser = async (req, res) => {
  try {
    const list = await User.find();
    res
      .status(200)
      .json({ success: true, message: "Data Found Successfully", data: list });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

/**
 * @memberof UserController
 * @async
 * @method
 * @description Create a new user.With this information they can login to the system.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/user.model
 * @returns {JSON} - if success returns the object as data else error.
 */
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    user.save();
    res
      .status(201)
      .json({ success: true, message: "User created", data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @memberof UserController
 * @async
 * @method
 * @description .
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/user.model
 * @returns {JSON} - if success returns the object as data else error.
 */
const getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (!user) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Data Found Successfully", data: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

/**
 * @memberof UserController
 * @async
 * @method
 * @description .
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/user.model
 * @returns {JSON} - if success returns the object as data else error.
 */
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    console.log(res.locals.requestedUser);

    if (!user) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    const requestedUser = res.locals.requestedUser;
    if (requestedUser.role === "administrator") {
      //if administrator then he can update any info for any user.
      await User.findByIdAndUpdate(req.params.user_id, req.body);
    } else if (
      requestedUser.role === "employee" ||
      res.locals.requestedUser._id === req.params.user_id
    ) {
      //if employee or user requesting for this profile then he can update his basic info.
      console.log(req.body);
      await User.updateOne(
        { _id: req.params.user_id },
        {
          full_name: req.body.full_name,
          email: req.body.email,
          contact_details: req.body.contact_details,
        }
      );
    } else if (requestedUser.role === "supervisor") {
      //if supervisor then he can update active_status of his employees.
      const verifyEmployee = await SupervisorEmployeeRelations.find({
        supervisor_id: res.locals.requestedUser._id,
        assigned_employees_id: user._id,
      }); //checking is that user is a employee under this supervisor.

      verifyEmployee.length > 0 &&
        (await User.updateOne(
          { _id: req.params.user_id },
          {
            active_status: req.body.active_status,
          }
        ));
    }

    res.status(200).json({ success: true, message: "User updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @memberof UserController
 * @async
 * @method
 * @description Delete a user by ID.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/user.model
 * @returns {JSON} - if success returns the object(contains details of deleted user) as data else error.
 *
 */
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).populate({
      path: "role",
    });
    if (user.role.role_name === "administrator") {
      return res
        .status(400)
        .json({
          success: false,
          message: "Administrator account can not be deleted",
        });
    }
    await User.findByIdAndDelete(req.params.user_id);
    res
      .status(200)
      .json({ success: true, message: "User deleted", data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @memberof UserController
 * @async
 * @method
 * @description Delete a user by ID.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/user.model
 * @returns {JSON} - if success returns the object(contains details of deleted user) as data else error.
 *
 */
const changeUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).populate({
      path: "role",
    });
    const roles = await Role.find();
    if (user.role.role_name === "administrator") {
      return res.status(400).json({
        success: false,
        message: "administrator role cann't be change.",
      });
    } else if (user.role.role_name === "supervisor") {
      await SupervisorEmployeeRelations.findOneAndDelete({
        supervisor_id: user._id,
      });
      let temp = roles.find((el) => el.role_name === "employee");
      if (temp) {
        user.role = temp._id;
      }
    } else if (user.role.role_name === "employee") {
      await SupervisorEmployeeRelations.findOneAndUpdate(
        {
          assigned_employees_id: user._id,
        },
        {
          $pull: { assigned_employees_id: user._id },
        }
      );

      let temp = roles.find((el) => el.role_name === "supervisor");
      if (temp) {
        user.role = temp._id;
      }
    }
    await user.save();
    res.status(200).json({ success: true, message: "Updated", data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllUser,
  createUser,
  getUserByID,
  deleteUser,
  updateUser,
  changeUserRole,
};