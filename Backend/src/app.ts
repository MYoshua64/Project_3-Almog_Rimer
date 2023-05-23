import express from "express";
import cors from "cors";
import vacationRoutes from "./6-routes/vacation-routes";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import authRoutes from "./6-routes/auth-routes";
import followerRoutes from "./6-routes/follower-routes";
import expressFileUpload from "express-fileupload";
import { rateLimit } from "express-rate-limit";

const server = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});

server.use(cors({ origin: "http://localhost:3000" }));
server.use(express.json());
server.use(expressFileUpload());
server.use("/api", apiLimiter);
server.use("/api/vacations", vacationRoutes);
server.use("/api/auth", authRoutes);
server.use("/api/followers", followerRoutes);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () =>
  console.log("Listening on http://localhost:" + appConfig.port)
);
