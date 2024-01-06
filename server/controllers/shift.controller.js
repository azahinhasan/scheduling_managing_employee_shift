const Shift = require("../models/shift.model");
const SupervisorEmployeeRelation = require("../models/supervisor_employee_relations.model");

/**
 * @namespace ShiftController
 **/

/**
 * @memberof ShiftController
 * @async
 * @method
 * @description Get the list of all shifts.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/shift.model
 * @returns {JSON} -  if success returns the array of object as data else error.
 */
const getAllShift = async (req, res) => {
  try {
    let list = await Shift.find({}).populate({
      path: "assigned_employee",
    });

    if (res.locals.requestedUser.role === "supervisor") {
      list = await Shift.find({}).populate({
        path: "assigned_employee",
      });
      let supervisorEmployee = await SupervisorEmployeeRelation.find({
        supervisor_id: res.locals.requestedUser._id,
      });
      supervisorEmployee = supervisorEmployee.map(
        (el) => el.assigned_employees_id
      );
      let employees = [].concat(...supervisorEmployee);
      employees = [...new Set(employees.map((el) => el.toString()))];
      const temp = list.filter((item) => {
        return item.assigned_employee.find((e) =>
          employees.includes(e._id.toString())
        );
      });
      list = temp;
    } else if (res.locals.requestedUser.role === "employee") {
      list = await Shift.find({
        assigned_employee: res.locals.requestedUser._id,
      }).populate({
        path: "assigned_employee",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Data Found Successfully", data: list });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

/**
 * @memberof ShiftController
 * @async
 * @method
 * @description Get the TV and Movies shift's details by ID.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/shift.model
 * @returns {JSON} - if success returns the object as data else error.
 */
const getShiftByID = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.shift_id).populate({
      path: "assigned_employee",
      select: "-hashed_password"
    });

    if (!shift) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Data Found Successfully", data: shift });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

/**
 * @memberof ShiftController
 * @async
 * @method
 * @description Create a new shift.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/shift.model
 * @returns {JSON} -  if success returns new created shift details as data else error.
 */
const createShift = async (req, res) => {
  try {
    const sameShiftExist = await Shift.findOne({
      date: req.body.date,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
    });
    if (sameShiftExist) {
      return res
        .status(400)
        .json({ success: false, message: "Same Type Shift Already Exist!" });
    }

    const data=await Shift.create(req.body);

    res.status(201).json({ success: true, message: "Shift Created Successfully",data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

/**
 * @memberof ShiftController
 * @async
 * @method
 * @description Delete a shift.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/shift.model
 * @returns {JSON} - if success returns the object as data else error.
 */
const deleteShift = async (req, res) => {
  try {
    const shift = await Shift.findByIdAndDelete(req.params.shift_id);
    res
      .status(204)
      .json({ success: true, message: "Shift deleted", data: shift });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @memberof ShiftController
 * @async
 * @method
 * @description Update shift info.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/shift.model
 * @returns {JSON} - if success returns the object as data else error.
 */
const updateShift = async (req, res) => {
  try {
    const sameShiftExist = await Shift.findOne({
      date: req.body.date,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      _id: { $ne: req.params.shift_id },
    });
    if (sameShiftExist) {
      return res
        .status(400)
        .json({ success: false, message: "Same Type Shift Already Exist!" });
    }

    const shift = await Shift.findByIdAndUpdate(req.params.shift_id, req.body);

    res
      .status(200)
      .json({ success: true, message: "Shift updated", data: shift });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @memberof ShiftController
 * @async
 * @method
 * @description Add,remove or switch in same day shift of employee
 * @param {object} req - request object(must include employee_id,action_type).
 * @param {object} res - response object.
 * @requires ../models/shift.model
 * @returns {JSON} - if success returns the object as data else error.
 */
const modifyShiftOfEmployee = async (req, res) => {
  try {
    if (!req.body.employee_id || !req.body.action_type) {
      return res.status(400).json({
        success: false,
        message: "Missing action type or employee id",
      });
    }

    const new_shift = await Shift.findOne({ _id: req.body.new_shift_id });

    const current_shift = await Shift.findOne({
      _id: req.body.current_shift_id,
    });

    switch (req.body.action_type) {
      case "add":
        //if employee do not have previous shift in given date
        //require from client employee_id,new_shift
        if (!req.body.new_shift_id) {
          return res
            .status(400)
            .json({ success: false, message: "New shift id require" });
        }

        let temp = await Shift.findOne({
          date: new_shift.date,
          assigned_employee: req.body.employee_id,
        });
        if (temp) {
          return res.status(400).json({
            success: false,
            message: "Employee already have shift on same day",
          });
        }
        new_shift.assigned_employee.push(req.body.employee_id);
        new_shift.save();
        break;
      case "switch":
        //changing shift in same day
        //require from client employee_id,new_shift,current_shift_id
        if (!req.body.current_shift_id || !req.body.new_shift_id) {
          return res.status(400).json({
            success: false,
            message: "Current and new shift id require",
          });
        }

        if (current_shift.date.toString() === new_shift.date.toString()) {
          new_shift.assigned_employee.push(req.body.employee_id);
          await Shift.findOneAndUpdate(
            { _id: current_shift._id },
            { $pull: { assigned_employee: req.body.employee_id } }
          );
        }
        new_shift.save();
        break;
      case "remove":
        //removing from specific shift
        //require from client employee_id,current_shift_id
        if (res.locals.requestedUser.role !== "administrator") {
          const employeeUnderSupervisor = await SupervisorEmployeeRelation.findOne(
            {
              supervisor_id: res.locals.requestedUser._id,
              assigned_employees_id: req.body.employee_id,
            }
          );
          if(!employeeUnderSupervisor){
            return res
            .status(400)
            .json({ success: false, message: "This employee is not under this supervisor's" });
          }
        }
        if (!req.body.current_shift_id) {
          return res
            .status(400)
            .json({ success: false, message: "Current shift id require" });
        }
        await Shift.findOneAndUpdate(
          { _id: req.body.current_shift_id },
          { $pull: { assigned_employee: req.body.employee_id } }
        );
        break;
    }

    res.status(200).json({ success: true, message: "User shift updated" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllShift,
  createShift,
  getShiftByID,
  deleteShift,
  updateShift,
  modifyShiftOfEmployee,
};
