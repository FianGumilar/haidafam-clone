const express = require('express');
const router = express.Router();

const {
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
} = require('../controllers/room')

const {verifyAdmin, verifyUser} = require('../utils/verifyToken')

// CREATE ROOM
router.post('/:hotelId', verifyAdmin, createRoom)

// UPDATE ROOM
router.patch('/:id', verifyAdmin, updateRoom)

// DELETE ROOM
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom)

//GET ALL ROOM
router.get('/', getAllRooms)

//GET ROOM BY ID
router.get('/:id', verifyUser, getRoomById)

module.exports = router;
