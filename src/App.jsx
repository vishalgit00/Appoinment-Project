import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";

const App = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const storedAppointments = localStorage.getItem("appointments");
        if (storedAppointments) {
            setAppointments(JSON.parse(storedAppointments));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("appointments", JSON.stringify(appointments));
    }, [appointments]);

    const addAppointment = (appointment) => {
        setAppointments([...appointments, appointment]);
    };

    const deleteAppointment = (index) => {
        const deletedAppointments = [...appointments];
        deletedAppointments.splice(index, 1);
        setAppointments(deletedAppointments);
    };

    const editAppointment = (index, editedName, editedDate, editedTimeSlot) => {
        const updatedAppointments = [...appointments];
        updatedAppointments[index] = {
            name: editedName,
            date: editedDate,
            timeSlot: editedTimeSlot,
        };
        setAppointments(updatedAppointments);
    };

    const clearAppointments = () => {
        setAppointments([]);
        localStorage.removeItem("appointments");
    };

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/form">Add Appointment</Link>
                        </li>
                        <li>
                            <Link to="/list">Appointment List</Link>
                        </li>
                    </ul>
                </nav>
                <h1>Appointment Management System</h1>
                

                <Routes>
                    <Route
                        path="/form"
                        element={<AppointmentForm addAppointment={addAppointment} appointments={appointments} />}
                    />
                    <Route
                        path="/list"
                        element={
                            <AppointmentList
                                appointments={appointments}
                                deleteAppointment={deleteAppointment}
                                clearAppointments={clearAppointments}
                                editAppointment={editAppointment}
                            />
                        }
                    />
                    <Route path="/" element={<div>Welcome to the Appointment Management System!</div>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
