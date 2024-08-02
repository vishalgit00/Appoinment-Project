import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from '@emailjs/browser'; 

const AppointmentForm = ({addAppointment, appointments}) => {
    const[name, setName] = useState("");
    const[date, setDate] = useState(new Date());
    const[timeSlot,setTimeSlot] = useState("");

    const availableTimeSlots = [
		"09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"
	]; 

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name && date && timeSlot){
            const newAppointment = {name, date, timeSlot};
            if(isTimeSlotAvailable(newAppointment)){
                addAppointment(newAppointment);
                sendEmailNotification(newAppointment);
                setName("");
                setDate(new Date());
                setTimeSlot("");
            }else {
                alert("The selected time slot is already booked")
            } 
        }else {
            alert("Please fill in all fields");
        }
    };

    const isTimeSlotAvailable = (newAppointment)=>{
        return !appointments.some(
            (appt)=> appt.date.toDateString() === newAppointment.date.toDateString() && appt.timeSlot === newAppointment.timeSlot
        );
    };

    const sendEmailNotification = (appointment)=>{
        const templateParams = {
            to_name: appointment.name,
            appointment_date: appointment.date.toDateString(),
            appointment_time: appointment.timeSlot,
        };
        console.log("Sending email with params:", templateParams);

        emailjs.send('service_b52nk57', 'template_3gta06w',{
        publicKey: 'aYivXrYMEl71TQV_t'})
        .then((result) => {
			console.log('Email sent:', result.text);
		}, (error) => {
			console.log('Email error:', error.text);
		});

    };
    return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-25">
						<label htmlFor="fname">Full Name</label>
					</div>
					<div className="col-75">
						<input
							type="text"
							id="fname"
							name="firstname"
							placeholder="Your name.."
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-25">
						<label htmlFor="appointmentDate">Appointment Date</label>
					</div>
					<div className="col-75">
						<DatePicker
							selected={date}
							onChange={(date) => setDate(date)}
							dateFormat="MMMM d, yyyy"
							className="form-control"
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-25">
						<label htmlFor="timeSlot">Time Slot</label>
					</div>
					<div className="col-75">
						<select
							id="timeSlot"
							value={timeSlot}
							onChange={(e) => setTimeSlot(e.target.value)}
						>
							<option value="">Select a time slot</option>
							{availableTimeSlots.map((slot) => (
								<option key={slot} value={slot}>
									{slot}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="row">
					<input type="submit" value="Add Appointment" />
				</div>
			</form>
		</div>
	); 
}
export default AppointmentForm;