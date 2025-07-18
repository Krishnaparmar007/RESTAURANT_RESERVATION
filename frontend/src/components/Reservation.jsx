// import React, { useState } from "react";
// import { HiOutlineArrowNarrowRight } from "react-icons/hi";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const Reservation = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [table, setTable] = useState("");
//   const navigate = useNavigate();

//   const handleReservation = async (e) => {e.preventDefault(); 

//     try {
    
//       const reservationData = { firstName, lastName, date, time, phone,email, table};
//       const response = await axios.post("http://localhost:4000/api/v1/reservation/send", reservationData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const { data } = response;
//       toast.success(data.message);

//       setFirstName("");
//       setLastName("");
//       setPhone("");
//       setEmail("");
//       setTime("");
//       setDate("");
//       setTable("");
//       navigate("/success");

//     } catch (error) {
//       if (error.response && error.response.data && error.response.data) {
//         toast.error(error.response.data, { duration: 3000 });
//       } else {
//         toast.error("An unexpected Error occurred", { duration: 3000 });
//       }
//     }
//   };

//   return (
//     <section className="reservation" id="reservation">
//       <div className="container">
//         <div className="banner">
//           <img src="/reservation.png" alt="res" />
//         </div>
//         <div className="banner">
//           <div className="reservation_form_box">
//             <h1>MAKE A RESERVATION</h1>
//             <p>For Further Questions, Please Call:- 123456790</p>
//             <form onSubmit={handleReservation}>
//               <div>
//                 First Name:-
//                 <input
//                   type="text"
//                   required="true"
//                   placeholder="First Name"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                 />
//                 </div>
//                 <div>
//                 Last Name:-
//                 <input
//                   type="text"
//                   required="true"
//                   placeholder="Last Name"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 Date:-
//                 <input
//                   type="date"
//                   required="true"
//                   placeholder="Date"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                 />
//                 </div>
//                 <div>
//                   Time:-
//                 <input
//                   type="time"
//                   required="true"
//                   placeholder="Time"
//                   value={time}
//                   onChange={(e) => setTime(e.target.value)}
//                   min="12:00"
//                   max="23:59"
//                 />
//               </div>
//               <div>
//                 Phone No:-
//                 <input
//                   type="string"
//                   required="true"
//                   placeholder="Phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   maxLength={10}
//                   minLength={10}
//                 />
//                 </div>
//                 <div>
//                   Email:-
//                   <input
//                   type="email"
//                   placeholder="Email"
//                   className="email_tag"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                   </div>
//                 <div>
//                 No. of Table
//                 </div>
//                 <div>
//                 <input
//                   type="string"
//                   required="true"
//                   placeholder="1Table = 4 person"
//                   value={table}
//                   onChange={(e) => setTable(Math.min(10, e.target.value))}
//                 />
//               </div>
//               <button type="submit" >
//                 RESERVE NOW{" "}
//                 <span>
//                   <HiOutlineArrowNarrowRight />
//                 </span>
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Reservation;

// src/components/Reservation.jsx
import React, { useState } from 'react';
import { Calendar, Users } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import './Reservation.css';

const Reservation = () => {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservedTables, setReservedTables] = useState([3, 7]); // Example pre-reserved tables
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [reservationData, setReservationData] = useState({
    firstName: '',
    lastName: '',
    date: '',
    time: '',
    phone: '',
    email: '',
  });

  const tables = [
    { id: 1, seats: 2, x: 100, y: 170, shape: 'circle' },
    { id: 2, seats: 2, x: 100, y: 290, shape: 'circle' },
    { id: 3, seats: 2, x: 100, y: 400, shape: 'circle' },
    { id: 4, seats: 6, x: 250, y: 170, shape: 'rectangle' },
    { id: 5, seats: 6, x: 250, y: 290, shape: 'rectangle' },
    { id: 6, seats: 6, x: 250, y: 400, shape: 'rectangle' },
    { id: 7, seats: 8, x: 390, y: 170, shape: 'rectangle' },
    { id: 8, seats: 6, x: 390, y: 290, shape: 'rectangle' },
    { id: 9, seats: 6, x: 390, y: 400, shape: 'rectangle' },
    { id: 10, seats: 6, x: 550, y: 170, shape: 'rectangle' },
  ];

  const handleTableClick = (tableId) => {
    if (reservedTables.includes(tableId)) {
      toast.error('This table is already reserved');
      return;
    }
    setSelectedTable(tableId);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
    
            const reservationData = { firstName, lastName, date, time, phone, email, table};
            const response = await axios.post("http://localhost:4000/api/v1/reservation/send", reservationData, {
              headers: {
                "Content-Type": "application/json",
              },
            });

      const { data } = response;
      toast.success(data.message);

      setReservationData({
        firstName: '',
        lastName: '',
        date: '',
        time: '',
        phone: '',
        email: '',
      
      });
      setSelectedTable(null);
      setIsModalOpen(false);
      setReservedTables(prev => [...prev, selectedTable]);

      navigate('/success');
    } catch (error) {
      if (error.response?.data) {
        toast.error(error.response.data);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <section className="reservation" id="reservation">
          <div className="container">
           <div className="banner">
            
           <img src="/reservation.png" alt="res" />
           </div>

      <div className="restaurant-map">
      <div className="reservation-header"><br></br>
        <h1 className="title"> Table Reservation</h1>
        <p className="subtitle">Select a table to make your reservation</p>
      </div>
        {/* Restaurant walls */}
        <div className="wall wall-left"></div>
        <div className="wall wall-right"></div>
        <div className="wall wall-top"></div>
        <div className="wall wall-bottom"></div>

        

        {/* Entrance */}
        <div className="entrance">
          Entrance
        </div>

        {/* Tables */}
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => handleTableClick(table.id)}
            className={`table ${table.shape} 
              ${selectedTable === table.id ? 'selected' : ''} 
              ${reservedTables.includes(table.id) ? 'reserved' : 'available'}`}
            style={{
              left: `${table.x}px`,
              top: `${table.y}px`,
              width: table.shape === 'circle' ? `${table.seats * 50}px` : `${table.seats * 17}px`,
              height: table.shape === 'circle' ? `${table.seats * 50}px` : `${table.seats * 15}px`,
            }}
          >
            <div className="table-info">
              <span className="table-number">Table {table.id}</span>
              <span className="table-seats">
                <Users className="icon" />
                {table.seats}
              </span>
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="legend">
          <div className="legend-title">Table Status</div>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color available"></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="legend-color reserved"></div>
              <span>Reserved</span>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Reservation Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">
              Reserve Table {selectedTable} ({tables.find(t => t.id === selectedTable)?.seats} seats)
            </h2>
            <form onSubmit={handleReservation} className="reservation-form">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={reservationData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={reservationData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  value={reservationData.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  required
                  min="12:00"
                  max="23:59"
                  value={reservationData.time}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  maxLength={10}
                  minLength={10}
                  value={reservationData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={reservationData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-confirm"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
          
        </div>
      )}
    </section>
  );
};

export default Reservation;