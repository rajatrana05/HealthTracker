import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./RegistrationForm.css";
import { toast } from "react-toastify";

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
        if(name || email || Pass || confPass)
        {
            console.log("28");
            var validate= true;
            /*if(!name)
            {
                validate= false;
                toast.warning("Name field is required");
                console.log("34");
            }*/
            if(!email)
            {
                validate= false;
                toast.warning("Email field is required");
            }
            if(!Pass)
            {
                validate= false;
                toast.warning("Password field is required");
            }
            if(!confPass)
            {
                validate= false;
                toast.warning("Confirm Password field is required");
            }
            if(Pass!== confPass)
            {
                validate= false;
                toast.warning("Password and confirm password should match");
            }
            console.log("55");
            if(validate)
            {
                await axios
                .post("http://localhost:8000/registration", { name, email, Pass, confPass })
                .then((res) => {
                    if (res.data == "exist") {
                        alert("User Already Exists");
                    } else if (res.data == "notexist") {
                        console.log(res.err);
                        history("/home", { state: { id: email } });
                    }
                    
                })
                .catch((err) => {
                    alert("wrong credentials");
                    console.log(err.res.data);
                }
                );
            }
           
            
        }
        else{
            toast.warning("All fields are required");
        }
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