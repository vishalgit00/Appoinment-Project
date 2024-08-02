import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentList = ({
    appointments,
	deleteAppointment,
	editAppointment,
	clearAppointments,
})=> {
    const [editedIndex, setEditIndex] = useState(null);
    const [editedName, setEditedName] = useState("");
	const [editedDate, setEditedDate] = useState(new Date());
	const [editedTimeSlot, setEditedTimeSlot] = useState("");
    
    const availableTimeSlots = [
		"09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"
	];

    const handleEdit = (index)=>{
        setEditIndex(index);
        setEditedName(appointments[index].name);
        setEditedDate(new Date(appointments[index].date));
        setEditedTimeSlot(appointments[index].timeSlot);
    };

    const handleSaveEdit = (index)=>{
        if(editedName && editedDate && editedTimeSlot){
            editAppointment(index, editedName, editedDate, editedTimeSlot);
			setEditedIndex(null);
			setEditedName("");
			setEditedDate(new Date());
			setEditedTimeSlot("");
		} else {
			alert("Please fill in all fields.");
		}
    };
    
    const handleCancelEdit = () => {
		setEditIndex(null);
		setEditedName("");
		setEditedDate(new Date());
		setEditedTimeSlot("");
	};
    return (
		<div className="container">
			<h1>Appointment List</h1>
			<table id="list">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Date</th>
						<th>Time</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((appointment, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>
								{editedIndex === index ? (
									<input
										type="text"
										value={editedName}
										onChange={(e) => setEditedName(e.target.value)}
									/>
								) : (
									appointment.name
								)}
							</td>
							<td>
								{editedIndex === index ? (
									<DatePicker
										selected={editedDate}
										onChange={(date) => setEditedDate(date)}
										dateFormat="MMMM d, yyyy"
										className="form-control"
									/>
								) : (
									new Date(appointment.date).toDateString()
								)}
							</td>
							<td>
								{editedIndex === index ? (
									<select
										id="editedTimeSlot"
										value={editedTimeSlot}
										onChange={(e) => setEditedTimeSlot(e.target.value)}
									>
										<option value="">Select a time slot</option>
										{availableTimeSlots.map((slot) => (
											<option key={slot} value={slot}>
												{slot}
											</option>
										))}
									</select>
								) : (
									appointment.timeSlot
								)}
							</td>
							<td>
								{editedIndex === index ? (
									<>
										<button onClick={() => handleSaveEdit(index)}>
											Save
										</button>
										<button onClick={handleCancelEdit}>
											Cancel
										</button>
									</>
								) : (
									<>
										<button onClick={() => handleEdit(index)}>
											Edit
										</button>
										<button onClick={() => deleteAppointment(index)}>
											Delete
										</button>
									</>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<button onClick={clearAppointments}>Clear All Appointments</button>
		</div>
	);
}
export default AppointmentList;