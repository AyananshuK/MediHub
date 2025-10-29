import express from 'express'
import { authenticate } from './../auth/verifyToken.js'
import { getCheckout } from '../controllers/bookingController.js'

const router = express.Router()

router.post('/checkout/:doctorId', authenticate, getCheckout);

export default router;