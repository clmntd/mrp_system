import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Formtable from "./tables/formTable";
import { onProdSubmit} from '../api/product';
import { useNavigate } from "react-router-dom";

function AddNewForm() {
  const navigate = useNavigate();

  const [string, setString] = useState({
    id: "",
    name: "",
    qty: 0,
    serial_no: "",
    variant: "",
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
      const { data } = await onProdSubmit(string)

      setError('')
      setSuccess(data.message)

      setString({
        id: "",
        name: "",
        qty: 0,
        serial_no: "",
        variant: "",
        notes: ""
      })

    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
    navigate('/products')
  };

  return (
    <Form>
      <h5 style={{ padding: "20px" }}>Add New Product</h5>
      <Row className="mb-3">
        <Form.Group
          as={Col}
          controlId="formGridEmail"
          style={{ textAlign: "left" }}
        >
          <Form.Label sm={2}>Product ID</Form.Label>
          <Form.Control
            type="text"
            value={string.id}
            onChange={e => onChange(e)}
            placeholder="Enter Product ID"
            name="id"
          />
        </Form.Group>

        {/* <Col sm={5}></Col> */}
 
        <Form.Group as={Col} controlId="formGridProductName" style={{ textAlign: "left" }}>
            <Form.Label sm={2}>Product Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Product Name" 
              name="name" 
              value={string.name} 
              onChange={e => onChange(e)}
               />
          </Form.Group>
          
        </Row>
      <Row>
      <Form.Group
            as={Col}
            controlId="formGridSerialNo"
            style={{ textAlign: "left" }}
          >
            <Form.Label>Serial Number</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter Serial Number" 
              name="serial_no" 
              value={string.serial_no} 
              onChange={e => onChangeInt(e)}/>
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formGridVariant"
            style={{ textAlign: "left" }}
          >
            <Form.Label>Variant</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Variant" 
              name="variant" 
              value={string.variant} 
              onChange={e => onChange(e)}/>
          </Form.Group>
      </Row>
      {/* <hr></hr> */}
      <Row style={{paddingTop:'3ch'}}className="mb-3">
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
              rows="4"
              name="notes" 
              value={string.notes} 
              onChange={e => onChange(e)}
            ></textarea>
          </div>
        </Form.Group>
      </Row>

      <Stack className="float-right" gap={1}>
        <Button onClick={handleSubmit} className="px-5" variant="primary" type="submit" size="sm" name="submit">
          Submit
        </Button>
      </Stack>
    </Form>
  );
}
export default AddNewForm;
