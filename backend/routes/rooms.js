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

router.post('/:hotelId', verifyAdmin, createRoom)

router.patch('/:id', verifyAdmin, updateRoom)

router.delete('/:id', verifyAdmin, deleteRoom)

router.get('/', getAllRooms)

router.get('/:id', verifyUser, getRoomById)

module.exports = router;
