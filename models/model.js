const mongoose = require("mongoose");

const tickets = new mongoose.Schema({
  passengerName: {
    type: String,
    required: [true, "Passenger name is required"],
  },
  trainName: {
    type: String,
    required: [true, "Train name is required"],
  },
  departureStation: {
    type: String,
    required: [true, "Departure station is required"],
  },
  arrivalStation: {
    type: String,
    required: [true, "Arrival station is required"],
  },
  departureTime: {
    type: Date,
    required: [true, "Departure time is required"],
  },
  arrivalTime: {
    type: Date,
    required: [true, "Arrival time is required"],
  },
  seatNumber: {
    type: String,
    required: [true, "Seat number is required"],
  },
  price: {
    type: Number,
    required: [true, "Ticket price is required"],
  },
  bookingDate: {
    type: Date,
    default: Date.now(),
  },
});

const trainticket = mongoose.model("Tickets", tickets);

module.exports = trainticket;
