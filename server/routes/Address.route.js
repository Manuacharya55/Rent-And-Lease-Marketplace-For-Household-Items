import express from 'express';
import { addAddress, updateAddress } from '../controllers/Address.controller.js';
import { verifyUser } from '../middleware/Auth.midddleware.js';


const router = express.Router();

router.post('/', verifyUser,addAddress);
router.patch('/:id', verifyUser,updateAddress);


export default router;