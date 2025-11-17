import { test } from "node:test";
import assert from "node:assert";
import { matchOrigin } from "../matcher.js";

test("exact match works", () => {
  assert.equal(matchOrigin("https://example.com", ["https://example.com"]), true);
});

test("wildcard matches subdomain", () => {
  assert.equal(
    matchOrigin("https://api.example.com", ["*.example.com"]),
    true
  );
});

test("wildcard does NOT match main domain", () => {
  assert.equal(
    matchOrigin("https://example.com", ["*.example.com"]),
    false
  );
});

test("regex origin match", () => {
  assert.equal(
    matchOrigin("https://shop.mydomain.com", [/\.mydomain\.com$/]),
    true
  );
});
