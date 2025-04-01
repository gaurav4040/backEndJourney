const express = require("express");

const storeController = require("../controller/storeController");

const storeRouter = express.Router();

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes",storeController.getHomes);
storeRouter.get("/bookings",storeController.getBookings);
storeRouter.get("/favorites",storeController.getFavoriteList);

module.exports = storeRouter;
