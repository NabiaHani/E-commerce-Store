const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductController, getProductController, getSingleProductController, deleteProductController, productPhotoController, updateProductController } = require('../controller/productController');
const router = express.Router();
const formidable = require('express-formidable')


// routes
// create category
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// get products
router.get('/get-product', getProductController)

// get single product
router.get('/get-product/:slug', getSingleProductController)

// delete product
router.delete("/delete-product/:pid", deleteProductController);

// get photo
router.get('/product-photo/:pid', productPhotoController)

// update products
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);


module.exports = router;