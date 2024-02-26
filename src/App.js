import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./views/auth/Registration";
import Login from "./views/auth/Login";
import Home from  "./views/auth/Home";

function App() {
    return (
        <Router>
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
                        </Routes>
                    </Container>
                </div>
            </main>
        </Router>
    );
}

export default App;
