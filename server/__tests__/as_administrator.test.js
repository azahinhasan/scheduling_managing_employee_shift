const config = require("../config/config");
const { generateRandomTime } = require("../helpers");
const supertest = require("supertest");
const request = supertest("http://localhost:" + config.PORT);
//Some tests as administrator
let token;
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
    .send({ email: "test@test.com", password: "123456" });
  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  token = response.body.token;
});

describe("Running test as Administrator", () => {
  it("should responds with json and status 200 for successfully get all roles", async () => {
    const get_roles = await request
      .get("/api/role/get_all")
      .set("Authorization", token);
    roles = get_roles.body.data;
    expect(get_roles.status).toBe(200);
    expect(get_roles.body.success).toBe(true);
  });

  it("should responds with json and status 200 for successfully get user list", async () => {
    const users = await request
      .get("/api/user/get_all")
      .set("Authorization", token);
    expect(users.status).toBe(200);
    expect(users.body.success).toBe(true);
  });

  it("should responds with 201 after creating employee and supervisor", async () => {
    const create_new_supervisor = await request
      //creating new supervisor
      .post("/api/user/create")
      .set("Authorization", token)
      .send({
        full_name: `${randomString} ${randomString}`,
        email: `supervisor${randomString}@test.com`,
        password: "123456",
        role: roles.find((el) => el.role_name === "supervisor")._id,
      });
    newly_created.supervisor = create_new_supervisor.body;
    expect(create_new_supervisor.status).toBe(201);
    expect(create_new_supervisor.body.success).toBe(true);

    const create_new_employee = await request
      //creating new employee
      .post("/api/user/create")
      .set("Authorization", token)
      .send({
        full_name: `${randomString} ${randomString}`,
        email: `employee${randomString}@test.com`,
        password: "123456",
        role: roles.find((el) => el.role_name === "employee")._id, //id of employee role
      });
    newly_created.employee = create_new_employee.body;
    expect(create_new_employee.status).toBe(201);
    expect(create_new_employee.body.success).toBe(true);
  });

  it("should responds with 200 after tagging this employee to supervisor", async () => {
    const tag_employee_to_supervisor = await request
      //tagging them
      .put("/api/supervisor_employee_relations/tag_employee_to_supervisor")
      .set("Authorization", token)
      .send({
        supervisor_id: newly_created.supervisor.data._id,
        create_new_employee: newly_created.employee.data._id,
      });
    expect(tag_employee_to_supervisor.status).toBe(200);
    expect(tag_employee_to_supervisor.body.success).toBe(true);
  });

  it("should responds with 201 after creating new shift", async () => {
    const create_new_shift = await request
      //creating new supervisor
      .post("/api/shift/create")
      .set("Authorization", token)
      .send({
        label: `Sh-${randomString}`,
        label_color: `orange`,
        date: new Date().setUTCHours(0, 0, 0, 0),
        start_time: generateRandomTime(),
        end_time: generateRandomTime(),
      });
    newly_created.shift = create_new_shift.body;
    expect(create_new_shift.status).toBe(201);
    expect(create_new_shift.body.success).toBe(true);
  });

  it("should responds with 200 after add employee in this shift", async () => {
    const add_employee_in_shift = await request
      .post("/api/shift/modify_employees_shift")
      .set("Authorization", token)
      .send({
        new_shift_id: newly_created.shift.data._id,
        employee_id: newly_created.employee.data._id,
        action_type: "add",
      });
    expect(add_employee_in_shift.status).toBe(200);
    expect(add_employee_in_shift.body.success).toBe(true);
  });

  it("should responds with 400 after add employee in this same shift", async () => {
    const add_employee_in_shift = await request
      .post("/api/shift/modify_employees_shift")
      .set("Authorization", token)
      .send({
        new_shift_id: newly_created.shift.data._id,
        employee_id: newly_created.employee.data._id,
        action_type: "add",
      });
    expect(add_employee_in_shift.status).toBe(400);
    expect(add_employee_in_shift.body.message).toBe(
      "Employee already have shift on same day"
    );
  });

  it("should responds with 400 after remove employee from this same shift", async () => {
    const remove_employee_from_shift = await request
      .post("/api/shift/modify_employees_shift")
      .set("Authorization", token)
      .send({
        current_shift_id: newly_created.shift.data._id,
        employee_id: newly_created.employee.data._id,
        action_type: "remove",
      });
    expect(remove_employee_from_shift.status).toBe(200);
  });

  it("should responds with 204 after successful deleting shift", async () => {
    const delete_new_shift = await request
      //deleting newly created shift
      .delete("/api/shift/delete/" + newly_created.shift.data._id)
      .set("Authorization", token);
    expect(delete_new_shift.status).toBe(204);
  });

  it("should responds with 204 after successful deleting employee and supervisor", async () => {
    const delete_new_employee = await request
      //deleting newly created employee
      .delete("/api/user/delete/" + newly_created.employee.data._id)
      .set("Authorization", token);
    expect(delete_new_employee.status).toBe(204);
    const delete_new_supervisor = await request
      //deleting newly created employee
      .delete("/api/user/delete/" + newly_created.supervisor.data._id)
      .set("Authorization", token);
    expect(delete_new_supervisor.status).toBe(204);
  });
});
