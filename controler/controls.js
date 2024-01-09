const model = require("../models/model");

const tickets = async (req, res) => {
  const Tickets = await model.find(req.query);
  res.status(200).json({ Tickets });
};

const checking = async (req, res) => {
  const {
    passengerName,
    trainName,
    departureStation,
    arrivalStation,
    seatNumber,
    ticketPrice,
    sort,
    select,
  } = req.query;
  const objectquery = {};
  let apidata = model.find(objectquery);

  if (passengerName) {
    objectquery.passengerName = passengerName;
  }
  if (trainName) {
    objectquery.trainName = trainName;
  }
  if (departureStation) {
    objectquery.departureStation = departureStation;
  }
  if (arrivalStation) {
    objectquery.arrivalStation = arrivalStation;
  }
  if (seatNumber) {
    objectquery.seatNumber = seatNumber;
  }
  if (ticketPrice) {
    objectquery.ticketPrice = ticketPrice;
  }

  if (sort) {
    const sortfix = sort.split(",").join(" ");
    apidata = apidata.sort(sortfix);
  }

  if (select) {
    const selectfix = select.split(",").join(" ");
    apidata = apidata.select(selectfix);
  }

  const products = await apidata;
  res.status(200).json({ products });
};

const ticketbooking = async (req, res) => {
  const {
    passengerName,
    trainName,
    departureStation,
    arrivalStation,
    departureTime,
    arrivalTime,
    seatNumber,
    price,
    bookingDate,
  } = req.body;

  if (!departureStation || !arrivalStation || !departureTime || !trainName) {
    res.status(401).json("Enter full information of  Ticket");
  }

  const newticket = new model({
    passengerName,
    trainName,
    departureStation,
    arrivalStation,
    departureTime: departureTime || Date.now(),
    arrivalTime: arrivalTime || null,
    seatNumber: seatNumber || "RAC",
    price,
    bookingDate: bookingDate || Date.now(),
  });

  try {
    const NewTicket = await newticket.save();
    res.status(200).json({ NewTicket });
  } catch (error) {
    res.status(401).json("Enter full information of Ticket");
    console.log(error);
  }
};

const updatedata = async (req, res) => {
  const { id } = req.params;
  const updatedata = req.body;

  try {
    const existingticket = await model.findById(id);
    if (!existingticket) {
      res.status(404).json("This Ticket is not exist");
    } else {
      const updateddata = await model.findByIdAndUpdate(id, updatedata, {
        new: true,
      });
      res.status(200).json({ updateddata });
    }
  } catch (error) {
    res.status(400).json("Enter Proper Information");
    console.log(error);
  }
};

const deleteticket = async (req, res) => {
  const { id } = req.params;
  const deletedata = req.body;

  try {
    const existingticket = await model.findById();
    if (!existingticket) {
      res.status(404).json("This Ticket is not exist");
    } else {
      const deletedticket = await model.findByIdAndDelete(id, deletedata, {
        new: true,
      });
      res.status(200).json({ deletedticket });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports = { tickets, checking, ticketbooking, updatedata, deleteticket };
