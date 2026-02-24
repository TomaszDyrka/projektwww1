# POL.IT - Strona WWW z zapleczem (Backend)

Projekt na zaliczenie ćwiczeń. Jest to strona internetowa firmy świadczącej profesjonalne usługi informatyczne, wyposażona w responsywny frontend oraz działający serwer backendowy.

## 🛠 Wykorzystane technologie

**Frontend:**
- HTML5
- CSS3 (Responsywny design - Flexbox/Grid)
- JavaScript (Fetch API do komunikacji z serwerem)

**Backend:**
- Node.js
- Express.js (routing, serwer statyczny)
- SQLite3 (baza danych z relacjami)
- dotenv (zarządzanie zmiennymi środowiskowymi)

## ✨ Zrealizowane wymagania

1. **Frontend**: 
   - 4 połączone ze sobą podstrony (Strona główna, O Nas, Oferta, Kontakt) + Panel Administratora (`/admin.html`).
   - Responsywny design dopasowany do urządzeń mobilnych.
   - Komunikacja asynchroniczna z użyciem `fetch`.
2. **Backend (API RESTful)**: 
   - 4 endpointy (GET, POST, PUT, DELETE) dla wiadomości.
   - Obsługa błędów.
3. **Baza danych**: 
   - SQLite - 2 tabele (`clients` oraz `messages`) połączone relacją `FOREIGN KEY`.
4. **Dodatkowe**: 
   - Podział na foldery (`models`, `public`, `routes`).
   - Konfiguracja w pliku `.env`.
   - Plik `package.json`.

## 🚀 Instrukcja uruchomienia

Aby uruchomić projekt na swoim lokalnym komputerze, wykonaj poniższe kroki w terminalu:

1. Przejdź do głównego folderu projektu.
2. Zainstaluj niezbędne zależności wpisując:
   ```bash
   npm install
   ```
3. Upewnij się, że w głównym folderze istnieje plik `.env` z zawartością np.:
   ```text
   PORT=2004
   ```
4. Uruchom serwer aplikacji:
   ```bash
   node server.js
   ```
5. Otwórz przeglądarkę i wejdź pod adres:
   [http://localhost:2004](http://localhost:2004)

## 📌 Testowanie bazy danych (Panel Administratora)

- Aby dodać wiadomość do bazy: Wypełnij formularz w zakładce "Kontakt".
- Aby zarządzać bazą (wyświetlanie, edycja, usuwanie): Wybierz opcję *Super tajna strona* z menu na stronie głównej lub wejdź na adres [http://localhost:2004/admin.html](http://localhost:2004/admin.html).
