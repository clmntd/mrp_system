import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useMediaQuery } from "react-responsive";
import User from "../assets/user.png";
import Product from "../assets/product.png";
import RawMaterial from "../assets/rawmaterial.png";

const Dashboard = () => {
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 359 });
    return isMobile ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ maxWidth: 809 });
    return isTablet ? children : null;
  };
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1079 });
    return isDesktop ? children : null;
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div style={{ overflow: "hidden", height: "100vh" }}>
        <div class="container">
          <div>
            <Row>
              <Col>
                <h5 style={{ padding: "50px" }}>Dashboard</h5>
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <Mobile>
                <Col md="auto">
                  <Card style={{ width: "19rem", height: "16rem" }}>
                    <Card.Img
                      class=".img-fluid mx-auto d-block"
                      style={{
                        padding: "20px",
                        width: "10rem",
                        height: "10rem",
                      }}
                      variant="top"
                      src={RawMaterial}
                    />
                    <Card.Body>
                      <Card.Title></Card.Title>
                      <Card.Text></Card.Text>
                      <Button
                        style={{
                          width: "100%",
                          backgroundColor: "rgb(51, 102, 255)",
                        }}
                        variant="primary"
                        href="/quickrm"
                      >
                        Add Raw Material Batch
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md="auto">
                  <Card style={{ width: "19rem", height: "16rem" }}>
                    <Card.Img
                      class=".img-fluid mx-auto d-block"
                      style={{ padding: "20px", width: "9.5rem" }}
                      variant="top"
                      src={Product}
                    />
                    <Card.Body>
                      <Card.Title></Card.Title>
                      <Card.Text></Card.Text>
                      <Button
                        style={{
                          width: "100%",
                          backgroundColor: "rgb(51, 102, 255)",
                        }}
                        variant="primary"
                        href="/quickproductform"
                      >
                        Add New Product Lot
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md="auto">
                  <Card style={{ width: "19rem", height: "16rem" }}>
                    <Card.Img
                      class=".img-fluid mx-auto d-block"
                      style={{ padding: "0px", width: "10rem" }}
                      variant="top"
                      src={User}
                    />

                    <Card.Body>
                      <Card.Title></Card.Title>
                      <Card.Text></Card.Text>
                      <Button
                        style={{
                          width: "100%",
                          backgroundColor: "rgb(51, 102, 255)",
                        }}
                        variant="primary"
                        href="/AddUser"
                      >
                        Add New User
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Mobile>

              <Tablet>
                <Col md="auto">
                  <Card style={{ width: "19rem", height: "16rem" }}>
                    <Card.Img
                      class=".img-fluid mx-auto d-block"
                      style={{
                        padding: "20px",
                        width: "10rem",
                        height: "10rem",
                      }}
                      variant="top"
                      src={RawMaterial}
                    />
                    <Card.Body>
                      <Card.Title></Card.Title>
                      <Card.Text></Card.Text>
                      <Button
                        style={{
                          width: "100%",
                          backgroundColor: "rgb(51, 102, 255)",
                        }}
                        variant="primary"
                        href="/quickrm"
                      >
                        Add Raw Material Batch
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md="auto">
                  <Card style={{ width: "19rem", height: "16rem" }}>
                    <Card.Img
                      class=".img-fluid mx-auto d-block"
                      style={{ padding: "20px", width: "9.5rem" }}
                      variant="top"
                      src={Product}
                    />
                    <Card.Body>
                      <Card.Title></Card.Title>
                      <Card.Text></Card.Text>
                      <Button
                        style={{
                          width: "100%",
                          backgroundColor: "rgb(51, 102, 255)",
                        }}
                        variant="primary"
                        href="/quickproductform"
                      >
                        Add New Product Lot
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md="auto">
                  <Card style={{ width: "19rem", height: "16rem" }}>
                    <Card.Img
                      class=".img-fluid mx-auto d-block"
                      style={{ padding: "0px", width: "10rem" }}
                      variant="top"
                      src={User}
                    />

                    <Card.Body>
                      <Card.Title></Card.Title>
                      <Card.Text></Card.Text>
                      <Button
                        style={{
                          width: "100%",
                          backgroundColor: "rgb(51, 102, 255)",
                        }}
                        variant="primary"
                        href="/AddUser"
                      >
                        Add New User
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Tablet>

              <Desktop>
                <Col md="auto">
                  <Card style={{ width: "19rem", height: "16rem" }}>
                    <Card.Img
                      class=".img-fluid mx-auto d-block"
                      style={{
                        padding: "20px",
                        width: "10rem",
                        height: "10rem",
                      }}
                      variant="top"
                      src={RawMaterial}
                    />
                    <Card.Body>
                      <Card.Title></Card.Title>
                      <Card.Text></Card.Text>
                      <Button
                        style={{
                          width: "100%",
                          backgroundColor: "rgb(51, 102, 255)",
                        }}
                        variant="primary"
                        href="/quickrm"
                      >
                        Add Raw Material Batch
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md="auto">
                  <Card style={{ width: "19rem", height: "16rem" }}>
                    <Card.Img
                      class=".img-fluid mx-auto d-block"
                      style={{ padding: "20px", width: "9.5rem" }}
                      variant="top"
                      src={Product}
                    />
                    <Card.Body>
                      <Card.Title></Card.Title>
                      <Card.Text></Card.Text>
                      <Button
                        style={{
                          width: "100%",
                          backgroundColor: "rgb(51, 102, 255)",
                        }}
                        variant="primary"
                        href="/quickproductform"
                      >
                        Add New Product Lot
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md="auto">
                  <Card style={{ width: "19rem", height: "16rem" }}>
                    <Card.Img
                      class=".img-fluid mx-auto d-block"
                      style={{ padding: "0px", width: "10rem" }}
                      variant="top"
                      src={User}
                    />

                    <Card.Body>
                      <Card.Title></Card.Title>
                      <Card.Text></Card.Text>
                      <Button
                        style={{
                          width: "100%",
                          backgroundColor: "rgb(51, 102, 255)",
                        }}
                        variant="primary"
                        href="/AddUser"
                      >
                        Add New User
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Desktop>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
