import React, { useEffect } from "react";
import { createOrder, GetOrders, updateOrderStatus } from "../services/order-service";
import { toast } from "react-toastify";


export function OrderManagement() {
    const [customerId, setcustomerId] = React.useState("");
    const [productId, setproductId] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [qty, setQty] = React.useState("");
    const [Orders, setOrders] = React.useState([]);

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        console.log("Order Submitted")
        //Set values from banckend
        try {
            const order = {
                customerId: customerId,
                items: [
                    {
                        productId,
                        price,
                        quantity: qty
                    }
                ]
            }
            const response = await createOrder(order);

            console.log(response.data);
        } catch (error) {
            alert(error.name)
        }
    }

    {/* Use effect used for Automatically load the data into Table */ }
    useEffect(() => {
        GetOrders().then(response => {
            setOrders(response.data)
        }).catch(error => {
            alert(error.name)
        })
    }, [])

    const handleStatusChange = (orderId, status) => {

        const newStatus = { status };
        updateOrderStatus(orderId, newStatus)
            .then(() => {
                toast.success(`Order ${orderId} updated to ${newStatus.status}`);
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || "An error occurred");
            });
    };

    return (
        <>
            <p>Ceate Order</p>
            <form onSubmit={handleOrderSubmit}>
                {/* required fields from the user */}
                <label htmlFor="cus_id">Customer ID </label>
                <input type="text" id="cus_id" name="cus_id" value={customerId} onChange={(e) => setcustomerId(e.target.value)}></input>
                <br />
                <label htmlFor="prod_id">Product ID </label>
                <input type="text" id="prod_id" name="prod_id" value={productId} onChange={(e) => setproductId(e.target.value)}></input>
                <br />
                <label htmlFor="price">price ID </label>
                <input type="text" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                <br />
                <label htmlFor="qty">QTY </label>
                <input type="text" id="qty" name="qty" value={qty} onChange={(e) => setQty(e.target.value)}></input>
                <br />
                <input type="submit" value="submit"></input>

            </form>


            <div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Customer ID</th>
                        <th>Oder date</th>
                        <th>Status</th>
                        <th></th>
                    </tr>

                    {Orders.map(item =>
                    (<tr>
                        <td>{item.id}</td>
                        <td>{item.customerId}</td>
                        <td>{item.createdAt}</td>
                        <td>
                            <select value={item.status} onChange={(e) => handleStatusChange(item.id, e.target.value)}>
                                <option value="PENDING">Pending</option>
                                <option value="CONFIRM">Confirmed</option>
                                <option value="SHIPPED">Shipped</option>
                                <option value="DELIVERED">Delivered</option>
                                <option value="CANCELED">Cancelled</option>
                            </select>

                        </td>
                        <td><button>Order Status</button></td>
                        <td><button>View</button></td>
                    </tr>)
                    )}

                </table>
            </div>

        </>
    )
}
