
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
    

const QuerySchema = new mongoose.Schema({
    question: String,
    answer: String,
});

const Query = mongoose.model('Query', QuerySchema);


app.post('/api/chat', async (req, res) => {
    const { query } = req.body;

    try {
        const result = await Query.findOne({ question: query });
        if (result) {
            res.json({ reply: result.answer });
        } else {
            res.json({ reply: "Sorry, I don't know the answer to that." });
        }
    } catch (error) {
        res.status(500).json({ reply: 'An error occurred. Please try again later.' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    });