import { Router } from 'express';
import Auth from './Auth';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/', Auth);

// Export the base-router
export default router;
