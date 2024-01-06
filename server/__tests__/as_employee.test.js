const config = require("../config/config");
const supertest = require("supertest");
const request = supertest("http://localhost:" + config.PORT);
//Some tests as employee
let token = {
  employee: "",
  admin: "",
};
let newly_created = {
  employee: "",
};
let roles;
const randomString = Math.random().toString(36).substring(7);

beforeAll(async () => {
  const create_new_employee = await request
    //creating new employee
    .post("/api/user/create")
    .send({
      full_name: `${randomString} ${randomString}`,
      email: `employee${randomString}@test.com`,
      password: "123456",
    });
  newly_created.employee = create_new_employee.body.data;
  expect(create_new_employee.status).toBe(201);
  expect(create_new_employee.body.success).toBe(true);

  const sign_in_as_new_employee = await request
    .post("/auth/sign_in")
    .send({ email: create_new_employee.body.data.email, password: "123456" });
  expect(sign_in_as_new_employee.status).toBe(200);
  expect(sign_in_as_new_employee.body.success).toBe(true);
  token.employee = sign_in_as_new_employee.body.token;

  const sign_in_as_admin = await request
    .post("/auth/sign_in")
    .send({ email: "test@test.com", password: "123456" });
  expect(sign_in_as_admin.status).toBe(200);
  expect(sign_in_as_admin.body.success).toBe(true);
  token.admin = sign_in_as_admin.body.token;
});

describe("Running test as Employee", () => {
  it("should responds with status 401 and get no users", async () => {
    const users = await request
      .get("/api/user/get_all")
      .set("Authorization", token.employee);
    expect(users.status).toBe(401);
    expect(users.body.success).toBe(false);
  });

  it("should responds with status 200 and name must updated", async () => {
    let temp_name = `${randomString} ${randomString}`;
    const update_info = await request
      .put("/api/user/update/" + newly_created.employee._id)
      .set("Authorization", token.employee)
      .send({
        full_name: temp_name,
      });
    expect(update_info.status).toBe(200);

    const find_update_data = await request
      .get("/api/user/get_by_id")
      .set("Authorization", token.employee);
    expect(find_update_data.status).toBe(200);
    expect(find_update_data.body.success).toBe(true);

    expect(find_update_data.body.data.full_name).toBe(temp_name);
  });

  it("should responds with status 200 and list of his(employee's) shifts", async () => {
    const get_all_shift_as_admin = await request
      .get("/api/shift/get_all")
      .set("Authorization", token.admin);
    expect(get_all_shift_as_admin.status).toBe(200);
    expect(get_all_shift_as_admin.body.success).toBe(true);

    let add_employee_in_shift = await request
      //adding employee into shift
      .post("/api/shift/modify_employees_shift")
      .set("Authorization", token.admin)
      .send({
        new_shift_id: get_all_shift_as_admin.body.data[0]._id,
        employee_id: newly_created.employee._id,
        action_type: "add",
      });
    expect(add_employee_in_shift.status).toBe(200);
    expect(add_employee_in_shift.body.success).toBe(true);

    const get_all_shift_employee = await request
      .get("/api/shift/get_all")
      .set("Authorization", token.employee);
    expect(get_all_shift_employee.status).toBe(200);
    expect(get_all_shift_employee.body.success).toBe(true);

    let all_employees_from_shift = get_all_shift_employee.body.data;
    //destructuring all assigned employee ids from the all shifts.
    all_employees_from_shift = all_employees_from_shift.map(
      (el) => el.assigned_employee
    );
    all_employees_from_shift = all_employees_from_shift.map((el) =>
      el.map((e) => e._id)
    );
    //current all_employees_from_shift structure is nested array of _ids. such as: [[1, 2], [4, 3], [1, 5]]. Here,each nested array contains employees_id from each shifts.
    expect(
      all_employees_from_shift.every((array) =>
        array.includes(newly_created.employee._id)
      )
    ).toBe(true); //checking all shifts that this employee get by calling /api/shift/get_all contains his id.
  });

  it("should responds with 200 after successful deleting employee and supervisor", async () => {
    const delete_new_employee = await request
      //deleting newly created employee
      .delete("/api/user/delete/" + newly_created.employee._id)
      .set("Authorization", token.admin);
    expect(delete_new_employee.status).toBe(200);
  });
});
