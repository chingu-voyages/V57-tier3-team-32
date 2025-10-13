import { Router } from "express";
import { getPullRequests } from "../handlers/pull-requests.handler.js";
import { validateParams } from "../middleware/validate-schema.js";
import repoOwnerSchema from "../schemas/pullrequestall.js";
const router = Router();

router.get("/pull-requests", validateParams(repoOwnerSchema), getPullRequests);

export default router;
