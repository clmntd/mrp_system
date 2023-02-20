// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Stack from '@mui/material/Stack';
// import React, { useState, useRef } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import DropFileInput from './drop-file-input/drop-file-input';
// import ReactToPrint from "react-to-print";
// import Logo from '../assets/ALL_VASCULAR_Colour.png'

// function QuickProduct() {

//   const [string, setString] = useState("");

//   const downloadQRCode = (e) => {
//     e.preventDefault();
//     setString("");
//   };

//   const qrCodeEncoder = (e) => {
//     setString(e.target.value);
//   };

//   const qrcode = (
//     <QRCodeCanvas
//       id="qrCode"
//       value={string}
//       size={150}
//       bgColor={"#f5f5f5"}
//       level={"H"}
//     />
//   );

//   const onFileChange = (files) => {
//     console.log(files);
//   }

//   const componentRef = useRef();

//   const styles = {
//     label:{
//       height:'10cm'
//     },
//     table: {
//       border: '1px solid',
//       padding: '10px',
//       alignItems:'center',
//       width:'10cm',
//       height:'auto'
//     },
//     th: {
//       border: '1px solid',
//       padding: '10px',
//       backgroundColor: '#f5f5f5',
//       textAlign:'left'
//     },
//     td: {
//       border: '1px solid',
//       padding: '10px'
//     },
//     td_1: {
//       padding: '10px',
//       alignItems: 'center',
//       display:'flex',
//       flexDirection:'column',
//     },
//     thead:{
//       borderTop: '1px solid',
//       borderLeft: '1px solid',
//       borderRight: '1px solid',
//       padding: '10px',
//       backgroundColor: '#f5f5f5',
//       textAlign:'center',
//       width:'10cm',
//       height: 'auto'
//     },
//     tbody:{
//       width:'10cm',
//       padding: '10px',
//       borderTop: '1px solid',
//       borderLeft: '1px solid',
//       borderRight: '1px solid',
//       alignItems: 'center',
//       display:'flex',
//       flexDirection:'column',
//       height: 'auto'
//     }
//   }

//   class ComponentToPrint extends React.Component {
//     render() {
//       return (
//         <div style={{ display:'flex', flexDirection:'column', padding:'20px', marginLeft:'10px'}}>
//         <img src={Logo} style={{ width: 115, height: 50 , float:'left'}}/>
//         <div>
//           <th style={styles.thead}>Raw Material/Part</th>
//           <th style={styles.tbody}> {qrcode} </th>
//           <table style={styles.table}>
//             <tr>
//               <th style={styles.th}>Name</th>
//               <td style={styles.td}>data 1 INSERT ROUTE</td>
//             </tr>
//             <tr>
//               <th style={styles.th}>DS/Part No.</th>
//               <td style={styles.td}>data 2 INSERT ROUTE</td>
//             </tr>
//             <tr>
//               <th style={styles.th}>RMN</th>
//               <td style={styles.td}>data 3 INSERT ROUTE</td>
//             </tr>
//             <tr>
//               <th style={styles.th}>Batch/Lot</th>
//               <td style={styles.td}>data 4 INSERT ROUTE</td>
//             </tr>
//             <tr>
//               <th style={styles.th}>Date Opened</th>
//               <td style={styles.td}></td>
//             </tr>
//             <tr>
//               <th style={styles.th}>Expiry Date</th>
//               <td style={styles.td}>data 5 INSERT ROUTE</td>
//             </tr>
//           </table>
//         </div>
//         </div>
//       );
//     }
//   }

//   return (
//     <div>

//     <Form>
//     <h5 style={{padding:'20px'}}>Product Name</h5>
//       <Row className="mb-3">
//         <Form.Group as={Col} controlId="formGridEmail" style={{textAlign:'left'}}>
//           <Form.Label>Lot Number</Form.Label>
//           <Form.Control  type="text" value={string} onChange={qrCodeEncoder} placeholder="Enter lot no." />
//         </Form.Group>

//         <Form.Group as={Col} controlId="formGridQty" style={{textAlign:'left'}}>
//           <Form.Label>Product Name</Form.Label>
//             <Form.Select >
//             <option>Choose from dropdown menu</option>
//             <option value="1">AVAS Single Catheter Valve</option>
//             <option value="2">Dual Check Valve</option>
//             <option value="3">AVAS Multiport Valve</option>
//             <option value="4">AVAS Occluder Kit</option>
//             <option value="5">AVAS Occluder</option>
//             <option value="6">Tunneller</option>
//             <option value="7">AVAS Implant</option>
//             </Form.Select>
//           </Form.Group>

//         <Form.Group as={Col} controlId="formGridQr">
//         <div>{qrcode}</div>
//         </Form.Group>

//     </Row>

//       <Row className="mb-3">
//         <Form.Group as={Col} controlId="formGridQty" style={{textAlign:'left'}}>
//           <Form.Label>Quantity</Form.Label>
//           <Form.Control type='integer'/>
//         </Form.Group>

//         <Form.Group as={Col} controlId="formGridExpiry" style={{textAlign:'left'}}>
//           <Form.Label>Expiry Date</Form.Label>
//           <Form.Control type='date'></Form.Control>
//         </Form.Group>

//         <Form.Group as={Col} controlId="formGridStatus" style={{textAlign:'left'}}>
//           <Form.Label>Status</Form.Label>
//           <Form.Select>
//             <option>Choose from dropdown menu</option>
//             <option value="1">Pending Sterlisation</option>
//             <option value="2">Sterlised</option>
//             <option value="3">Final Release</option>
//       </Form.Select>
//         </Form.Group>
//       </Row>

//       <Row style={{padding:'10px', marginBottom:'10px'}}>
//       <Form.Group controlId="formFile">
//         <Form.Label>Attach Relevant forms</Form.Label>
//         <DropFileInput onFileChange={(files =>onFileChange(files))}/>
//       </Form.Group>
//       </Row>
//     </Form>

//       <Stack className='float-right' gap={1}>
//       <Button  className="px-5" variant="primary" type="submit" size="sm">
//         Submit
//       </Button>
//       </Stack>

//       <div style={{ display: "none" }}>
//       <ComponentToPrint ref={componentRef}/>
//       </div>

//     </div>
//   );
// }

// export default QuickProduct;

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Stack from "@mui/material/Stack";
import React, { useState, useRef, useEffect } from "react";
import DropFileInput from "./drop-file-input/drop-file-input";
import ReactToPrint from "react-to-print";
import Logo from "../assets/ALL_VASCULAR_Colour.png";
import { useLocation } from "react-router-dom";
import { onProdBatchSubmit } from "../api/product";

function AddNewForm() {
  const location = useLocation();
  let title = location.state;

  const options = [
    "Choose from dropdown",
    "Pending Sterlisation",
    "Sterlised",
    "Final Release",
  ];

  const [string, setString] = useState({
    id: "",
    lotno: "",
    qty: "",
    edate: "",
    status: "",
    notes: null,
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log(string);
  }, [string]);

  const onChange = (e) => {
    setString({ ...string, [e.target.name]: e.target.value });
  };

  const onChangeInt = (e) => {
    setString({ ...string, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await onProdBatchSubmit(string);

      setError("");
      setSuccess(data.message);

      setString({
        id: "",
        lotno: "",
        name: "",
        qty: "",
        edate: "",
        status: "",
        notes: null,
      });
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
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
                <td style={styles.td}>{string.name}</td>
              </tr>
              <tr>
                <th style={styles.th}>RMN</th>
                <td style={styles.td}>data 2 INSERT ROUTE</td>
              </tr>
              <tr>
                <th style={styles.th}>Batch/Lot</th>
                <td style={styles.td}>{string.lotno}</td>
              </tr>
              <tr>
                <th style={styles.th}>Date Opened</th>
                <td style={styles.td}></td>
              </tr>
              <tr>
                <th style={styles.th}>Expiry Date</th>
                <td style={styles.td}>{string.edate}</td>
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
        <h5 style={{ padding: "20px" }}>Add Product Lot</h5>
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
              onChange={(e) => onChange(e)}
              name="id"
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
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridQr"></Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group
            as={Col}
            controlId="formGridQty"
            style={{ textAlign: "left" }}
          >
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              name="qty"
              type="integer"
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
              placeholder="dd/mm/yyyy"
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

        <Row style={{ padding: "10px", marginBottom: "10px" }}>
          <Form.Group controlId="formFile">
            <Form.Label>Attach Relevant forms</Form.Label>
            <DropFileInput onFileChange={(files) => onFileChange(files)} />
          </Form.Group>
        </Row>
      </Form>
      <Stack className="float-right" gap={1}>
        <ReactToPrint
          trigger={() => (
            <Button
              style={{ display: "none" }}
              className="px-5"
              variant="danger"
              type="submit"
              size="sm"
            >
              Print
            </Button>
          )}
          content={() => componentRef.current}
        />
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
