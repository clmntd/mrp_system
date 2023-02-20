import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Stack from "@mui/material/Stack";
import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import ReactToPrint from "react-to-print";
import Logo from "../assets/ALL_VASCULAR_Colour.png";
import { useLocation } from "react-router-dom";
import { onRmBatchSubmit, onRmBatchUpdate } from "../api/rawmaterial";
import PropTypes from "prop-types";

import "./drop-file-input/drop-file-input";

import { ImageConfig } from "./drop-file-input/imageConfig";
import uploadImg from "../assets/cloud-upload-regular-240.png";
import FormData from "form-data";

function AddNewForm() {
  const location = useLocation();
  let title = location.state;

  const options = [
    "Choose from dropdown",
    "No inspection performed",
    "Outside inspection performed",
    "Inside clean room performed & approved",
  ];

  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  const [string, setString] = useState({
    dspn: title.ds_part_no,
    rmn: title.rmn,
    qty: title.qty,
    qr: "",
    expiry_date: title.expiry_date,
    status: title.status,
    notes: title.notes,
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
      const { data } = await onRmBatchSubmit(string);

      setError("");
      setSuccess(data.message);

      setString({
        dspn: title.ds_part_no,
        rmn: "",
        qty: "",
        expriy_date: "",
        status: "",
        notes: null,
      });
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const { data } = await onRmBatchUpdate(string, string.rmn);

      setError("");
      setSuccess(data.message);

      setString({
        dspn: title.ds_part_no,
        rmn: "",
        qty: "",
        expiry_date: "",
        status: "",
        notes: "",
      });
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      marginTop="-30px"
      value={`http://172.19.118.78:3000/BatchForm/${string.rmn}`}
      size={120}
      bgColor={"#f5f5f5"}
      level={"H"}
    />
  );

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
      paddingTop: "15px",
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
            <th style={styles.tbody}> {qrcode} </th>
            <table style={styles.table}>
              <tr>
                <th style={styles.th}>Name</th>
                <td style={styles.td}>{location.state.raw_material_name}</td>
              </tr>
              <tr>
                <th style={styles.th}>DS/Part No.</th>
                <td style={styles.td}>{location.state.ds_part_no}</td>
              </tr>
              <tr>
                <th style={styles.th}>RMN</th>
                <td style={styles.td}>{string.rmn}</td>
              </tr>
              <tr>
                <th style={styles.th}>Batch/Lot</th>
                <td style={styles.td}> </td>
              </tr>
              <tr>
                <th style={styles.th}>Date Opened</th>
                <td style={styles.td}> </td>
              </tr>
              <tr>
                <th style={styles.th}>Expiry Date</th>
                <td style={styles.td}>{string.expiry_date}</td>
              </tr>
            </table>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <Form>
        <h5 style={{ padding: "20px", paddingBottom: "30px" }}>
          {title.raw_material_name}
        </h5>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            controlId="formGridProdNumber"
            style={{ textAlign: "left" }}
          >
            <Form.Label sm={2}>DS Part No.</Form.Label>
            <Form.Control
              type="integer"
              name="id"
              value={string.dspn}
              disabled="true"
            />
          </Form.Group>

          <Form.Group
            as={Col}
            controlId="formGridEmail"
            style={{ textAlign: "left" }}
          >
            <Form.Label sm={2}>Raw Material Number</Form.Label>
            <Form.Control
              name="rmn"
              type="text"
              value={string.rmn}
              onChange={(e) => onChange(e)}
              placeholder="Enter RMN"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridQr">
            <div className="float-right">{qrcode}</div>
          </Form.Group>
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
              name="expiry_date"
              value={string.expiry_date}
              onChange={(e) => onChange(e)}
              placeholder="mm/dd/yyyy"
            ></Form.Control>
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
                onChange={(e) => onChange(e)}
              ></textarea>
            </div>
          </Form.Group>
        </Row>
        <Row style={{ padding: "10px", marginBottom: "30px" }}>
          <Form.Group controlId="formFile">
            <Form.Label>Attach Relevant forms</Form.Label>
            <div
              ref={wrapperRef}
              className="drop-file-input"
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <div className="drop-file-input__label">
                <img src={uploadImg} alt="" />
                <p>Drag & Drop your files here</p>
              </div>
              <input type="file" name="file" value="" onChange={onFileDrop} />
            </div>
            {fileList.length > 0 ? (
              <div className="drop-file-preview">
                {fileList.map((item, index) => (
                  <div key={index} className="drop-file-preview__item">
                    <img
                      src={
                        ImageConfig[item.type.split("/")[1]] ||
                        ImageConfig["default"]
                      }
                      alt=""
                    />
                    <div className="drop-file-preview__item__info">
                      <p>{item.name}</p>
                      <p>{item.size}B</p>
                    </div>
                    <span
                      className="drop-file-preview__item__del"
                      onClick={() => fileRemove(item)}
                    >
                      x
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </Form.Group>
        </Row>
      </Form>

      <Stack className="float-right" gap={1} marginBottom="150px">
        <ReactToPrint
          trigger={() => (
            <Button className="px-5" variant="danger" type="submit" size="sm">
              Print
            </Button>
          )}
          content={() => componentRef.current}
        />
        <Button
          className="px-5"
          variant="secondary"
          onClick={handleUpdate}
          type="submit"
          size="sm"
        >
          Update
        </Button>
        <Button
          className="px-5"
          variant="primary"
          onClick={handleSubmit}
          type="submit"
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
