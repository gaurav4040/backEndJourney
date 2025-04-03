const express = require("express");

const storeController = require("../controller/storeController");

const storeRouter = express.Router();

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes",storeController.getHomes);
storeRouter.get("/bookings",storeController.getBookings);
storeRouter.get("/favorites",storeController.getFavoriteList);
storeRouter.post("/favorites",storeController.postAddToFavorite);
storeRouter.get("/homes/:homeId",storeController.getHomeDetails);
storeRouter.post("/favorites/delete/:homeId",storeController.postRemoveFavorite);
module.exports = storeRouter;
