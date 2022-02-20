import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const [biodata, setBiodata] = useState("");
  //const [photo, setPhoto] = useForm();
  const { register, handleSubmit } = useForm();

  const uploadHandler = async (data) => {
    let navigate = useNavigate();
    //console.log("role is----->", role);
    const formData = new FormData();
    formData.append("picture", data.picture[0]);
    console.log("formdata file---->", formData);

    let item = {
      name: name,
      email: email,
      dob: dob,
      role: role,
      biodata: biodata,
      photo: formData,
    };
    console.log("item is---->", item);
    let result = await fetch("http://localhost:4200/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    //result.json is come from back end and store in result variable
    //console.log("result is---->", result);
    if (result) {
      navigate("UserForm");
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col></Col>
        <Col lg="6" style={{ marginTop: "50px" }}>
          <Form onSubmit={handleSubmit(uploadHandler)}>
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
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default UserForm;
