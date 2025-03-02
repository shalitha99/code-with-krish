import axios from 'axios';
const baseUrl = "http://localhost:3003/orders/createOrder";

export const createOrder = async(order) =>{
    return axios.post(baseUrl, order);
}

export const GetOrders = async (order) => {
    const baseUrl = "http://localhost:3003/orders";
    return axios.get(baseUrl, order);
}

export const updateOrderStatus = async (id, status) => {
    const url = `http://localhost:3003/orders/${id}/status`;
    const result = await axios.patch(url, status);
    return result;
}