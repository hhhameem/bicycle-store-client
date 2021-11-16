import React from "react";
import { Card, Row, Col } from "react-bootstrap";

function AdminDashBoardHome() {
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
                <Card.Text className='fs-2 fw-bolder'>0</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='dashboard-card-border'>
              <Card.Header className='dashboard-card-header'>
                Pending Orders
              </Card.Header>
              <Card.Body>
                <Card.Text className='fs-2 fw-bolder'>0</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='dashboard-card-border'>
              <Card.Header className='dashboard-card-header'>
                Delivered Orders
              </Card.Header>
              <Card.Body>
                <Card.Text className='fs-2 fw-bolder'>0</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AdminDashBoardHome;
