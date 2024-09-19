import express from 'express';
import { updateDoctor, deleteDoctor, getAllDoctor, getSingleDoctor } from '../controllers/doctorController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';
import reviewRoute from '../routes/review.js'

const router = express.Router();

//nested route
router.use('/:doctorId/reviews', reviewRoute)

router.get('/:id', getSingleDoctor);
router.get('/', getAllDoctor);
router.put('/:id',authenticate, restrict(['doctor']), updateDoctor);
router.delete('/:id',authenticate, restrict(['doctor']), deleteDoctor);

export default router;