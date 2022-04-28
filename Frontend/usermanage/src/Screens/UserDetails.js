import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";

import axios from "axios";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const [biodata, setBiodata] = useState("");
  const [filename, setFilename] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [link, setLink] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [img, setImg] = useState(null);
  const [fileShow, setFileShow] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const apiUrl = "http://localhost:5000/api/users"; //Base url

  /*----- get all user details ----*/
  const getUserDetails = async () => {
    const response = await fetch(apiUrl);
    const resultdata = await response.json();
    console.log("data----->", resultdata);
    setData(resultdata.data);
    setImgUrl(resultdata.url);
  };

  /*----- edit modal for edit signle user details --------*/
  const editModalHandler = async (val) => {
    setOpenModal(true);
    console.log("modal value----->", val);
    setLink(apiUrl + "/" + val._id);
    setName(val.name);
    setEmail(val.email);
    setDob(val.dob);
    setRole(val.role);
    setBiodata(val.biodata);
    setImg(val.photo);
  };

  const onChangeFile = (e) => {
    setFilename(e.target.files[0]);
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setImg(objectUrl);
    setFileShow(true);
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();

    //console.log("link---->", link);
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("dob", dob);
    formData.append("role", role);
    formData.append("biodata", biodata);
    formData.append("photo", filename);

    let result = await fetch(link, {
      method: "PUT",
      body: formData,
    });

    let resultData = await result.json();
    //console.log("result is---->", resultData.status + resultData.message);
    if (resultData.status == "true") {
      setOpenModal(false);
      getUserDetails();
    } else {
      alert(resultData.message);
    }
  };

  /*---- delete particular user details -----*/
  const deleteHandler = async (val) => {
    //console.log("id is---->", val._id);
    let Id = val._id;
    let url = `http://localhost:5000/api/users/${Id}`;
    //console.log("url is---->", url);
    let result = await fetch(url, {
      method: "DELETE",
    });
    const responseData = await result.json();
    //console.log(responseMessage.message);
    if (responseData.status == "true") {
      alert(responseData.message);
      getUserDetails();
    } else {
      alert(responseData.message);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col></Col>
          <Col lg="6" style={{ marginTop: "50px" }}>
            <Modal
              show={openModal}
              onHide={() => {
                setOpenModal(false);
              }}
            >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <div className="container text-center mb-5">
                  <h2>Edit User Details</h2>
                </div>
                <Form
                  encType="multipart/form-data"
                  onSubmit={updateUserDetails}
                >
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />

                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="dd/mm/yyyy"
                      value={dob}
                      onChange={(e) => {
                        setDob(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Role </Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                      <option value="Manager">Manager</option>
                      <option value="Auditor">Auditor</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Biodata </Form.Label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="5"
                      value={biodata}
                      onChange={(e) => {
                        setBiodata(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="me-2 ms-2 mb-4">
                    <Form.Label>Photo</Form.Label>
                    <Form.Group as={Row}>
                      <div className="col-2">
                        {fileShow == true ? (
                          <img
                            src={img}
                            alt="pictures"
                            className="img-thumbnail rounded"
                            style={{ height: "40px" }}
                          />
                        ) : (
                          <img
                            src={imgUrl + img}
                            alt="pictures"
                            className="img-thumbnail rounded"
                            style={{ height: "40px" }}
                          />
                        )}
                      </div>
                      <div className="col-10">
                        <input
                          type="file"
                          className="form-control"
                          filename="photo"
                          onChange={onChangeFile}
                        />
                      </div>
                    </Form.Group>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginBottom: "30px" }}
                  >
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
            <div className="container text-center">
              <h1>User Management System</h1>
            </div>

            <div className="mb-2 d-flex justify-content-end mt-5">
              <Link to="UserForm" className="btn btn-primary">
                Add New
              </Link>
            </div>

            <div style={{ marginTop: "5px" }}>
              <Table striped bordered hover>
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>DOB</th>
                    <th colSpan={2}>Action</th>
                  </tr>
                </thead>
                {data.map((item) => (
                  <tbody key={item._id}>
                    <tr>
                      <td>
                        <img
                          src={imgUrl + item.photo}
                          alt="pictures"
                          className="img-thumbnail rounded"
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>
                      <td>{item.dob}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            editModalHandler(item);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteHandler(item);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default UserDetails;
