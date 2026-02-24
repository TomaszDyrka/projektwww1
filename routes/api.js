const express = require('express');
const router = express.Router();
const db = require('../models/db');

// 1. POST
router.post('/messages', (req, res) => {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ error: 'Wszystkie pola są wymagane.' });
    }

    db.run(`INSERT OR IGNORE INTO clients (email) VALUES (?)`, [email], function(err) {
        if (err) return res.status(500).json({ error: 'Błąd bazy danych podczas dodawania klienta.' });

        db.get(`SELECT id FROM clients WHERE email = ?`, [email], (err, row) => {
            if (err) return res.status(500).json({ error: 'Błąd podczas pobierania danych klienta.' });
            
            const clientId = row.id;

            db.run(`INSERT INTO messages (client_id, subject, message) VALUES (?, ?, ?)`,
                [clientId, subject, message],
                function(err) {
                    if (err) return res.status(500).json({ error: 'Błąd podczas zapisywania wiadomości.' });
                    res.status(201).json({ message: 'Wiadomość wysłana pomyślnie!', id: this.lastID });
                }
            );
        });
    });
});

// 2. GET
router.get('/messages', (req, res) => {
    const query = `
        SELECT messages.id, clients.email, messages.subject, messages.message
        FROM messages
        JOIN clients ON messages.client_id = clients.id
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Błąd podczas pobierania wiadomości.' });
        res.json(rows);
    });
});

// 3. PUT 
router.put('/messages/:id', (req, res) => {
    const messageId = req.params.id; 
    const { subject, message } = req.body;

    db.run(`UPDATE messages SET subject = ?, message = ? WHERE id = ?`,
        [subject, message, messageId],
        function(err) {
            if (err) return res.status(500).json({ error: 'Błąd podczas aktualizacji.' });
            if (this.changes === 0) return res.status(404).json({ error: 'Nie znaleziono wiadomości o podanym ID.' });
            res.json({ message: 'Wiadomość zaktualizowana pomyślnie.' });
        }
    );
});

// 4. DELETE 
router.delete('/messages/:id', (req, res) => {
    const messageId = req.params.id;

    db.run(`DELETE FROM messages WHERE id = ?`, [messageId], function(err) {
        if (err) return res.status(500).json({ error: 'Błąd podczas usuwania.' });
        if (this.changes === 0) return res.status(404).json({ error: 'Nie znaleziono wiadomości o podanym ID.' });
        res.json({ message: 'Wiadomość została usunięta.' });
    });
});

module.exports = router; 
