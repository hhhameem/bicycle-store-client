import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import StatusForm from "../StatusForm/StatusForm";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    axios
      .get("https://aqueous-escarpment-00747.herokuapp.com/orders")
      .then(function (response) {
        setOrders(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [updated]);

  return (
    <div>
      <div className='container mt-5'>
        <div className='mb-3'>
          <h2 className='mb-2'>
            <span className='heading-text'>Manage</span> All Orders
          </h2>
          <hr />
        </div>
        <Table striped bordered hover variant='dark' responsive>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Customer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order?.productName}</td>
                  <td>{order?.price}</td>
                  <td>{order?.email}</td>
                  <td>
                    <StatusForm
                      orderId={order._id}
                      setUpdated={setUpdated}
                      status={order?.status}
                    ></StatusForm>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='4' className='text-center'>
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AllOrders;
