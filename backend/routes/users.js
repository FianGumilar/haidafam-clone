const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const { updateUser,
        deleteUser,
        getAllUsers,
        getUserById } = require('../controllers/user');

const { verifyToken, verifyUser,verifyAdmin } = require('../utils/verifyToken')
/*
router.get('/check', verifyToken, (req, res, next) => {
    res.send('Hello, Youre logged in');
});

router.get('/checkuser/:id', verifyUser, (req, res, next) => {
    res.send('Hello, You can update and delete your account');
});

router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
    res.send('Hello, You can delete all accounts');
});
*/
//UPDATE
router.patch('/:id', verifyUser, updateUser);

//DELETE
router.delete('/:id', verifyUser, deleteUser);

//GET ALL
router.get('/', verifyAdmin, getAllUsers);

//GET BY ID
router.get('/:id',  verifyUser, getUserById);

module.exports = router;
