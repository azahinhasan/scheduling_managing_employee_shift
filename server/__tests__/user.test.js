const { app,server, mongoose } = require("../index.js");
const request = require("supertest"); // needed to make API requests

let token;
let doctorId;

beforeAll(async () => {
  const res1 = await request(app)
    .post("/auth/sign_in")
    .send({ email: "test@test.com", password: "123456" });
  expect(res1.status).toBe(200);
  token = res1.body.token;
});

describe("When the CRUD server is running", () => {
  it("should return 200 response and fetch a patient in the database", async () => {
    const res = await request(app)
      .get("/api/user/get_all")
      .set("Authorization", token);
    expect(res.status).toBe(200);
    expect(typeof res.body).toEqual("object");
  });

  afterAll(async () => {
    const res1 = await request(app).get("/auth/sign_out");
    expect(res1.status).toBe(200);

    await server.close();
   // await mongoose.connection.db.dropCollection("doctors");
    await mongoose.connection.close();
  });
});
