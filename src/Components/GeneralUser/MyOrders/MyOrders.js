import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import "./MyOrders.css";
import useToastify from "../../../Hooks/useToastify";

function MyOrders() {
  const { user } = useAuth();
  const { toastSuccess, toastError } = useToastify();
  const [myOrders, setMyOrders] = useState([]);
  const [deleteOrder, setDeleteOrder] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://aqueous-escarpment-00747.herokuapp.com/orders?email=${user.email}`
      )
      .then(function (response) {
        setMyOrders(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [deleteOrder, user.email]);

  const manageOrderDelete = (id) => {
    const confirmation = window.confirm("Do you want to delete the product?");
    if (confirmation) {
      axios
        .delete(
          `https://aqueous-escarpment-00747.herokuapp.com/deleteorder/${id}`
        )
        .then(function (response) {
          if (response.data.deletedCount >= 1) {
            setDeleteOrder(!deleteOrder);
            toastSuccess("Order Deleted Successfully");
          }
        })
        .catch(function (error) {
          toastError(error + "try Again");
        });
    }
  };

  return (
    <div>
      <div className='container mt-5'>
        <div className='mb-3'>
          <h2 className='mb-2'>
            My <span className='heading-text'>Orders</span>
          </h2>
          <hr />
        </div>
        <Table striped bordered hover variant='dark' responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.length > 0 ? (
              myOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order?.productName}</td>
                  <td>{order?.price}</td>
                  <td>{order?.status}</td>
                  <td>
                    <span
                      style={{ fontSize: "24px" }}
                      className='myOrder-delete-hover'
                      onClick={() => manageOrderDelete(order._id)}
                    >
                      <MdDelete />
                    </span>
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

export default MyOrders;
