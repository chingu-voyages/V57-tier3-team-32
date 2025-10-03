import { Router } from "express";
import {
  filterPullRequestByState,
  getAllPullRequests,
} from "../handlers/pull-requests.handler.js";
import { validateParams } from "../middleware/validate-schema.js";
import stateSchema from "../schemas/fiterbystate.js";
import repoOwnerSchema from "../schemas/pullrequestall.js";
const router = Router();

router.get(
  "/pull-requests",
  validateParams(repoOwnerSchema),
  getAllPullRequests,
);
router.get(
  "/pull-requests/state",
  validateParams(stateSchema),
  filterPullRequestByState,
);
export default router;
