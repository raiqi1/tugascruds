const router = require('express').Router()
const multer = require('multer');
const upload = multer({dest:'uploads'})
const path = require('path');
const fs = require('fs');
const productController  = require('./controller');

router.get('/products',productController.index);

router.get('/products/:id',productController.details);

router.put('/products/:id',upload.single('image'),productController.updateProduct);

router.delete('/products/:id',productController.deleteProduct);

router.post('/product',upload.single('image'),productController.store);

module.exports = router