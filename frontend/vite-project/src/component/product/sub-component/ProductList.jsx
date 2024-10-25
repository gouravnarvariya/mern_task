// import React, { useState, useEffect } from 'react';
// import {  deleteProduct, getAllProducts, updateProduct } from '../../store/slices/product_slice';
// import { toast } from "react-toastify";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [editProductId, setEditProductId] = useState(null);
//   const [editProduct, setEditProduct] = useState({
//     name: '',
//     price: '',
//     category: '',
//   });
  
//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     const response = await getAllProducts();
//     console.log(response)
//     setProducts(response);
//   };

//   const handleInputChange = (e, isEdit = false) => {
//     const { name, value } = e.target;
//     if (isEdit) {
//       setEditProduct((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleUpdateProduct = async (id) => {
//     if(editProduct.price>0) {
//     await updateProduct(id, editProduct);
//     setEditProductId(null); 
//     toast.success("edit product successful")
//     loadProducts(); } else {
//       toast.error("enter price greater than zero")
//     }
//   };

//   const handleDeleteProduct = async (id) => {
//     await deleteProduct(id);
//     toast.success("delete product successful")

//     loadProducts();
//   };

//   const toggleEditForm = (product) => {
//     if (editProductId === product.id) {
//       setEditProductId(null);  
//     } else {
//       setEditProductId(product.id);  
//       setEditProduct({
//         name: product.name,
//         price: product.price,
//         category: product.category,
//       });
//     }
//   };

//   return (
//     <div>
//       <h2>Product List</h2>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             {product.name} - ${product.price} - {product.category}
//             <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
//             <button onClick={() => toggleEditForm(product)}>
//               {editProductId === product.id ? 'Close Edit' : 'Edit'}
//             </button>
//             {editProductId === product.id && (
//               <div>
//                 <input
//                   type="text"
//                   name="name"
//                   value={editProduct.name}
//                   placeholder="Name"
//                   onChange={(e) => handleInputChange(e, true)}
//                 />
//                 <input
//                   type="number"
//                   name="price"
//                   value={editProduct.price}
//                   placeholder="Price"
//                   onChange={(e) => handleInputChange(e, true)}
//                 /> 
//                 <textarea
//                   name="category"
//                   value={editProduct.category}
//                   placeholder="category"
//                   onChange={(e) => handleInputChange(e, true)}
//                 />
//                 <button onClick={() => handleUpdateProduct(product.id)}>
//                   Save Changes
//                 </button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;