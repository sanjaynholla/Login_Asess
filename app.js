const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');

app.use(express.json());

const authenticateUser = require('./middleware/authentication');
const auth = require('./routes/auth');
const home = require('./routes/home');
const notfound = require('./middleware/NotFoundError');

app.use('/api/v1/auth', auth);
app.use('/api/v1/home', authenticateUser, home);
app.use(notfound);

const PORT = process.env.PORT || 3000;
const URL = process.env.MONGO_URI;

const startServer = async () => {
    try {
        const resp = await connectDB(URL)
        // console.log(resp);
        app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

startServer()