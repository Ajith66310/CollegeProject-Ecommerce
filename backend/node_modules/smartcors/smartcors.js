import cors from "cors";
import { matchOrigin } from "./matcher.js";

export default function smartcors(options = {}) {
  const {
    allowedOrigins = [],
    allowCredentials = false,
    debug = false,
  } = options;

  // Add env-based origins
  const envOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map(o => o.trim())
    : [];

  let allAllowed = [...allowedOrigins, ...envOrigins];

  // Add local dev automatically
  if (process.env.NODE_ENV !== "production") {
    allAllowed.push("http://localhost:3000");
    allAllowed.push("http://localhost:5173");
    allAllowed.push("http://localhost:5174");
  }

  // LOGGING
  if (debug) {
    console.log("[smartcors] Allowed origins →", allAllowed);
  }

  return cors({
    origin: function (origin, callback) {
      if (!origin || matchOrigin(origin, allAllowed)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by smartcors"));
    },

    credentials: allowCredentials === true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  });
}

/**
 * @typedef {Object} SmartCORSOptions
 * @property {(string|RegExp)[]} [allowedOrigins]
 * @property {boolean} [allowCredentials]
 * @property {boolean} [debug]
 */

/**
 * @param {SmartCORSOptions} options
 * @returns {import("express").RequestHandler}
 */
