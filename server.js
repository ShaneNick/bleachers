const User = require('./models/users');
const Room = require('./models/room');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mysql = require('mysql2/promise');
const env = require('dotenv').config();
const session = require('express-session');
const sequelize = require('./config/connection');
const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

const exphbs = require('express-handlebars');
//serving handlebars  
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

function isAuthenticated(req, res, next) {
  if (req.session.nickname) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.get('/', (req, res) => {
  res.render('signup', { logged_in: req.session.nickname ? true : false });
});


//handles user registration
app.post('/api/users', async (req, res) => {
  try {
    const { nickname, password } = req.body;

    // Check if the user with the provided nickname already exists
    const existingUser = await User.findOne({ where: { nickname } });

    if (existingUser) {
      res.status(409).json({ success: false, message: 'Nickname already in use. Please choose another one.' });
    } else {
      // Create a new user using the User model
      const newUser = await User.create({ nickname, password });

      // Save the user's nickname in the session
      req.session.nickname = newUser.nickname;

      res.json({ success: true, message: 'User registration successful.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'User registration failed.' });
  }
});


// redirect to signup page
app.get('/signup', (req, res) => {
  res.render('signup', { logged_in: req.session.nickname ? true : false });
});


// login route
app.get('/login', (req, res) => {
  res.render('login', { logged_in: req.session.nickname ? true : false });
});

// chat route
app.get('/chat', isAuthenticated, (req, res) => {
  res.render('chatroom', { logged_in: true, name: req.session.nickname });
});

// chatroom route
app.get('/chatRoomPage', isAuthenticated, (req, res) => {
  res.render('chatRoomPage', { logged_in: true, name: req.session.nickname });
});


// login route
app.post('/api/users/login', async (req, res) => {
  try {
    const { nickname, password } = req.body;
    const user = await User.findOne({ where: { nickname } });

    if (user && user.checkPassword(password)) {
      req.session.nickname = user.nickname; // Save the user's nickname in the session
      res.json({ success: true, message: 'Login successful.' });
    } else {
      res.json({ success: false, message: 'Invalid nickname or password.' });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Login failed.' });
  }
});

//Saves chat rooms to sql
async function saveRoom(roomName){
  try {
      const newRoom = await Room.create({ name: roomName }); // Make sure the property matches your model definition
      console.log('New room created:', newRoom.id);
      return newRoom;
  } catch (error) {
      console.error('Error creating new room:', error);
  }
}

//Route for creating rooms
// Route for creating rooms
app.post('/api/createRoom', async (req, res) => {
  try {
    const { roomName } = req.body;

    // Check if the room with the provided name already exists
    const existingRoom = await Room.findOne({ where: { name: roomName } });

    if (existingRoom) {
      return res.status(409).json({ success: false, message: 'Room name already in use. Please choose another one.' });
    }

    // Create a new room using the Room model
    const newRoom = await Room.create({ name: roomName });
    res.json({ success: true, message: 'Room created successfully.', roomName: newRoom.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to create room.' });
  }
});

// Route for getting the rooms
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    res.status(500).send('Error fetching rooms');
  }
});


//Pulls nickname from db
app.get("/api/getNickname/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findByPk(userId);
  if (user) {
    res.json({ nickname: user.nickname });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


io.on("connection", (socket) => {
  console.log("User has Connected " + socket.id);

  socket.on("message", (data) => {
    console.log("Message received:", data);
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("User has Disconnected");
  });
});

//Rooms function--------------

const rooms = {}



app.get('/chatroom/:roomName', isAuthenticated, (req, res) => {
  res.render('chat', { 
    logged_in: true, 
    name: req.session.nickname, 
    roomName: req.params.roomName 
  });
});



http.listen(port, () => {
  console.log('Server is listening on', port);
})




