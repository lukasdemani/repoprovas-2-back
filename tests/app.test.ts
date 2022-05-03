import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database.js";
import userBodyFactory from "./factories/userBodyFactory";
import userFactory from "./factories/userFactory";
import newTestFactory from "./factories/newTestFactory";

describe("User tests - POST /sign-up", () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it("should return 201 and persist the user given a valid body", async () => {
    // Arrange, Act, Assert
    const body = userBodyFactory();

    const response = await supertest(app).post("/sign-up").send(body);
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    expect(response.status).toEqual(201);
    expect(user).not.toBeNull();
  });

  it("should return 422 given a invalid body", async () => {
    const body = {};

    const response = await supertest(app).post("/sign-up").send(body);

    expect(response.status).toEqual(422);
  });

  it("should return 409 given a duplicate email", async () => {
    const body = userBodyFactory();

    await supertest(app).post("/sign-up").send(body);
    const response = await supertest(app).post("/sign-up").send(body);
    const users = await prisma.user.findMany({
      where: {
        email: body.email,
      },
    });

    expect(response.status).toEqual(409);
    expect(users.length).toEqual(1);
  });
});

describe("User tests - POST /sign-in", () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it("should return 200 and a token given valid credentials", async () => {
    const body = userBodyFactory();
    await userFactory(body);

    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.status).toEqual(200);
    expect(typeof response.body.token).toEqual("string");
    expect(response.body.token.length).toBeGreaterThan(0);
  });

  it("should return 401 given invalid email", async () => {
    const body = userBodyFactory();

    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.status).toEqual(401);
  });

  it("should return 401 given invalid password", async () => {
    const body = userBodyFactory();
    await userFactory(body);

    const response = await supertest(app)
      .post("/sign-in")
      .send({
        ...body,
        password: "bananinha",
      });

    expect(response.status).toEqual(401);
  });
});

describe("Test tests - POST /tests/add", () => {
    beforeEach(truncateTests);
  
    afterAll(disconnect);
  
    it("should return 201 and persist the user given a valid body", async () => {
        // Arrange, Act, Assert
        const body = newTestFactory();
    
        const response = await supertest(app).post("/tests/add").send(body);
        const test = await prisma.test.findFirst({
          where: {
            name: body.name,
          },
        });
    
        expect(response.status).toEqual(201);
        expect(test).not.toBeNull();
      });

    it("should return 422 given a invalid body", async () => {
        const body = {};
    
        const response = await supertest(app).post("/tests/add").send(body);
    
        expect(response.status).toEqual(422);
      });
  
  });

  describe("Test tests - GET /tests/discipline", () => {
    beforeEach(truncateTests);
  
    afterAll(disconnect);
  
    it("should return 200 and an array with the searched results", async () => {
        const body = newTestFactory();
        await supertest(app).post("/tests/add").send(body);
        const textSearch = body.name;

        const response = await supertest(app).get(`/tests/discipline?${textSearch}`);
    
        expect(response.status).toEqual(200);
        expect(response.body.discipline.name).toEqual(textSearch);
      })

    it("should return 422 given a invalid body", async () => {
        const body = {};
    
        const response = await supertest(app).post("/tests/add").send(body);
    
        expect(response.status).toEqual(422);
      });
  
  });

async function disconnect() {
  await prisma.$disconnect();
}

async function truncateUsers() {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
}

async function truncateTests() {
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
  }