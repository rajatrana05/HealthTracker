import React, { useState } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { LoginRoute } from "../../Utilities/API-Routes";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "./Login.css";
import { showLoading, hideLoading } from "../../Redux/Features/alertSlice";

function LoginForm() {
    const history = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [values, setValues] = useState({ email: "", password: "" });
    // This is to Handle Changes in the Input feild
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    // This is to Register the user
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            dispatch(showLoading());
            const { email, password } = values;
            console.log(email, password, "qqqqqqqqqqqq");
            const { data } = await axios.post(LoginRoute, {
                email,
                password,
            });
            dispatch(hideLoading());
            if (data.success) {
                localStorage.setItem("token", data.token);
                navigate("/");
                window.location.reload();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            toast.error("Some Error Occured");
        }
    };

    // async function submit(e) {
    //     e.preventDefault();
    //     try {
    //         if (email || password) {
    //             var validate = true;
    //             if (!email) {
    //                 validate = false;
    //                 toast.warning("Email field is required");
    //             }
    //             if (!password) {
    //                 validate = false;
    //                 toast.warning("Password field is required");
    //             }
    //             if (validate) {
    //                 await axios
    //                     .post("http://localhost:8000/login", {
    //                         email,
    //                         password,
    //                     })
    //                     .then((res) => {
    //                         if (res.data == "exist") {
    //                             history("/home", { state: { id: email } });
    //                             toast.success(
    //                                 "User is successfully logged in!"
    //                             );
    //                         } else if (res.data == "notexist") {
    //                             toast.warning("User Not Found!");
    //                         }
    //                     })
    //                     .catch((e) => {
    //                         alert("wrong credentials");
    //                         console.log(e);
    //                     });
    //             }
    //         } else {
    //             toast.warning("All fields are required");
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    return (
        <div className="login-bckground">
            <div className="registration-form-container">
                <h2 style={{ color: "white" }}>Login</h2>
                {/* <form action="POST"> */}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label style={{ color: "white" }} htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your Email"
                            // onChange={(e) => {
                            //     setEmail(e.target.value);
                            // }}
                            onChange={handleChange}
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
                            // onChange={(e) => {
                            //     setPassword(e.target.value);
                            // }}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                    {/* <input
                        type="submit"
                        value="Login"
                        onClick={submit}
                        className="login-submit-button"
                    /> */}
                    <button className="login-submit-button" type="submit">
                        Login
                    </button>
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
