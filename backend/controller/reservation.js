import ErrorHandler from "../middlewares/error.js";
import { Reservation } from "../models/reservation.js";


const send_reservation = async (req, res, next) => {
  const { firstName, lastName, date, time, phone, email, table } = req.body;
  if (!firstName || !lastName || !date || !time || !phone || !email || !table) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  try {
    await Reservation.create({ firstName, lastName, date, time, phone, email, table});
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }

    // Handle other errors
    return next(error);
  }
};


export default send_reservation;

// import ErrorHandler from "../middlewares/error.js";
// import { Reservation } from "../models/reservation.js";

// // Send reservation
// const send_reservation = async (req, res, next) => {
//   const { firstName, lastName, date, time, phone, email, table } = req.body;
  
//   if (!firstName || !lastName || !date || !time || !phone || !email || !table) {
//     return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
//   }

//   try {
//     await Reservation.create({ firstName, lastName, date, time, phone, email, table});
//     res.status(201).json({
//       success: true,
//       message: "Reservation Sent Successfully!",
//     });
//   } catch (error) {
//     // Handle Mongoose validation errors
//     if (error.name === 'ValidationError') {
//       const validationErrors = Object.values(error.errors).map(err => err.message);
//       return next(new ErrorHandler(validationErrors.join(', '), 400));
//     }
//     // Handle other errors
//     return next(error);
//   }
// };

// // Get all reservations
// const getAllReservations = async (req, res, next) => {
//   try {
//     const reservations = await Reservation.find();
//     res.status(200).json({
//       success: true,
//       results: reservations.length,
//       data: reservations
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

// // Get reservations by date
// const getReservationsByDate = async (req, res, next) => {
//   const { date } = req.params;

//   if (!date) {
//     return next(new ErrorHandler("Please provide a date", 400));
//   }

//   try {
//     const reservations = await Reservation.find({ date });
//     res.status(200).json({
//       success: true,
//       results: reservations.length,
//       data: reservations
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

// // Get single reservation
// const getReservation = async (req, res, next) => {
//   try {
//     const reservation = await Reservation.findById(req.params.id);

//     if (!reservation) {
//       return next(new ErrorHandler("Reservation not found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       data: reservation
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

// // Update reservation
// const updateReservation = async (req, res, next) => {
//   try {
//     const { date, time, table } = req.body;

//     // Check for existing reservation at the same time and table
//     if (date && time && table) {
//       const existingReservation = await Reservation.findOne({
//         table,
//         date,
//         time,
//         _id: { $ne: req.params.id }
//       });

//       if (existingReservation) {
//         return next(
//           new ErrorHandler("This table is already reserved for the selected date and time", 400)
//         );
//       }
//     }

//     const reservation = await Reservation.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true
//       }
//     );

//     if (!reservation) {
//       return next(new ErrorHandler("Reservation not found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       data: reservation,
//       message: "Reservation Updated Successfully!"
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

// // Delete reservation
// const deleteReservation = async (req, res, next) => {
//   try {
//     const reservation = await Reservation.findByIdAndDelete(req.params.id);

//     if (!reservation) {
//       return next(new ErrorHandler("Reservation not found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Reservation Deleted Successfully!"
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

// // Get reserved tables for a specific date
// const getReservedTables = async (req, res, next) => {
//   const { date } = req.params;

//   if (!date) {
//     return next(new ErrorHandler("Please provide a date", 400));
//   }

//   try {
//     const reservations = await Reservation.find({ date }).select('table time');
//     const reservedTables = reservations.map(reservation => ({
//       table: reservation.table,
//       time: reservation.time
//     }));

//     res.status(200).json({
//       success: true,
//       data: reservedTables
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

// export {
//   send_reservation,
//   getAllReservations,
//   getReservationsByDate,
//   getReservation,
//   updateReservation,
//   deleteReservation,
//   getReservedTables
// };