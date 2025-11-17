export function matchOrigin(origin, allowed) {
  if (!origin) return false;

  for (const rule of allowed) {
    // 1) Exact match
    if (rule === origin) return true;

    // 2) Wildcard: *.example.com
    if (typeof rule === "string" && rule.startsWith("*.")) {
      const domain = rule.slice(2);  // "example.com"

      // Must end with ".example.com" NOT "example.com"
      if (origin.endsWith("." + domain)) {
        return true;
      }
    }

    // 3) Regex
    if (rule instanceof RegExp && rule.test(origin)) return true;
  }

  return false;
}


/**
 * @param {string} origin
 * @param {(string|RegExp)[]} allowed
 * @returns {boolean}
 */
