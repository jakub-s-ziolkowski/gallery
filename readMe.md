# Funckje aplikacji

- logowanie i rejestracja nowych użytkowników
- przeglądanie obrazów i galerii dodanych przez użytkowników
- zarządzanie galeriami

# Wykorzystane technologie

- Node
- Express
- React
- MongoDB

# Wykorzystane pakiety

- express: ^4.19.2,
- jsonwebtoken: ^9.0.2
- mongoose: ^8.4.1
- react: ^18.3.1
- react-dom: ^18.3.1
- react-router-dom: ^6.23.1
- react-scripts: 5.0.1
- sass": ^1.77.4
- web-vitals": ^2.1.4

# Opis interfejsu

- **/** - strona główna
- **/gallery** - galerie użytkownika
- **/sign-in** - formularz logowania
- **/sign-up** - formularz rejestracji

---

- (POST) **/users/sign-up** - dodanie użytkownika do bazy
- (POST) **/users/sign-in** - logowanie użytkownika, generowanie tokenu
- (POST) **/users/auth** - autentykacja tokenem
- (GET) **/images/** - pobranie wszystkich obrazów z bazy
- (GET) **/images/:gallery** - pobranie obrazów z danej galerii
- (POST) **/galleries** - dodanie galerii do bazy
- (GET) **/galleries** - pobranie galerii z bazy
- (GET) **/galleries/:username** - pobranie galerii danego użytkownika
- (DELETE) **/galleries/:name** - usunięcie danej galerii z bazy

# Modele w bazie danych

- **User**
    - *username*: String
    - *password*: String

- **Image**
    - *owner*: String
    - *gallery*: String
    - *source*: String
    - *description*: String

- **Gallery**
    - *owner*: String
    - *name*: String

# Uruchomienie aplikacji

```bash
cd client
npm install
npm run build
cd ..
cd server
npm install
npm start
```
