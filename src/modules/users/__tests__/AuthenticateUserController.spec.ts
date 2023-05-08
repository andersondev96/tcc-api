
import express from "express";
import { request } from "supertest";

const app = express();

describe("AuthenticateUserController", async () => {
  it("Should be able to authenticate a user", () => {
    const response = request(app).post("/sessions");

    expect(response.status).toEqual(200);
  })
})