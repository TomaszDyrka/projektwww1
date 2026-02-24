require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models/db'); 

// ------------------------------------------ //

const app = express();
const PORT = process.env.PORT || 2004;

app.use(cors()); // komunikacja front z back
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'html')));

app.use('/api', require('./routes/api')); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error('Błąd na serwerze:', err.stack);
    res.status(500).json({ error: 'Wewnętrzny błąd serwera. Spróbuj ponownie później.' });
});

// ------------------------------------------ //

app.listen(PORT, () => {
    console.log(`Serwer działa! Otwórz w przeglądarce: http://localhost:${PORT}`);
});
