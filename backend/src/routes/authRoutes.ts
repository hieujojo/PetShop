import express from 'express';
import { verifyEmail, handleAuthRequest, sendVerificationCode } from '../controllers/authController';

const router = express.Router();

router.post('/verify-email', verifyEmail);
router.post('/auth', handleAuthRequest);
router.post('/send-verification-code', sendVerificationCode);

export default router;