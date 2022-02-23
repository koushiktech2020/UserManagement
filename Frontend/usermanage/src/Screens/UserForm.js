import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const [biodata, setBiodata] = useState("");
  const [filename, setFilename] = useState("");
  const [showSuccessAlert, setSuccessShowAlert] = useState(false);
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  const onChangeFile = (e) => {
    setFilename(e.target.files[0]);
  };

  const uploadHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("dob", dob);
    formData.append("role", role);
    formData.append("biodata", biodata);
    formData.append("photo", filename);

    //console.log("upload info is-->", formData);

    let result = await fetch("http://localhost:4200/api/users", {
      method: "POST",
      body: formData,
    });

    let resultData = await result.json();
    //console.log("result is---->", resultData.status + resultData.message);
    if (resultData.status == "true") {
      setSuccessShowAlert(true);
      setMessage(resultData.message);
    } else {
      alert(resultData.message);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col></Col>
          <Col lg="6" style={{ marginTop: "50px" }}>
            <div className="container text-center mb-5">
              <h1>Add new User</h1>
            </div>
            <Form onSubmit={uploadHandler} encType="multipart/form-data">
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
                  <input
                    type="file"
                    className="form-control"
                    filename="photo"
                    onChange={onChangeFile}
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
            </Form>
          </Col>
          <Col></Col>
        </Row>
        {showSuccessAlert == true ? (
          <Modal
            size="sm"
            show={showSuccessAlert}
            onHide={() => {
              setSuccessShowAlert(false);
              navigate("/");
            }}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <Alert variant="success">
                <Alert.Heading>{message}</Alert.Heading>
              </Alert>
            </Modal.Body>
          </Modal>
        ) : null}
      </Container>
    </>
  );
};

export default UserForm;
