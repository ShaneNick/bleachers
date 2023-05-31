const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/signup', userController.renderSignup);
router.post('/', userController.registerUser);
router.get('/login', userController.renderLogin);
router.get('/chat', userController.isAuthenticated, userController.renderChat);
router.post('/login', userController.loginUser);
router.get('/getNickname/:userId', userController.getNickname);
router.get('/chatroom/:roomName', userController.isAuthenticated, userController.renderChatroom);

module.exports = router;

