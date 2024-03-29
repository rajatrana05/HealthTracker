import "./App.css";
import { AuthProvider } from "./AuthContext";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./views/auth/Registration";
import PublicRoute from "./Components/PublicRoute";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./views/auth/Login";
import Home from "./views/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointmentForm from "./views/Appointments";
import Feedback from "./views/Feedback";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Doctors from "./pages/Admin/Doctors";
import Users from "./pages/Admin/Users";
import Profile from "./pages/Doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appoinments from "./pages/Appoinments";
import DoctorAppoinments from "./pages/Doctor/DoctorAppoinments";

function App() {
    return (
        <Router>
            <AuthProvider>
                <main className="py-3">
                    <div className="App">
                        <Container>
                            <Routes>
                                <Route
                                    exact
                                    path="/"
                                    element={
                                        <ProtectedRoute>
                                            <Home />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path="/home" element={<Home />}></Route>
                                <Route
                                    path="/login"
                                    element={
                                        <PublicRoute>
                                            <Login />
                                        </PublicRoute>
                                    }
                                ></Route>
                                <Route
                                    path="/registration"
                                    element={
                                        <PublicRoute>
                                            <Registration />
                                        </PublicRoute>
                                    }
                                ></Route>
                                <Route
                                    path="/appoinments"
                                    element={<AppointmentForm />}
                                ></Route>
                                <Route
                                    path="/feedback"
                                    element={<Feedback />}
                                ></Route>
                                <Route
                                    exact
                                    path="/apply-doctor"
                                    element={
                                        <ProtectedRoute>
                                            <ApplyDoctor />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    exact
                                    path="/admin/doctors"
                                    element={
                                        <ProtectedRoute>
                                            <Doctors />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    exact
                                    path="/admin/users"
                                    element={
                                        <ProtectedRoute>
                                            <Users />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    exact
                                    path="/doctor/profile/:id"
                                    element={
                                        <ProtectedRoute>
                                            <Profile />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    exact
                                    path="/book-appointment/:id"
                                    element={
                                        <ProtectedRoute>
                                            <BookingPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    exact
                                    path="/notification"
                                    element={
                                        <ProtectedRoute>
                                            <NotificationPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    exact
                                    path="doctor/appoinments"
                                    element={
                                        <ProtectedRoute>
                                            <DoctorAppoinments />
                                        </ProtectedRoute>
                                    }
                                />
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
