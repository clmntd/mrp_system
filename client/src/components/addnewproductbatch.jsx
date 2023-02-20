import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Stack from "@mui/material/Stack";
import React, { useState, useRef, useEffect } from "react";
import DropFileInput from "./drop-file-input/drop-file-input";
import Logo from "../assets/ALL_VASCULAR_Colour.png";
import { useLocation } from "react-router-dom";
import {
  onProdBatchSubmit,
  onProdBatchUpdate,
  onProdBatchUpdateRm,
  onRmnProdSubmit,
  showRmnQty,
  onRmnProdUpdate,
} from "../api/product";

function returnList(title) {
  showRmnQty(title.lot_no).then((prm) => {
    return prm.data;
  });
}

function AddNewForm() {
  const location = useLocation();
  let title = location.state;

  const options = [
    "Choose from dropdown",
    "Pending Sterilisation",
    "Sterilised",
    "Final Release",
  ];

  const addFields = () => {
    let object = {
      rmn: "",
      rmnqty: "",
    };

    setFormFields([...formFields, object]);
    console.log("add fields", formFields);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const [string, setString] = useState({
    name: title.product_name,
    id: title.product_id,
    lotno: title.lot_no,
    qty: title.product_qty,
    edate: title.expiry_date,
    status: title.status,
    notes: title.notes,
  });

  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    showRmnQty(title.lot_no).then((prm) => {
      //setFormFields(prm.data)
      console.log("this is the prm data", prm.data);
      setFormFields(prm.data);

      // prm.data[i]
      // object.rmn = showRmnQty(title.lot_no).rmn[i]
      // object.rmnqty =
    });
  }, []);

  useEffect(() => {
    console.log(string);
  }, [string]);

  useEffect(() => {
    console.log("FormFields, ", formFields);
  }, [formFields]);

  const onChange = (e) => {
    setString({ ...string, [e.target.name]: e.target.value });
  };

  const handleFormChangeInt = (index, event) => {
    let data = [...formFields];
    data[index][event.target.name] = parseInt(event.target.value);
    setFormFields(data);
  };

  const onChangeInt = (e) => {
    setString({ ...string, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let formFieldsTest = formFields.map((o) => {
        return { ...o, lotno: parseInt(string.lotno) };
      });
      await onProdBatchSubmit(string); //id, lotno, status, notes, edate, qty
      console.log("Success");
      await onProdBatchUpdateRm(formFields); //string
      console.log("Success2");
      await onRmnProdSubmit(formFields, string.lotno); //rmn, rmnqty, lotno
      console.log("Success3");

      setString({
        id: title.product_id,
        lotno: "",
        qty: "",
        edate: "",
        status: "",
        notes: null,
      });

      setFormFields([]);
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await onProdBatchUpdate(string);
      await onRmnProdUpdate(formFields, string.lotno);
      await onProdBatchUpdateRm(formFields); //string

      setString({
        id: title.product_id,
        lotno: "",
        qty: "",
        edate: "",
        status: "",
        notes: null,
      });
      setFormFields([]);
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
    }
  };

  const onFileChange = (files) => {
    console.log(files);
  };

  const componentRef = useRef();

  const styles = {
    label: {
      height: "10cm",
    },
    table: {
      border: "1px solid",
      padding: "10px",
      alignItems: "center",
      width: "10cm",
      height: "auto",
    },
    th: {
      border: "1px solid",
      padding: "10px",
      backgroundColor: "#f5f5f5",
      textAlign: "left",
    },
    td: {
      border: "1px solid",
      padding: "10px",
    },
    td_1: {
      padding: "10px",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
    thead: {
      borderTop: "1px solid",
      borderLeft: "1px solid",
      borderRight: "1px solid",
      padding: "10px",
      backgroundColor: "#f5f5f5",
      textAlign: "center",
      width: "10cm",
      height: "auto",
    },
    tbody: {
      width: "10cm",
      padding: "10px",
      borderTop: "1px solid",
      borderLeft: "1px solid",
      borderRight: "1px solid",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      height: "auto",
    },
  };

  class ComponentToPrint extends React.Component {
    render() {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            marginLeft: "10px",
          }}
        >
          <img src={Logo} style={{ width: 115, height: 50, float: "left" }} />
          <div>
            <th style={styles.thead}>Raw Material/Part</th>
            <table style={styles.table}>
              <tr>
                <th style={styles.th}>Name</th>
                <td style={styles.td}>data 1 INSERT ROUTE</td>
              </tr>
              <tr>
                <th style={styles.th}>RMN</th>
                <td style={styles.td}>data 2 INSERT ROUTE</td>
              </tr>
              <tr>
                <th style={styles.th}>Batch/Lot</th>
                <td style={styles.td}>data 3 INSERT ROUTE</td>
              </tr>
              <tr>
                <th style={styles.th}>Date Opened</th>
                <td style={styles.td}></td>
              </tr>
              <tr>
                <th style={styles.th}>Expiry Date</th>
                <td style={styles.td}>data 1 INSERT ROUTE</td>
              </tr>
            </table>
          </div>
        </div>
      );
    }
  }

  return (
    
    <div>
      <Form onSubmit={handleSubmit}>
        <h5 style={{ padding: "20px" }}>{string.name}</h5>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            controlId="formGridProdNumber"
            style={{ textAlign: "left" }}
          >
            <Form.Label sm={2}>Product Number</Form.Label>
            <Form.Control
              type="integer"
              value={string.id}
              name="id"
              disabled="true"
            />
          </Form.Group>

          <Form.Group
            as={Col}
            controlId="formGridEmail"
            style={{ textAlign: "left" }}
          >
            <Form.Label sm={2}>Lot Number</Form.Label>
            <Form.Control
              name="lotno"
              type="text"
              value={string.lotno}
              onChange={(e) => onChange(e)}
              placeholder="Enter lot no."
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridQr">
          </Form.Group>
        </Row>

        <Row className="mb-3" style={{ paddingBottom: "20px" }}>
          <Form.Group
            as={Col}
            controlId="formGridQty"
            style={{ textAlign: "left" }}
          >
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              name="qty"
              type="number"
              value={string.qty}
              onChange={(e) => onChangeInt(e)}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            controlId="formGridExpiry"
            style={{ textAlign: "left" }}
          >
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              name="edate"
              value={string.edate}
              onChange={(e) => onChange(e)}
              placeholder="mm/dd/yyyy"
            />
          </Form.Group>

          <Form.Group
            as={Col}
            controlId="formGridStatus"
            style={{ textAlign: "left" }}
          >
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={string.status}
              onChange={(e) => onChange(e)}
            >
              {options.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <div class="form-group" style={{ maxWidth: "100%", textAlign: "left" }}>
              <label for="notes">Notes</label>
              <textarea
                class="form-control"
                id="notes"
                name="notes"
                rows="4"
                value={string.notes}
                onChange={(e) => onChange(e)}
              ></textarea>
            </div>
        <hr></hr>
        <Row style={{ padding: "10px" }}>
          <Form.Label style={{ padding: "10px" }}>
            Raw Materials Used
          </Form.Label>
          {formFields.map((form, index) => {
            console.log("form is", form["rmn"]);
            return (
              <div key={index}>
                <Row style={{ paddingBottom: "10px" }}>
                  <Col sm={1}></Col>
                  <Form.Group
                    as={Col}
                    controlId="formRMNUsed"
                    style={{ textAlign: "left" }}
                  >
                    <Form.Label sm={2}>RMN</Form.Label>
                    <Form.Control
                      type="number"
                      value={form["rmn"]}
                      //   placeholder="Enter RMN"
                      onChange={(event) => handleFormChangeInt(index, event)}
                      name="rmn"
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="formRMNQtyUsed"
                    style={{ textAlign: "left" }}
                  >
                    <Form.Label sm={2}>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      value={form["qty"]}
                      placeholder="Enter Quantity"
                      onChange={(event) => handleFormChangeInt(index, event)}
                      name="qty"
                    />
                  </Form.Group>
                  <Col>
                    <Form.Group
                      style={{ alignContent: "center", paddingTop: "4ch" }}
                    >
                      <Button
                        className="bg-danger text border-danger"
                        onClick={() => removeFields(index)}
                      >
                        Remove
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            );
          })}
          <Row>
            <Form.Group style={{ textAlign: "center", paddingTop: "4ch" }}>
              <Button onClick={addFields}>Add More</Button>
            </Form.Group>
          </Row>
        </Row>

        <Row style={{ padding: "10px", marginBottom: "40px" }}>
        
          <Form.Group controlId="formFile">
            <Form.Label>Attach Relevant forms</Form.Label>
            <DropFileInput onFileChange={(files) => onFileChange(files)} />
          </Form.Group>
        </Row>
      </Form>
      <Stack className="float-right" gap={1}>
        <Button
          className="px-5"
          variant="secondary"
          type="submit"
          size="sm"
          onClick={handleUpdate}
        >
          Update
        </Button>
        <Button
          className="px-5"
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          size="sm"
        >
          Submit
        </Button>
      </Stack>

      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} />
      </div>
    </div>
  );
}

export default AddNewForm;
