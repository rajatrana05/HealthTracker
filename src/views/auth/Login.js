import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./Login.css";

function LoginForm() {

    const history = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function submit(e) {
        e.preventDefault();
        try {
            await axios
                .post("http://localhost:8000/", { email, password })
                .then((res) => {
                    if(res.data == "exist") {
                        history("/home", {state: {id:email}})
                    }
                    else if(res.data == "notexist") {
                        alert("User Not Found!")
                    }
                }).catch(e => {
                    alert("wrong credentials");
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="registration-form-container">
            <h2>Login</h2>
            <form action="POST">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="Enter Password"
                        required
                    />
                </div>
                <input
                    type="submit"
                    value="Login"
                    onClick={submit}
                    className="submit-button"
                />
            </form>
            <br />
            <Row className="py-3">
                <Col>
                    New User? <Link to={"/registration"}>Registration</Link>
                </Col>
            </Row>
        </div>
    );
}

export default LoginForm;
