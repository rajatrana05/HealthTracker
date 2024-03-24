import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
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
            if (email || password) {
                var validate = true;
                if (!email) {
                    validate = false;
                    toast.warning("Email field is required");
                }
                if (!password) {
                    validate = false;
                    toast.warning("Password field is required");
                }
                if (validate) {
                    const response= await axios
                        .post("http://localhost:8000/login", {
                            email,
                            password,
                        })
                        /*.then((res) => {
                            if (res.data == "exist") {
                                console.log(res);
                                history("/home", { state: { id: email } });
                                toast.success("User is successfully logged in!");
                            } else if (res.data == "notexist") {
                                toast.warning("User Not Found!");
                            }*/
                        const { status, userId } = response.data;
                        if (status === "success") {
                            history("/home", { state: { id: userId } });
                            if(userId)
                            {
                                
                                localStorage.setItem('patId', userId);
                            }
                            toast.success("User is successfully logged in!");
                        } else if (status === "notexist") {
                            toast.warning("User Not Found!");
                        }
                    } 
                
            } else {
                toast.warning("All fields are required");
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="login-bckground">
            <div className="registration-form-container">
                <h2 style={{ color: "white" }}>Login</h2>
                <form action="POST">
                    <div className="form-group">
                        <label style={{ color: "white" }} htmlFor="email">
                            Email:
                        </label>
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
                        <label style={{ color: "white" }} htmlFor="password">
                            Password:
                        </label>
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
                        className="login-submit-button"
                    />
                </form>
                <br />
                <Row className="py-3">
                    <Col style={{ color: "white" }}>
                        New User?{" "}
                        <Link style={{ color: "white" }} to={"/registration"}>
                            Registration
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default LoginForm;
