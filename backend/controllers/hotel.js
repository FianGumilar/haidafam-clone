const { countDocuments } = require('../models/Hotel');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

exports.createHotel = async(req,res, next) => {
    const newHotel = new Hotel(req.body);
    try {
      const savedHotel = await newHotel.save();
      return res.status(200).json(savedHotel);
    } catch(err) {
      return res.status(500).json(err);
    }
}

exports.updateHotel = async(req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { $new: true });
          return res.status(200).json("Update successfully");
      } catch(err) {
        return res.status(500).json(err);
      }
}

exports.deleteHotel = async(req, res, next) => {
    const {id} = req.params;

    try {
      await Hotel.findByIdAndDelete(id);
      return res.status(200).json("deleted successfully!");  
    } catch(err) {
      return res.status(500).json(err);
    }
}

exports.getAllHotels = async(req, res, next) => {
  const cities = req.query.citiess.split(",");
    try { 
        const hotels = await Hotel.find();
          return res.status(200).json(hotels);
      } catch(err) {
        return next(err);
      }
}

exports.getHotelById = async(req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        return res.status(200).json(hotel);
      } catch(err) {
        return res.status(500).json(err);
      }
}

exports.countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    return res.status(200).json(list);
  } catch (err) { 
    next(err);
  }
};

// exports.countByType = async (req, res, next) => {
//   try {
//     const hotelCount = await Hotel.countDocuments({type: "hotel"});
//     const villaCount = await Hotel.countDocuments({type: "villa"});
    
//     return res.status(200).json([
//       { type: "hotel", count: hotelCount},
//       { type: "villa", count: villaCount} 
//     ])
//   } catch (err) {
//     return next(err);
//   }
// }
// Error
// exports.getHotelRooms = async (req, res, next) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id);
//     const list = await Promise.all(
//       hotel.rooms.map((room) => {
//         return Room.findById(room);
//       })
//     );
//     return res.status(200).json(list)
//   } catch (err) {
//     return next(err);
//   }
// };