const db = require("../db/db");


const AddProduct = async (req, res) => {
  try {
    const {name,price,category} = req.body
    if(!name || !price || !category) {
      return  res.status(400).json({ message: "provide field" });
    }
    const product = await db.product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetProduct =  async (req, res) => {
  try {
    const products = await db.product.findAll();
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetProductId =  async (req, res) => {
  try {
    const product = await db.product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const UpdateProduct =  async (req, res) => {
  try {
    const product = await db.product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const DeleteProduct =  async (req, res) => {
  try {
    const product = await db.product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {AddProduct,GetProductId,UpdateProduct,DeleteProduct, GetProduct}



