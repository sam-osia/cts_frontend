import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import AddPatient from "./components/addPatient";
import PatientsList from "./components/patientsList";
import FrameSelect from "./components/frameSelect";

function App() {
  return (
      <div className="App">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <h className="navbar-brand">
                Craniosynostosis Triaging System
            </h>
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                        Patients
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/add"} className="nav-link">
                        Add
                    </Link>
                </li>
                <li>
                    <Link to={"/images"} className="nav-link">
                        3DMD
                    </Link>
                </li>
                <li>
                    <Link to={"/images"} className="nav-link">
                        Android
                    </Link>
                </li>
                <li>
                    <Link to={"/images"} className="nav-link">
                        iPhone
                    </Link>
                </li>
            </div>
        </nav>

        <div className="container mt-3">
            <Routes>
                <Route exact path="/" element={<PatientsList />} />
                <Route exact path="/add" element={<AddPatient /> } />
                <Route path="/images/*" element={ <FrameSelect/> } />
            </Routes>
        </div>
      </div>
  );
}

export default App;
