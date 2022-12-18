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
router.post('/:hotelid/rooms', verifyAdmin, createRoom)

// UPDATE ROOM
router.patch('/:id/:hotelid/rooms', verifyAdmin, updateRoom)

// DELETE ROOM
router.delete('/:id/:hotelid/rooms', verifyAdmin, deleteRoom)

//GET ALL ROOM
router.get('/rooms', getAllRooms)

//GET ROOM BY ID
router.get('/:id/:hotelid/rooms', verifyUser, getRoomById)

module.exports = router;
