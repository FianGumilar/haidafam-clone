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

//GET BY ID
router.get('/find/:id', getHotelById);

//GET ALL
router.get('/', getAllHotels);

//COUNT BY CITY
router.get('/countByCity', countByCity)

//COUNT BY TYPE
//router.get('/countByType', countByType)


module.exports = router;
