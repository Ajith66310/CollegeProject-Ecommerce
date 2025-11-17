import { test } from "node:test";
import assert from "node:assert";
import smartcors from "../smartcors.js";

test("smartcors should be a function", () => {
  assert.ok(typeof smartcors === "function");
  console.log("smartcors tests passed");
});
