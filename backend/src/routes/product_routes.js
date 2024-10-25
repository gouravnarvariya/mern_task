const express = require('express')
const router = express.Router()
const productController = require('../controller/product_controller')
const verifyToken = require('../middleware/verification')
const verifyAdmin = require('../middleware/verifyAdmin')

router.post('/', verifyToken, productController.AddProduct)
router.get('/', productController.GetProduct)
router.get('/:id', productController.GetProductId)
router.put('/:id',verifyToken,verifyAdmin, productController.UpdateProduct)
router.delete('/:id',verifyToken, verifyAdmin,productController.DeleteProduct)

module.exports = router