import { describe, it } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../src/app.js";
import { isValidPostText } from "../src/utils/validation.js";

describe("Backend API & Health Tests", () => {
  it("GET /health should return 200 OK and status 'ok'", async () => {
    const res = await request(app).get("/health");

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, "ok");
    assert.ok(res.body.commitSha !== undefined);
  });

  it("GET /api/nonexistent-route should return 404 Not Found", async () => {
    const res = await request(app).get("/api/nonexistent-route");

    assert.strictEqual(res.status, 404);
  });
});

describe("Validation Utility Tests", () => {
  it("should validate post text correctly", () => {
    assert.strictEqual(isValidPostText("Should AI regulate itself?"), true);
    assert.strictEqual(isValidPostText(""), false);
    assert.strictEqual(isValidPostText("   "), false);
    assert.strictEqual(isValidPostText(123), false);
  });
});

