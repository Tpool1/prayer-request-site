const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const mongoURI = process.env.MONGODB_URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema and model for prayer requests
const prayerRequestSchema = new mongoose.Schema({
    name: String,
    email: String,
    request: String,
    date: { type: Date, default: Date.now }
});

const PrayerRequest = mongoose.model('PrayerRequest', prayerRequestSchema);

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/prayer-requests', async (req, res) => {
    const { name, email, request } = req.body;
    if (name && email && request) {
        const newRequest = new PrayerRequest({ name, email, request });
        await newRequest.save();
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get('/api/prayer-requests', async (req, res) => {
    const prayerRequests = await PrayerRequest.find().sort({ date: -1 });
    res.json({ prayerRequests });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
