import { Router } from 'express';
import { getLead, getLeads, patchLead, postLead } from '../controllers/leadController.js';
import { validateId, validateLead, validateStatus } from '../middleware/validation.js';
import { requireAdminApiKey } from '../middleware/adminAuth.js';

const router = Router();
router.post('/', validateLead, postLead);
router.get('/', requireAdminApiKey, getLeads);
router.get('/:id', requireAdminApiKey, validateId, getLead);
router.patch('/:id', requireAdminApiKey, validateId, validateStatus, patchLead);
export default router;
