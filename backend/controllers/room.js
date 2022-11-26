const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const { createError } = require('../utils/error')


exports.createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    return res.status(200).json(savedRoom);
  } catch (err) {
    return next(err);
  }
};

exports.updateRoom = async(req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { $new: true });
          return res.status(200).json("update Room successfully");
      } catch(err) {
        return res.status(500).json(err);
      }
}

exports.deleteRoom = async(req, res, next) => {
    const hotelId = req.params.hotelid;
    const {id} = req.params;

    try {
      await Room.findByIdAndDelete(id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
            $pull: { rooms: req.params.id } 
        });
    } catch(err) {
        next(err);
    }
    return res.status(200).json("deleted successfully");
    } catch(err) {
      return res.status(500).json(err);
    }
}

exports.getAllRooms = async(req, res, next) => {
    try { 
        const rooms = await Room.find();
        return res.status(200).json(rooms);
      } catch(err) {
        return next(err);
      }
}

exports.getRoomById = async(req, res, next) => {
    try {
        const room = await Room.findById(req.params.id)
        return res.status(200).json(room);
      } catch(err) {
        return res.status(500).json(err);
      }
}