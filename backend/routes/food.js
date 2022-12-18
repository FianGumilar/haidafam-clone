const express = require('express');
const router = express.Router();

const { 
    createFood,
    updateFood,
    deleteFood,
    getAllFoodByHotelId,
    getFoodById } = require('../controllers/food');

const { verifyAdmin, verifyUser } = require('../utils/verifyToken');

//CREATE FOOD =
router.post('/foods', verifyAdmin, createFood);

// UPDATE FOOD =
router.patch('/:id/foods', verifyAdmin, updateFood);

//DELETE FOOD =
router.delete('/:id/foods', verifyAdmin, deleteFood);

//GET ALL FOOD BY HOTEL ID =
router.get('/foods', getAllFoodByHotelId);

//GET FOOD BY ID =
router.get('/:id/foods', getFoodById);

module.exports = router;