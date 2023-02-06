const router = require('express').Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads' });
const connection = require('../../config/mysql'); 
const productController = require('./controller');

router.get('/products',productController.index);

router.get('/products/:id',productController.details);

router.post('/products',upload.single('image'),productController.store);

router.put('/product/:id',upload.single('image'),productController.update)

router.delete('/product/:id',productController.destroy)


module.exports = router