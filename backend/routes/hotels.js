const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const { 
  countByCity,
  countByType,
  createHotel,
  updateHotel,
  deleteHotel,
  getAllHotels,
  getHotelRoom,
  getHotelById,
  getHotelRooms, } = require('../controllers/hotel');

const { verifyAdmin, verifyUser } = require('../utils/verifyToken')

//CREATE
router.post('/', verifyAdmin, createHotel);

//UPDATE
router.patch('/:id',verifyAdmin ,updateHotel);

//DELETE
router.delete('/:id', verifyAdmin, deleteHotel);

//GET ALL
router.get('/', getAllHotels);

//GET BY ID
router.get('/:id', getHotelById);

//COUNT BY CITY
router.get('/countByCity', countByCity)

//COUNT BY TYPE
router.get('/countByType', countByType)

//GET HOTEL ROOMS
router.get('/room/:id', getHotelRooms)

module.exports = router;
