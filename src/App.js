import "./App.css";
import { AuthProvider } from "./AuthContext";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./views/auth/Registration";
import Login from "./views/auth/Login";
import Home from  "./views/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointmentForm from "./views/Appointments";

function App() {
    return (
        <Router>
        <AuthProvider>
            <main className="py-3">
                <div className="App">
                    <Container>
                        <Routes>
                            <Route path="/home" element={<Home />}></Route>
                            <Route
                                path="/registration"
                                element={<Registration />}
                            ></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/appoinments" element={<AppointmentForm />}></Route>
                        </Routes>
                    </Container>
                    <ToastContainer />
                </div>
            </main>
            </AuthProvider>
        </Router>
    );
}

export default App;
