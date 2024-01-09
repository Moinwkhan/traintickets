const express = require("express");
const {
  tickets,
  checking,
  ticketbooking,
  updatedata,
  deleteticket,
} = require("../controler/controls");
const router = express.Router();

router.route("/tickets").get(tickets);
router.route("/checking").get(checking);
router.route("/ticketbooking").post(ticketbooking);
router.route("/changeticket/:id").put(updatedata);
router.route("/deleteticket/:id").delete(deleteticket);

module.exports = router;
