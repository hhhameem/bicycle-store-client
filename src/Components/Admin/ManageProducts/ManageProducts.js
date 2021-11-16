import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useToastify from "../../../Hooks/useToastify";

function ManageProducts() {
  const { toastError, toastSuccess } = useToastify();
  const [allProduct, setAllProduct] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    axios
      .get("https://aqueous-escarpment-00747.herokuapp.com/products")
      .then(function (response) {
        setAllProduct(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [deleted]);

  const manageProductDelete = (productId) => {
    const confirmation = window.confirm("Do you want to delete the product?");
    if (confirmation) {
      axios
        .delete(
          `https://aqueous-escarpment-00747.herokuapp.com/deleteproduct/${productId}`
        )
        .then(function (response) {
          if (response.data.deletedCount > 0) {
            setDeleted(!deleted);
            toastSuccess("Product Deleted Successfully");
          }
        })
        .catch(function (error) {
          toastError(error.message + "Try Again");
        });
    }
  };

  return (
    <div>
      <div className='container mt-5'>
        <div className='mb-3'>
          <h2 className='mb-2'>
            <span className='heading-text'>Manage</span> Products
          </h2>
          <hr />
        </div>
        <Table striped bordered hover variant='dark' responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allProduct.length > 0 ? (
              allProduct.map((product) => (
                <tr key={product._id}>
                  <td>{product?.productName}</td>
                  <td>{product?.productPrice}</td>
                  <td>
                    <span
                      className='myOrder-delete-hover'
                      style={{ fontSize: "24px" }}
                      onClick={() => manageProductDelete(product._id)}
                    >
                      <MdDelete />
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center'>
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

export default ManageProducts;
