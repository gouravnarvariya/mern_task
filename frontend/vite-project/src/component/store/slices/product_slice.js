
import Api from '../../api/Api';


export const getAllProducts = async () => {
  return await Api.get(`product/`);
};

export const getProductById = async (id) => {
  return await Api.get(`product/${id}`);
};

export const createProduct = async (product) => {
  return await Api.post(`product/`, product);
};

export const updateProduct = async (id, product) => {
  return await Api.put(`product/${id}`, product);
};

export const deleteProduct = async (id) => {
  return await Api.delete(`product/${id}`);
};