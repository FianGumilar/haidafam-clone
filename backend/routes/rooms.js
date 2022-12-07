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
router.post('/rooms', verifyAdmin, createRoom)

// UPDATE ROOM
router.patch('/:roomID/rooms', verifyAdmin, updateRoom)

// DELETE ROOM
router.delete('/:roomID/rooms', verifyAdmin, deleteRoom)

//GET ALL ROOM
router.get('/rooms', getAllRooms)

//GET ROOM BY ID
router.get('/:roomID/rooms', verifyUser, getRoomById)

module.exports = router;
