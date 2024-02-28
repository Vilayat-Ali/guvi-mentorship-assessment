import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import helmet from "helmet";

import { ApiRoutes } from "./routes";

// instantiating our app from `express()`.
// app is the main instance of our application and is bounded by port to listen to requests.
const app: express.Express = express();

// `dotenv` allows us to introduce environment variables inside our application. Doing so,
// introduces secret information into our application interface in a more secure manner.
dotenv.config();

// `compression` library provides middleware to compress payload of our JSON responses and decompress our JSON encoded request bodies.
// compression reduces latency and is generally encouraged to enhance performance.
app.use(compression());

// `helmet` library provides middleware functions to counter most of cyber security threats that may be encountered by our server.
// most common threats includes -
// 1. CSRF Token forgery
// 2. CORS
// 3. etc
app.use(helmet());

app.use("/api", new ApiRoutes().getRouter());

app.listen(8000, () => console.info(`Server rolling on port. ${8000}`));
