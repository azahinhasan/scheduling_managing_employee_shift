const supervisor_employee_relations = require("../models/supervisor_employee_relations.model");

/**
 * @namespace SupervisorEmployeeController
 **/

/**
 * @memberof SupervisorEmployeeController
 * @async
 * @method
 * @description Assign or tag one Employee to under specific Supervisor
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/supervisor_employee_relations.model
 * @returns {JSON} - if success returns the object as data else error.
 */
const tagEmployeeToSupervisor = async (req, res) => {
  try {

    const existingSupervisor = await supervisor_employee_relations.findOne({
      supervisor_id: req.body.supervisor_id,
    }); //checking is supervisor_id exist or not into the supervisor_employee_relations collection

    if (existingSupervisor?.assigned_employees_id.includes(req.body.employee_id)) {
      //checking is employee_id already exist or not under requested supervisor.
      return res.status(400).json({
        success: false,
        message: "Employee already exist under this supervisor",
      });
    }

  
    await supervisor_employee_relations.findOneAndUpdate(
      //removing employee from their previous supervisor.
      {
        assigned_employees_id: req.body.employee_id,
      },
      {
        $pull: { assigned_employees_id: req.body.employee_id },
      }
    );
    if (existingSupervisor) {
      //if exist then will add new employee_id in there.
      await supervisor_employee_relations.findOneAndUpdate(
        { supervisor_id: req.body.supervisor_id },
        { $push: { assigned_employees_id: req.body.employee_id } }
      );
    } else {
      //if not exist will create new supervisor_employee_relations data with supervisor_id and employee_id.
      await supervisor_employee_relations.create({
        supervisor_id: req.body.supervisor_id,
        assigned_employees_id: [req.body.employee_id],
      });
    }

    res.status(200).json({ success: true, message: "Employee successfully tagged" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @memberof SupervisorEmployeeController
 * @async
 * @method
 * @description Get Employee data by or based on given supervisor ID
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/user.model
 * @returns {JSON} - if success returns the object as data else error.
 */
const getEmployeeBySupervisorID = async (req, res) => {
  try {
    let filterWithID = {};

    //requestedUser coming from middleware.
    if (res.locals.requestedUser.role === "administrator") {
      filterWithID = {};
    } else if (res.locals.requestedUser.role === "supervisor") {
      filterWithID = {
        supervisor_id: res.locals.requestedUser._id,
      };
    }
    //if role is supervisor will return only his group.
    //and if  administrator will return all groups.

    const data = await supervisor_employee_relations
      .find(filterWithID)
      .populate({
        path: "assigned_employees_id supervisor_id",
      });

    if (!data) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    res.status(200).json({ success: true, message: "Data Found", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

module.exports = {
  tagEmployeeToSupervisor,
  getEmployeeBySupervisorID,
};
