import axios from 'axios';

export const createCustomer = async(customer) =>{
    const baseUrlCus = "http://localhost:3002/customers";
    const result = await axios.post(baseUrlCus, customer);
    return result;
}

export const GetCustomers = async (customer) => {
    const baseUrlCusAll = "http://localhost:3002/customers";
    return await axios.get(baseUrlCusAll, customer);
}