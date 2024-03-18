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
        isadmin: false,
        isDoc: false,
    });

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [confPass, setconfPass] = useState("");
    const [Pass, setPass] = useState("");
    const [isAdmin, setAdmin] = useState("");
    const [isDoc, setDoc] = useState("");


    async function submit(e) {
        e.preventDefault();
        try {
        if(name || email || Pass || confPass)
        {
            var validate= true;
            if(!name)
            {
                validate= false;
                toast.warning("Name field is required");
            }
            if(!email)
            {
                validate= false;
                toast.warning("Email field is required");
            }
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
                validate= false;
                toast.warning("Please enter a valid email Id");
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
                toast.warning("Password and Confirm password should match");
            }
            if (!(/^(?=.*[A-Z]).{8,}$/.test(Pass))) {
                validate= false;
                toast.warning("Password should have minimum 8 characters and one cap letter");
            } 
            if(validate)
            {
                await axios
                .post("http://localhost:8000/registration", { name, email, Pass, confPass, isAdmin, isDoc })
                .then((res) => {
                    if (res.data == "exist") {
                        toast.warning("User Already Exists");
                    } else if (res.data == "notexist") {
                        history("/home", { state: { id: email } });
                        toast.success("User is successfully registered and logged in!")
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
        <div className="registration-bckground">
        <div className="registration-form-container">
            <h2 style={{ color: "white" }}>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label style={{ color: "white" }} htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        //value={formData.name}
                        //onChange={handleChange}
                        placeholder="Enter Your Name"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        required
                    />
                </div>
                <div className="form-group">
                    <label style={{ color: "white" }} htmlFor="email">Email:</label>
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
                    <label style={{ color: "white" }} htmlFor="password">Password:</label>
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
                    <label style={{ color: "white" }} htmlFor="confirmPassword">Confirm Password:</label>
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
                    className="reg-submit-button"
                />
            </form>
            <br/>
            <Row className="py-3">
                <Col style={{ color: "white" }}>
                    Existing User? <Link style={{ color: "white" }} to={"/login"}>Login</Link>
                </Col>
            </Row>
        </div>
        </div>
        
    );
}

export default RegistrationForm;