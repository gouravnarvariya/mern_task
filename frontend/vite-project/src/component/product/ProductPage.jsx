import React, { useState, useEffect } from 'react';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../store/slices/product_slice';
import { toast } from "react-toastify";
import { ValidateProduct } from '../utils/Validate';

const ProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState({ isValid: false });
  const [editError, setEditError] = useState({ isValid: false });

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
  });
  const [editProductId, setEditProductId] = useState(null);
  const [editProduct, setEditProduct] = useState({
    name: '',
    price: '',
    category: '',
  });
  
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await getAllProducts();
    console.log(response)
    setProducts(response);
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setError(p => {
        const obj = { ...p }
        obj && delete obj[name]
        return obj
      })
      setEditProduct((prev) => ({ ...prev, [name]: value }));
    } else {
      setError(p => {
        const obj = { ...p }
        obj && delete obj[name]
        return obj
      })
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateProduct = async () => {
    const validate = ValidateProduct(newProduct)
      setError(validate)
    if(!validate.isValid) {
    await createProduct(newProduct);
    toast.success("create product successful")
    setNewProduct({
      name: '',
      price: '',
      category: '',
    })
    loadProducts(); } else {
      // console.log("first")
      toast.error("enter price greater than zero")
      setNewProduct({
        name: '',
        price: '',
        category: '',
      })
    }
  };

  const handleUpdateProduct = async (id) => {
    const validate = ValidateProduct(editProduct)
      setEditError(validate)
    if(!validate.isValid) {
    await updateProduct(id, editProduct);
    setEditProductId(null); 
    loadProducts(); }  else {
      if(!editError.price || !editError.name || !editError.category ) {
        toast.error("please fill all field")
      }
    }
  }
 

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    toast.success("delete product successful")

    loadProducts();
  };

  const toggleEditForm = (product) => {
    if (editProductId === product.id) {
      setEditProductId(null);  
    } else {
      setEditProductId(product.id);  
      setEditProduct({
        name: product.name,
        price: product.price,
        category: product.category,
      });
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <div className='product-list'>
      <ul className='product-ul' >
        {products.map((product) => (
          <li className='product-li' key={product.id}>
          <span>product name - {product.name}</span>
             <span>product price -  {product.price}</span>
             <span> product category -  {product.category}</span>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            <button onClick={() => toggleEditForm(product)}>
              {editProductId === product.id ? 'Close Edit' : 'Edit'}
            </button>
            {editProductId === product.id && (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editProduct.name}
                  placeholder="Name"
                  onChange={(e) => handleInputChange(e, true)}
                />
                <input
                  type="number"
                  name="price"
                  value={editProduct.price}
                  placeholder="Price"
                  onChange={(e) => handleInputChange(e, true)}
                /> 
                <input
                  name="category"
                  value={editProduct.category}
                  placeholder="category"
                  onChange={(e) => handleInputChange(e, true)}
                />
                <button onClick={() => handleUpdateProduct(product.id)}>
                  Save Changes
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      </div>
      <h3>Create Product</h3>
      <div className='product-list'>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) => handleInputChange(e)}
      />
      {error ? <a className="red">{error?.name }</a> : ""}
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => handleInputChange(e)}
      />
      {error ? <a className="red">{error?.price }</a> : ""}

      <input
        name="category"
        placeholder="category"
        value={newProduct.category}
        onChange={(e) => handleInputChange(e)}
      />
      {error ? <a className="red">{error?.category }</a> : ""}

      <button onClick={handleCreateProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default ProductComponent;