const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
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
router.post('/', [
  body('name')
    .isString()
    .isLength({ min: 5 })
    .trim(),
  body('type')
    .custom((value, {req}) => {
      if(value !== 'hotel') {
        throw new Error('type must be hotel')
      }
      return true;
    }),
  body('city', 'address', 'facilities')
    .isLength({ min: 4 })
    .trim(),
  body('description', 'facilities')
    .isLength({ min:5, max: 400 })
    .trim(),
  body('cheapestPrice', 'starType').isFloat()
], verifyAdmin, createHotel);

//UPDATE
router.patch('/:id', [
  body('name')
    .isString()
    .isLength({ min: 5 })
    .trim(),
  body('type')
    .custom((value, {req}) => {
      if(value !== 'hotel') {
        throw new Error('type must be hotel')
      }
      return true;
    }),
  body('city', 'address', 'facilities')
    .isLength({ min: 4 })
    .trim(),
  body('description', 'facilities')
    .isLength({ min:5, max: 400 })
    .trim(),
  body('cheapestPrice', 'starType').isFloat()
], verifyAdmin ,updateHotel);

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
