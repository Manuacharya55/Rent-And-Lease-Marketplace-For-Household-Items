import express from 'express';
import {
getAllProducts,
getUserSpecificProducts,
getSingleProduct,
addProduct,
deleteProduct,
editProduct
} from '../controllers/Product.controller.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addProduct);
// router.get('/user/:id', getUserSpecificProducts);
router.put('/:id', getSingleProduct);
router.put('/:id', editProduct);
router.delete('/:id', deleteProduct);

export default router;