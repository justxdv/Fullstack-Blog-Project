const express = require('express');
const app = express();
const cors = require('cors');

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const userRoute = require('./routes/users');
const categoryRoute = require('./routes/categories');

const multer = require('multer');
const path = require('path');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// connect to MongoDB

mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true, useUnifiedTopology: true 
})
.then(console.log('Connected to MongoDB'))
.catch(err => console.log('error',err));  

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/user', userRoute);
app.use('/api/categories', categoryRoute);

// Image upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (req.file) {
      res.status(200).json({ message: 'Image uploaded successfully', file: req.file });
    } else {
      res.status(400).json({ message: 'No image uploaded' });
    }
  });


app.listen(process.env.PORT||"5000", () => {
    console.log(`Backend server is running on ${process.env.PORT}`);
});