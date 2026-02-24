const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err.message);
    } 
    else {
        console.log('Połączono z bazą danych SQLite.');
        db.run('PRAGMA foreign_keys = ON'); // żeby klucze obce działały - sqlite3
        createTables();
    }
});

function createTables() {
    // Tak jak w wymaganiach planuję zrobić 2 tabele, jedna zawierająca klientów a druga zawierająca wiadomości tychże klientów
    db.run(`CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE
    )`);
}

module.exports = db;
