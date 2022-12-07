const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const { createUser,
        updateUser,
        deleteUser,
        getAllUsers,
        getUserById } = require('../controllers/user');

const { verifyToken, verifyUser,verifyAdmin } = require('../utils/verifyToken')

//CREATE
router.post('/create', verifyUser, createUser);

//UPDATE
router.patch('/:id/edit', verifyUser, updateUser);

//DELETE
router.delete('/:id', verifyUser, deleteUser);

//GET ALL
router.get('/', verifyUser, getAllUsers);

//GET BY ID
router.get('/:id',  verifyUser, getUserById);

module.exports = router;
