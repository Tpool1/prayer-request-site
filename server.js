const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let prayerRequests = [];

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/prayer-requests', (req, res) => {
    const { name, email, request } = req.body;
    if (name && email && request) {
        prayerRequests.push({ name, email, request });
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get('/api/prayer-requests', (req, res) => {
    res.json({ prayerRequests });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
