import { Router } from 'express';
import { getAllPullRequests } from '../handlers/pull-requests.handler.js';

const router = Router();

router.get('/pull-requests', getAllPullRequests);

export default router;