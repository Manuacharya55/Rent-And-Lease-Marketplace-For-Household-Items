import express from 'express';
import { addAddress, fetchAddress, updateAddress } from '../controllers/Address.controller.js';
import { verifyUser } from '../middleware/Auth.midddleware.js';


const router = express.Router();

router.get('/', verifyUser,fetchAddress);
router.post('/', verifyUser,addAddress);
router.patch('/:id', verifyUser,updateAddress);


export default router;