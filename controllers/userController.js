const User = require('../models/users');

exports.isAuthenticated = (req, res, next) => {
  if (req.session.nickname) {
    next();
  } else {
    res.redirect('/login');
  }
};

exports.registerUser = async (req, res) => {
  // existing code here
};

exports.renderSignup = (req, res) => {
  // existing code here
};

exports.renderLogin = (req, res) => {
  // existing code here
};

exports.renderChat = (req, res) => {
  // existing code here
};

exports.loginUser = async (req, res) => {
  // existing code here
};

exports.getNickname = async (req, res) => {
  // existing code here
};

exports.renderChatroom = (req, res) => {
  // existing code here
};
