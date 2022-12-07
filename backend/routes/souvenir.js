const express = require('express');
const router = express.Router();

const { 
    createSouvenir,
    updateSouvenir,
    deleteSouvenir,
    getAllSouvenirByHotelId,
    getSouvenirById, 
 } = require('../controllers/souvenir');

const { verifyAdmin, verifyUser} = require('../utils/verifyToken');

//CREATE SOUVENIR =
router.post('/souvenirs', verifyAdmin, createSouvenir);

// UPDATE SOUVENIR =
router.patch('/:id/souvenirs', verifyAdmin, updateSouvenir);

//DELETE SOUVENIR =
router.delete('/:id/souvenirs', verifyAdmin, deleteSouvenir);

//GET ALL SOUVENIR BY HOTEL ID =
router.get('/souvenirs', getAllSouvenirByHotelId);

//GET SOUVENIR BY ID =
router.get('/:id/souvenirs', getSouvenirById);

module.exports = router;