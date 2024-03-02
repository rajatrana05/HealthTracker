import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./RegistrationForm.css";

function RegistrationForm() {
    const history = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [confPass, setconfPass] = useState("");
    const [Pass, setPass] = useState("");

    async function submit(e) {
        e.preventDefault();
        try {
            await axios
                .post("http://localhost:8000/registration", { name, email, Pass, confPass })
                .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("email", res.data.data.email);
                    console.log(res);
                    if (res.data == "exist") {
                        alert("User Already Exists");
                    } else if (res.data == "notexist") {
                        history("/home", { state: { id: email } });
                    }
                    if (!name) {
                        alert("Name feild cannot be empty");
                      }
                      if (!email) {
                        alert("Email field is required");
                      }
                      if (!Pass) {
                        alert("Password field is required");
                      }
                      if (!confPass) {
                        alert("Confirm password field is required");
                      }
                      if (!(confPass === Pass)) {
                        alert("Confirm password and Password field are not equal");
                      }
                })
                .catch((e) => {
                    alert("wrong credentials");
                    console.log(e);
                }
                );
            
        } catch (e) {
            console.log(e);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Reset form fields after submission
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <div className="registration-form-container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        // value={formData.email}
                        placeholder="Enter Your Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        // onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        // value={formData.password}
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}
                        // onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        // value={formData.confirmPassword}
                        onChange={(e) => {
                            setconfPass(e.target.value);
                        }}
                        // onChange={handleChange}
                        required
                    />
                </div>
                <input
                    type="submit"
                    value="Register"
                    onClick={submit}
                    className="submit-button"
                />
            </form>
            <Row className="py-3">
                <Col>
                    Existing User? <Link to={"/login"}>Login</Link>
                </Col>
            </Row>
        </div>
    );
}

export default RegistrationForm;
