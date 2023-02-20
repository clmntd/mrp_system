import { Button, Col, Form, Row } from "react-bootstrap";
import { Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
// import {useMediaQuery} from 'react-responsive';
// import Stack from 'react-bootstrap/Stack';
import { onRmSubmit} from '../api/rawmaterial';
import { useNavigate } from "react-router-dom";


function AddNewForm() {
  const navigate = useNavigate();
  
  const [string, setString] = useState({
    dspn: "",
    name: "",
    tqty: 0,
    mqty: "",
    notes: ""
  });

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  
  useEffect(()=> {
    console.log(string);
  }, [string])

  const onChange = (e) => {
    setString({ ...string, [e.target.name]: e.target.value });
  }

  const onChangeInt = (e) => {
    setString({ ...string, [e.target.name]: parseInt(e.target.value) });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await onRmSubmit(string)

      setError('')
      setSuccess(data.message)

      setString({
        dspn: "",
        name: "",
        tqty: 0,
        mqty: "",
        notes: ""
      })

    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
    navigate('/rawmaterials')
  };

  const downloadQRCode = (e) => {
    e.preventDefault();
    setString("");
  };

  const qrCodeEncoder = (e) => {
    setString(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={string}
      size={150}
      bgColor={"#f5f5f5"}
      level={"H"}
    />
  );

  
    // const Mobile = ({children}) => {
    //   const isMobile = useMediaQuery({minWidth: 0, maxWidth:450})
    //   return isMobile ? children : null
    // }
  
    // const Tablet = ({children}) => {
    //   const isTablet = useMediaQuery({minWidth: 451, maxWidth:900})
    //   return isTablet ? children : null
    // }
  
    // const Desktop = ({children}) => {
    //   const isDesktop = useMediaQuery({minWidth: 901})
    //   return isDesktop ? children : null
    // }
  

  return (
    <div>
        {/* <Mobile >
            <Row className="mb-3">
            <Form >
            <h5 style={{ padding: "20px" }}>Add New Raw Material </h5>
            <Row className="content mb-3" style={{display:'flex'}} >
              
              <Col sm={5}></Col>


              <Form.Group
                as={Col}
                controlId="formGridEmail"
                style={{ textAlign: "left" }}
              >
                <Form.Label sm={2}>DS # / Part ID</Form.Label>
                <Form.Control
                  type="text"
                  value={string}
                  onChange={qrCodeEncoder}
                  placeholder="Enter DS# / Part ID"
                />
              </Form.Group>

            </Row> 

            <Row className="mb-3" >
              <Form.Group as={Col} controlId="formGridQr" >
                <div>
                  <Form.Group
                    as={Col}
                    controlId="formGridQty"
                    style={{ textAlign: "left"}}
                  >
                    <Form.Label className="mb-3"   sm={2}>Raw Material Name</Form.Label>
                    <Form.Control type="text" style={{display: "flex"}} placeholder="Enter Raw Material Name" />
                  </Form.Group>
                </div>
                <div style={{ padding: "1vh" }}></div>

                <Form.Group
                  as={Col}
                  controlId="formGridQty"
                  style={{ textAlign: "left", Width: "30%" }}
                >
                  <Form.Label>Minimum Stock Required</Form.Label>
                  <Form.Control type="integer" placeholder="Enter Quantity" />
                </Form.Group>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                controlId="formFile"
                className="mb-3"
                style={{ textAlign: "left" }}
              >
                <div class="form-group" style={{ maxWidth: "100%" }}>
                  <label for="exampleFormControlTextarea1">Notes</label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="4"
                  ></textarea>
                </div>
              </Form.Group>
            </Row>

            <Stack className="float-right" gap={1}>
              <Button className="px-5" variant="primary" type="submit" size="sm">
                Submit
              </Button>
            </Stack>
          </Form>
            </Row>

        </Mobile>

        <Tablet>
        <Form>
      <h5 style={{ padding: "20px" }}>Add New Raw Material</h5>
      <Row className="mb-3">
        <Form.Group
          as={Col}
          controlId="formGridEmail"
          style={{ textAlign: "left" }}
        >
          <Form.Label sm={2}>DS # / Part ID</Form.Label>
          <Form.Control
            type="text"
            value={string}
            onChange={qrCodeEncoder}
            placeholder="Enter DS# / Part ID"
          />
        </Form.Group>

        <Col sm={5}></Col>

        <Form.Group as={Col} controlId="formGridQr">
          <div>
            <Form.Group
              as={Col}
              controlId="formGridQty"
              style={{ textAlign: "left" }}
            >
              <Form.Label sm={2}>Raw Material Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Raw Material Name" />
            </Form.Group>
          </div>
          <div style={{ padding: "1vh" }}></div>

          <Form.Group
            as={Col}
            controlId="formGridQty"
            style={{ textAlign: "left", Width: "30%" }}
          >
            <Form.Label>Minimum Stock Required</Form.Label>
            <Form.Control type="integer" placeholder="Enter Quantity" />
          </Form.Group>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group
          controlId="formFile"
          className="mb-3"
          style={{ textAlign: "left" }}
        >
          <div class="form-group" style={{ maxWidth: "100%" }}>
            <label for="exampleFormControlTextarea1">Notes</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="4"
            ></textarea>
          </div>
        </Form.Group>
      </Row>

      <Stack className="float-right" gap={1}>
        <Button className="px-5" variant="primary" type="submit" size="sm">
          Submit
        </Button>
      </Stack>
    </Form>
        </Tablet>

        <Desktop> */}
        <Form>
      <h5 style={{ padding: "20px" }}>Add New Raw Material</h5>
      <Row className="mb-3">
        <Form.Group
          as={Col}
          controlId="formGridEmail"
          style={{ textAlign: "left" }}
        >
          <Form.Label sm={2}>DS # / Part ID</Form.Label>
          <Form.Control
            type="text"
            name="dspn"
            value={string.dspn}
            onChange={e => onChange(e)}
            placeholder="Enter DS# / Part ID"
          />
        </Form.Group>

        <Col sm={5}></Col>

        <Form.Group as={Col} controlId="formGridQr">
          <div>
            <Form.Group
              as={Col}
              controlId="formGridQty"
              style={{ textAlign: "left" }}
            >
              <Form.Label sm={2}>Raw Material Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Raw Material Name"
                name="name"
                value={string.name}
                onChange={e => onChange(e)} />
            </Form.Group>
          </div>
          <div style={{ padding: "1vh" }}></div>

          <Form.Group
            as={Col}
            controlId="formGridQty"
            style={{ textAlign: "left", Width: "30%" }}
          >
            <Form.Label>Minimum Stock Required</Form.Label>
            <Form.Control 
              type="integer" 
              placeholder="Enter Quantity"
              name="mqty"
              value={string.mqty}
              onChange={e => onChangeInt(e)} />
          </Form.Group>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group
          controlId="formFile"
          className="mb-3"
          style={{ textAlign: "left" }}
        >
          <div class="form-group" style={{ maxWidth: "100%" }}>
            <label for="notes">Notes</label>
            <textarea
              class="form-control"
              id="notes"
              name="notes"
              rows="4"
              value={string.notes}
              onChange={e => onChange(e)}
            ></textarea>
          </div>
        </Form.Group>
      </Row>

      <Stack className="float-right" gap={1}>
        <Button onClick={handleSubmit}className="px-5" variant="primary" type="submit" size="sm">
          Submit
        </Button>
      </Stack>
    </Form>
        {/* </Desktop> */}
    </div>
  );
}

export default AddNewForm;
