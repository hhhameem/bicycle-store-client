import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

function AdminDashBoardHome() {
  const [orders, setOrders] = useState([]);
  const [pending, setPending] = useState(0);
  const [confirmed, setConfirmed] = useState(0);
  const [canceled, setCanceled] = useState(0);
  const [shipped, setShipped] = useState(0);
  useEffect(() => {
    axios
      .get("https://aqueous-escarpment-00747.herokuapp.com/orders")
      .then(function (response) {
        setOrders(response.data);
        for (let data of response.data) {
          if (data.status === "pending") {
            setPending((pending) => pending + 1);
          } else if (data.status === "confirmed") {
            setConfirmed((confirmed) => confirmed + 1);
          } else if (data.status === "canceled") {
            setCanceled((canceled) => canceled + 1);
          } else if (data.status === "shipped") {
            setShipped((shipped) => shipped + 1);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h1 className='mb-5'>
        Welcome To <span className='heading-text'>Admin DashBoard</span>
      </h1>
      <div className='container'>
        <Row xs={1} md={3} className='g-4'>
          <Col>
            <Card className='dashboard-card-border'>
              <Card.Header className='dashboard-card-header'>
                Orders Placed
              </Card.Header>
              <Card.Body>
                <Card.Text className='fs-2 fw-bolder'>
                  {orders.length}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='dashboard-card-border'>
              <Card.Header className='dashboard-card-header'>
                Pending Orders
              </Card.Header>
              <Card.Body>
                <Card.Text className='fs-2 fw-bolder'>{pending}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='dashboard-card-border'>
              <Card.Header className='dashboard-card-header'>
                Confirmed Orders
              </Card.Header>
              <Card.Body>
                <Card.Text className='fs-2 fw-bolder'>{confirmed}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='dashboard-card-border'>
              <Card.Header className='dashboard-card-header'>
                Shipped Orders
              </Card.Header>
              <Card.Body>
                <Card.Text className='fs-2 fw-bolder'>{shipped}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='dashboard-card-border'>
              <Card.Header className='dashboard-card-header'>
                Cancelled Orders
              </Card.Header>
              <Card.Body>
                <Card.Text className='fs-2 fw-bolder'>{canceled}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AdminDashBoardHome;
