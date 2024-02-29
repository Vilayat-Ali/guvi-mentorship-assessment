import express from "express";
import compression from "compression";
import helmet from "helmet";

import { Mongo } from "./db";

import { ApiRoutes } from "./routes";
import { getValidatedEnvs } from "./config";

// instantiating our app from `express()`.
// app is the main instance of our application and is bounded by port to listen to requests.
const app: express.Express = express();

// `dotenv` allows us to introduce environment variables inside our application. Doing so,
// introduces secret information into our application interface in a more secure manner.
// I am using a schema validation library to make sure I'm getting correct env variables which if not handled correctly can
// trigger serious security issues and may leads to serious consequences and at worst, server compromisation or data loss.
const ENV = getValidatedEnvs();

// Defining a anonymous, self-calling, closure to establish database connection during the server initial setup run.
(() => {
  new Mongo().establishConnection();
})();

// adding middleware to parse the request
// In simpler words, this middleware acts as a serializer and deserializer for our application request data exchange methods
app.use(express.json());

// `compression` library provides middleware to compress payload of our JSON responses and decompress our JSON encoded request bodies.
// compression reduces latency and is generally encouraged to enhance performance.
app.use(compression());

// `helmet` library provides middleware functions to counter most of cyber security threats that may be encountered by our server.
// most common threats includes -
// 1. CSRF Token forgery
// 2. CORS
// 3. etc
app.use(helmet());

// configuring of api routes in the application.
// this pattern is called builder pattern and is encouraged in the industry and helps in -
// 1. Code maintainability
// 2. Code reusability
// 3. Quick prototyping
// 4. Code segregation
// 5. Code maintainance
app.use("/api", new ApiRoutes().getRouter());

// server listening on port
app.listen(Number(ENV.PORT), () =>
  console.info(`Server rolling on port. ${ENV.PORT}`)
);
