import axios from 'axios';

export const createProduct = async(product) =>{
    const baseUrlPro = "http://localhost:3001/products";
    const result = await axios.post(baseUrlPro, product);
    return result;
}

export const GetProducts = async (product) => {
    const baseUrlProAll = "http://localhost:3001/products";
    return await axios.get(baseUrlProAll, product);
}