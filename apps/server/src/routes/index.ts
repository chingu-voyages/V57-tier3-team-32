import { Router } from "express";
import { getAllPullRequests } from "../handlers/pull-requests.handler.js";
import { validateParams } from "../middleware/validate-schema.js";
import repoOwnerSchema from "../schemas/pullrequestall.js";
const router = Router();

router.get(
  "/pull-requests",
  validateParams(repoOwnerSchema),
  getAllPullRequests,
);

export default router;
