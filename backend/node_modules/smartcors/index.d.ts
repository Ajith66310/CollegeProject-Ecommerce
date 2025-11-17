/**
 * Type declarations for smartcors
 * A smart CORS wrapper for Express applications.
 */

declare module "smartcors" {
  import { RequestHandler } from "express";

  /**
   * CORS configuration options for smartcors()
   */
  export interface SmartCORSOptions {
    /**
     * Allowed origins can be:
     * - exact string origins: "https://site.com"
     * - wildcard patterns: "*.domain.com"
     * - regular expressions: /\.example\.com$/
     */
    allowedOrigins?: (string | RegExp)[];

    /**
     * Enable support for cookies & Authorization headers.
     * Equivalent to standard CORS credentials: true
     */
    allowCredentials?: boolean;

    /**
     * Enable debug logging
     */
    debug?: boolean;
  }

  /**
   * Smart CORS middleware factory.
   *
   * Example:
   * ```ts
   * app.use(smartcors({
   *   allowedOrigins: ["https://myapp.com", /\.mydomain\.com$/],
   *   allowCredentials: true
   * }));
   * ```
   */
  export default function smartcors(options?: SmartCORSOptions): RequestHandler;

  /**
   * Internal helper used by smartcors to test allowed origins.
   *
   * Example:
   * ```ts
   * matchOrigin("https://api.test.com", ["*.test.com"]);
   * ```
   */
  export function matchOrigin(origin: string, allowed: (string | RegExp)[]): boolean;
}
