import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./views/auth/Registration";

function App() {
    return (
        <Router>
            <main className="py-3">
                <div className="App">
                    <Container>
                        <Registration></Registration>
                        <Routes>
                            <Route
                                path="/registration"
                                component={Registration}
                            ></Route>
                        </Routes>
                    </Container>
                </div>
            </main>
        </Router>
    );
}

export default App;
