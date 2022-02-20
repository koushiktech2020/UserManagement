import React, { useState, useEffect } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";

import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const [biodata, setBiodata] = useState("");
  //const [photo, setPhoto] = useForm();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    getUserDetails();
  }, []);

  const url = "http://localhost:4200/api/users";

  const getUserDetails = async () => {
    const response = await axios(url);
    //console.log(response.data.userlist);
    setData(response.data.userlist);
  };

  const updateHandler = async (data) => {
    //console.log("role is----->", role);
    const formData = new FormData();
    formData.append("picture", data.picture[0]);
    //console.log("formdata file---->", formData);

    let item = {
      name: name,
      email: email,
      dob: dob,
      role: role,
      biodata: biodata,
      photo: formData,
    };
    //console.log("item is---->", item);

    let userId = id;
    //console.log(noteId);
    let url = `http://localhost:4200/api/users${userId}`;
    let resultData = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    const responseMessage = await resultData.json();
    //console.log(responseMessage.message);
    alert(responseMessage.message);
    //result.json is come from back end and store in result variable
    console.log("result is---->", result);
  };

  const deleteHandler = async (val) => {
    //console.log(val._id);
    let Id = val._id;
    let url = `http://localhost:4200/api/users${Id}`;
    //console.log(url);
    let responseData = await fetch(url, {
      method: "DELETE",
    });
    const responseMessage = await responseData.json();
    //console.log(responseMessage.message);
    alert(responseMessage.message);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col></Col>
          <Col lg="6" style={{ marginTop: "50px" }}>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edit User Details
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
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

                    <Form.Group style={{ marginBottom: "30px" }}>
                      <Form.Label>Photo</Form.Label>
                      <Form.Group as={Row}>
                        <input
                          style={{ marginTop: "20px" }}
                          type="file"
                          name="picture"
                          {...register("picture", { required: true })}
                        />
                      </Form.Group>
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      style={{ marginBottom: "30px" }}
                    >
                      Submit
                    </Button>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={updateHandler}
                    >
                      Update Note
                    </button>
                    <button
                      ref={refClose}
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "50px",
              }}
            >
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
                          src={item.photo}
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
                            editmodalHanddler(item);
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
