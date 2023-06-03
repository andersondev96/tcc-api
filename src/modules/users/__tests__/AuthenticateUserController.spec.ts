
import express from "express";
import { request } from "supertest";

import { PrismaClient } from "@prisma/client";
import { http } from "@shared/infra/http/app";

const app = express();

describe("AuthenticateUserController", async () => {

  afterAll(() => {
    new PrismaClient({
      log: ["query"]
    });
  });

  it("Should be able to authenticate a user", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    };

    const userResponse = await request(http)
      .post("/users")
      .send(user);

    const session = {
      email: "johndoe@example.com",
      password: "123456"
    };

    const response = await request(http)
      .post("/sessions")
      .send(session);

    expect(response.status).toBe(201);
  });
});