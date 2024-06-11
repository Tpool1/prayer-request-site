const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Replace the following with your MongoDB connection string
require('dotenv').config();
const uri = process.env.MONGODB_URI;

let db, prayerRequestsCollection;

// Connect to MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        db = client.db('prayerRequestsDB'); // Database name
        prayerRequestsCollection = db.collection('prayerRequests'); // Collection name
        console.log('Connected to Database');
    })
    .catch(error => console.error(error));

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/prayer-requests', (req, res) => {
    const { name, email, request } = req.body;
    if (name && email && request) {
        prayerRequestsCollection.insertOne({ name, email, request })
            .then(result => {
                res.json({ success: true });
            })
            .catch(error => {
                console.error(error);
                res.json({ success: false });
            });
    } else {
        res.json({ success: false });
    }
});

// Root route
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.get('/api/prayer-requests', (req, res) => {
    prayerRequestsCollection.find().toArray()
        .then(results => {
            res.json({ prayerRequests: results });
        })
        .catch(error => {
            console.error(error);
            res.json({ prayerRequests: [] });
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
