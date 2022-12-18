const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const { createHelp, updateHelp, deleteHelp, getAllHelps } = require('../controllers/help'); 
const { verifyAdmin, verifyUser } = require('../utils/verifyToken'); 

//CREATE HELP
router.post('/', [
    body('question')
        .isString()
        .trim()
        .isLength({ min: 5, max: 100 }),
    body('answer')
        .isString()
        .trim()
        .isLength({ min: 5, max: 200 }),
], verifyAdmin, createHelp);

//UPDATE HELP
router.patch('/:id', [
    body('question', 'max length input question is 100')
        .isString()
        .trim()
        .isLength({ min: 5, max: 100 }),
    body('answer', 'max length input answer is 200')
        .isString()
        .trim()
        .isLength({ min: 5, max: 400 }),
] ,verifyAdmin, updateHelp);

//DELETE HELP
router.delete('/:id', verifyAdmin, deleteHelp);

//GET ALL HELP
router.get('/', verifyUser, getAllHelps)

module.exports = router;