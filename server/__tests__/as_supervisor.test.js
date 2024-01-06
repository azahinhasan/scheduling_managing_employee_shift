const config = require("../config/config");
const { generateRandomTime } = require("../helpers");
const supertest = require("supertest");
const request = supertest("http://localhost:" + config.PORT);
//Some tests as administrator
let token = {
  supervisor: "",
  admin: "",
};
let newly_created = {
  supervisor: "",
  employee: "",
  shift: "",
};
let roles;
const randomString = Math.random().toString(36).substring(7);

beforeAll(async () => {
  const response = await request
    .post("/auth/sign_in")
    .send({ email: "test2@test.com", password: "123456" });
  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  token.supervisor = response.body.token;

  const response2 = await request
    .post("/auth/sign_in")
    .send({ email: "test@test.com", password: "123456" });
  expect(response2.status).toBe(200);
  expect(response2.body.success).toBe(true);
  token.admin = response2.body.token;
});

describe("Running test as Supervisor", () => {
    it("should responds with json and status 200 for successfully get all roles", async () => {
      const get_roles = await request
        .get("/api/role/get_all")
        .set("Authorization", token.supervisor);
      roles = get_roles.body.data;
      expect(get_roles.status).toBe(200);
      expect(get_roles.body.success).toBe(true);
    });
    it("should responds with 201 after creating user also role will be 'employee' even though try to create user with supervisor role id", async () => {
      //only admin can create user with administrator/supervisor role
      const create_new_user = await request
        //creating new supervisor
        .post("/api/user/create")
        .set("Authorization", token.supervisor)
        .send({
          full_name: `${randomString} ${randomString}`,
          email: `supervisor${randomString}@test.com`,
          password: "123456",
          role: roles.find((el) => el.role_name === "supervisor")._id,
        });
      newly_created.employee = create_new_user.body;
      expect(create_new_user.status).toBe(201);
      expect(create_new_user.body.data.role.role_name).toBe("employee");
    });
    it("should responds with 401 after try to delete shift(test will run if shifts found)", async () => {
      const get_all_supervisor_shift = await request
        //list of shift that supervisors employee are assigned
        .get("/api/shift/get_all")
        .set("Authorization", token.supervisor);
      expect(get_all_supervisor_shift.status).toBe(200);
      expect(get_all_supervisor_shift.body.success).toBe(true);
      if (get_all_supervisor_shift.body.data.length > 0) {
        const delete_shift = await request
          //creating new supervisor
          .delete("/api/shift/delete/" + get_all_supervisor_shift.body.data[0])
          .set("Authorization", token.supervisor);
        expect(delete_shift.status).toBe(401);
        expect(delete_shift.body.message).toBe(
          "You are not authorized to perform this action."
        );
      }
    });
    it("should responds with 200 and get the only list of employees who are assigned under supervisor", async () => {
      const list_of_employees = await request
        //list of employees
        .get("/api/user/get_all")
        .set("Authorization", token.supervisor);
      expect(list_of_employees.status).toBe(200);
      expect(list_of_employees.body.success).toBe(true);
      const all_assigned_employee = await request
        //list of employees
        .get("/api/supervisor_employee_relations/all_assigned_employee")
        .set("Authorization", token.supervisor);
      expect(all_assigned_employee.status).toBe(200);
      expect(all_assigned_employee.body.success).toBe(true);
      let temp_employees = [
        ...new Set(list_of_employees.body.data.map((el) => el._id)),
      ];
      let temp_employees_under_supervisor =
        all_assigned_employee.body.data[0].assigned_employees_id;
      temp_employees_under_supervisor = [
        ...new Set(temp_employees_under_supervisor.map((el) => el._id)),
      ];
      const verify =
        temp_employees.length === temp_employees_under_supervisor.length &&
        temp_employees
          .sort()
          .every(
            (value, index) =>
              value === temp_employees_under_supervisor.sort()[index]
          );
      expect(verify).toBe(true);
    });
    it("should responds with 204 after successful deleting employee", async () => {
      const delete_new_employee = await request
        //deleting newly created employee
        .delete("/api/user/delete/" + newly_created.employee.data._id)
        .set("Authorization", token.admin);
      expect(delete_new_employee.status).toBe(204);
    });
});
