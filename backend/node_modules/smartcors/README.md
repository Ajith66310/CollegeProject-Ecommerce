**smartcors**

A smart, environment-aware CORS wrapper for Express applications.
It extends the official cors library with wildcards, regex support, auto localhost whitelisting, and environment-based origin management — making CORS configuration easier, safer, and more powerful.

**Features**

• Wildcard domain support — e.g., *.example.com

• Regex origin matching — e.g., /\.mydomain\.com$/

• Automatic localhost origins in development (3000, 5173, 5174)

• Environment variable support (ALLOWED_ORIGINS)

• Drop-in replacement wrapper for the cors package

• Safe defaults — unknown origins are rejected

• Fixes common CORS issues automatically

• Lightweight & zero-dependency (except cors)


**Installation**

<pre>
<code> 
npm install smartcors
</code>
</pre>
or
<pre>
<code>
yarn add smartcors
</code>
</pre>

**Quick Start**

<pre>
<code>
import express from "express";
import smartcors from "smartcors";

const app = express();

app.use(
  smartcors({
    allowedOrigins: ["https://myapp.com"],
  })
);

app.get("/", (req, res) => {
  res.send("CORS OK");
});

app.listen(3000);
</code>
</pre>

**Advanced Usage** 

• Allow multiple patterns: exact, wildcard, and regex

<pre>
<code>
app.use(
  smartcors({
    allowedOrigins: [
      "https://myapp.com",
      "*.example.com",
      /\.mydomain\.com$/,
    ],
    allowCredentials: true,
    debug: true,
  })
);
</code>
</pre>


**Using Environment Variables**

You can define allowed origins via environment variables:**.env**

<pre>
<code>
ALLOWED_ORIGINS=https://site1.com, https://site2.com, *.mydomain.com
</code>
</pre>

**smartcors automatically merges**

**1.** allowedOrigins (code)

**2.** ALLOWED_ORIGINS (environment)

**3.** Localhost dev origins (3000, 5173, 5174) when not in production

 **Example With Express Router**

 <pre>
 <code>
 import express from "express";
 import smartcors from "smartcors";

 const router = express.Router();

 router.get("/products", (req, res) => {
  res.json({ status: "ok" });
 });

 app.use("/api", smartcors({ allowCredentials: true }), router);
 </code>
 </pre>


**Why smartcors?**

 CORS errors are one of the most common headaches in web development.
 smartcors fixes them by adding features that cors alone does not support:

 • Problem: Wildcard matching not supported

 • smartcors supports *.domain.com

 • Problem: Regex origin filtering is required

 • smartcors supports RegExp objects

 • Problem: Localhost ports constantly change

 • Automatically whitelists common dev ports

 • Problem: Hard to manage origins in large apps

 • Supports .env-based origin lists

 • Problem: CORS misconfiguration causes security issues

 • Provides safe defaults and explicit origin filtering

 **How It Works (Internals)**

 • Merges origins from:

 **code → environment → auto localhost**

 • Each incoming request origin is tested against all patterns:

 • Exact match

 • Wildcard match (*.example.com)

 • Regex match (/\.domain\.com$/)

 • Unmatched origins return:
  "Not allowed by smartcors"

 **Example Project Structure**

 <pre>
 <code>
 SMARTCORS/
├── test
├── index.js
├── index.d.ts
├── smartcors.js
├── matcher.js
├── README.md
├── LICENSE
├── .gitignore    
├── package-lock.json
└── package.json
 </code>
 </pre>

 **Contributing**

Pull requests, issues, and suggestions are welcome.

**License**

MIT License © 2025


# smartcors

[![npm version](https://img.shields.io/npm/v/smartcors.svg)](https://www.npmjs.com/package/smartcors)
[![npm downloads](https://img.shields.io/npm/dm/smartcors.svg)](https://www.npmjs.com/package/smartcors)

