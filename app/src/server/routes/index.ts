import { Router } from 'express';
import { apiRoutes } from './api';
import { indexRoutes } from './indexRoutes';

const router: Router = Router();

apiRoutes(router);

indexRoutes(router);

export default router;
