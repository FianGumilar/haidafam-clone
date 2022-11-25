const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const { 
  createHotel,
  updateHotel,
  deleteHotel,
  getAllHotels,
  getHotelById, } = require('../controllers/hotel');

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

module.exports = router;
