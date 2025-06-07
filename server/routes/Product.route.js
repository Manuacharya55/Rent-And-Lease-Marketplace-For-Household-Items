import express from 'express';
import {
getAllProducts,
getUserSpecificProducts,
getSingleProduct,
addProduct,
deleteProduct,
editProduct
} from '../controllers/Product.controller.js';
import { verifyUser } from '../middleware/Auth.midddleware.js';

const router = express.Router();

router.get('/',verifyUser ,getAllProducts);
router.post('/',verifyUser ,addProduct);
router.get('/:id',verifyUser ,getSingleProduct);
router.patch('/:id',verifyUser ,editProduct);
router.delete('/:id',verifyUser ,deleteProduct);

export default router;