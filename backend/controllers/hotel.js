const Hotel = require('../models/Hotel');

exports.createHotel = async(req,res, next) => {
    const newHotel = new Hotel(req.body)  ;
    try {
      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
    } catch(err) {
      res.status(500).json(err);
    }
}

exports.updateHotel = async(req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { $new: true });
          res.status(200).json(updatedHotel);
      } catch(err) {
        res.status(500).json(err);
      }
}

exports.deleteHotel = async(req, res, next) => {
    const {id} = req.params;

    try {
      await Hotel.findByIdAndDelete(id);
      res.status(200).json("deleted successfully!");  
    } catch(err) {
      res.status(500).json(err);
    }
}

exports.getAllHotels = async(req, res, next) => {
    try { 
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
      } catch(err) {
        next(err);
      }
}

exports.getHotelById = async(req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel);
      } catch(err) {
        res.status(500).json(err);
      }
}