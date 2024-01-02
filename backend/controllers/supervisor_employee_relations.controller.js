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
    if (req.body.previous_supervisor_id) {
      //removing employee from previous supervisor
      await supervisor_employee_relations.findOneAndUpdate(
        { supervisor_id: req.body.previous_supervisor_id },
        { $pull: { assigned_employees_id: req.body.employee_id } }
      );
    }

    const existingSupervisor = await supervisor_employee_relations.findOne({
      supervisor_id: req.body.supervisor_id,
    }); //checking is supervisor_id exist or not into the supervisor_employee_relations collection

    if (existingSupervisor) {
      //if exist then will add new employee_id in there.
      if (
        !existingSupervisor.assigned_employees_id.includes(req.body.employee_id)
      ) {
        //checking is employee_id already exist or not.
        await supervisor_employee_relations.findOneAndUpdate(
          { supervisor_id: req.body.supervisor_id },
          { $push: { assigned_employees_id: req.body.employee_id } }
        );
      } else {
        return res
          .status(400)
          .json({
            success: true,
            message: "Employee already exist under this supervisor",
          });
      }
    } else {
      //if not exist will create new supervisor_employee_relations data with supervisor_id and employee_id.
      await supervisor_employee_relations.create({
        supervisor_id: req.body.supervisor_id,
        assigned_employees_id: [req.body.employee_id],
      });
    }

    res.status(200).json({ success: true, message: "Updated" });
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
    
    const data = await supervisor_employee_relations
      .find({
        supervisor_id: req.params.supervisor_id.toString(),
      })
      .populate({
        path: "assigned_employees_id",
      });

    if (!data) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Data Found", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

module.exports = {
  tagEmployeeToSupervisor,
  getEmployeeBySupervisorID,
};
