 <p align="center">
  <img src="https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs" />
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker" />
  <img src="https://img.shields.io/badge/Tests-Vitest-6E9F18?logo=vitest" />
  <img src="https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions" />
</p>

# 💶 Haushaltsbuch – Finanzverwaltung

**Haushaltsbuch** ist eine Full-Stack-Webanwendung zur übersichtlichen Verwaltung persönlicher Einnahmen und Ausgaben. Nutzer können ein Konto erstellen, sich anmelden und ihre Buchungen verwalten. Ein Dashboard fasst Einnahmen, Ausgaben und den aktuellen Saldo zusammen und stellt die finanzielle Übersicht zusätzlich grafisch dar.

Das Frontend basiert auf React und kommuniziert über eine REST-API mit einem Node.js-/Express-Backend. PostgreSQL übernimmt die dauerhafte Speicherung der Daten. Die Anwendung lässt sich mit Docker Compose starten.

---

## 🚀 Funktionen

- 👤 **Benutzerkonto:** Registrierung und Anmeldung mit E-Mail-Adresse und Passwort
- 🔐 **Authentifizierung:** Absicherung geschützter API-Endpunkte mit JSON Web Tokens (JWT)
- 💰 **Einnahmen verwalten:** Einnahmen mit Betrag, Kategorie, Datum und Notiz erfassen, bearbeiten und löschen
- 💸 **Ausgaben verwalten:** Ausgaben mit Betrag, Kategorie, Datum und Notiz erfassen, bearbeiten und löschen
- 📋 **Buchungsübersicht:** Persönliche Transaktionen anzeigen und einzelne Buchungen aufrufen
- 📊 **Dashboard:** Gesamteinnahmen, Gesamtausgaben und Saldo auf einen Blick
- 🍩 **Diagramm:** Grafische Gegenüberstellung von Einnahmen und Ausgaben
- 💾 **Persistente Speicherung:** Benutzer und Buchungen werden in PostgreSQL gespeichert
- 🔌 **REST-API:** Kommunikation zwischen React-Frontend und Express-Backend
- 🧪 **Automatisierte Tests:** Unit- und Komponententests mit Vitest und React Testing Library
- 🔄 **Continuous Integration:** Automatische Ausführung der Frontend-Tests mit GitHub Actions
- 🐳 **Docker Compose:** Frontend, Backend und Datenbank gemeinsam starten

---

## 🧰 Verwendete Technologien

| Bereich | Technologie |
|---|---|
| Backend | Node.js 22, Express 5 |
| Schnittstelle | REST API |
| Authentifizierung | JSON Web Token (JWT), bcryptjs |
| Frontend | React 19, JavaScript, Vite |
| Routing | React Router |
| Benutzeroberfläche | Tailwind CSS 4 |
| Diagramme | Chart.js, react-chartjs-2 |
| HTTP-Kommunikation | Fetch API |
| Datenbank | PostgreSQL 16 |
| Datenbankzugriff | node-postgres (`pg`) |
| Containerisierung | Docker, Docker Compose |
| Testframework | Vitest |
| Komponententests | React Testing Library, user-event |
| CI | GitHub Actions |

---

## ⚙️ Installation & Setup (Docker)

### 🔸 Voraussetzungen

- Docker Desktop inklusive Docker Compose
- Git (optional, zum Klonen des Repositorys)

### 🔸 Schritte

1. **Repository klonen**

   ```bash
   git clone https://github.com/yvanzambou/household-book-app.git
   cd household-book-app
   ```

2. **Umgebungsvariablen konfigurieren**

   Erstelle im Ordner `backend` eine Datei namens `.env`. Du kannst dafür die Beispieldatei kopieren:

   ```bash
   cp backend/.env.example backend/.env
   ```

   Unter Windows PowerShell:

   ```powershell
   Copy-Item backend/.env.example backend/.env
   ```

   Passe anschließend die Werte in `backend/.env` an:

   ```env
   DATABASE_URL=postgres://admin:secret@db:5432/household
   JWT_SECRET=DEIN_LANGER_ZUFAELLIGER_GEHEIMSCHLUESSEL
   PORT=4000
   ```

   `DATABASE_URL` muss zu den Zugangsdaten des PostgreSQL-Services in `docker-compose.yml` passen. Ändere bei Bedarf Benutzername, Passwort und Datenbank sowohl dort als auch in der Verbindungs-URL. Verwende für `JWT_SECRET` einen eigenen zufälligen und ausreichend langen Schlüssel.

3. **Container starten**

   Führe den folgenden Befehl im Projekt-Hauptverzeichnis aus:

   ```bash
   docker compose up --build -d
   ```

4. **Anwendung im Browser öffnen**

   - **Frontend:** http://localhost:3000
   - **Backend-API:** http://localhost:4000/api
   - **PostgreSQL:** `localhost:5432`

5. **Status und Logs prüfen**

   ```bash
   docker compose ps
   docker compose logs -f
   ```

   Einzelne Services lassen sich gezielt anzeigen:

   ```bash
   docker compose logs -f backend
   docker compose logs -f frontend
   docker compose logs -f db
   ```

> **Hinweis:** Die Datenbank wird beim Start des Backends anhand des SQL-Schemas unter `backend/src/db/schema.sql` initialisiert. Das Docker-Volume `db_data` speichert die Daten dauerhaft.

---

## 🧑‍💻 Verwendung

1. **Konto erstellen:** Öffne die Anwendung und registriere dich mit Name, E-Mail-Adresse und Passwort.
2. **Anmelden:** Melde dich mit deinen Zugangsdaten an.
3. **Dashboard ansehen:** Das Dashboard zeigt deine Einnahmen, Ausgaben und den daraus berechneten Saldo.
4. **Buchung erfassen:** Lege eine Einnahme oder Ausgabe an und ergänze Betrag, Kategorie, Datum und optional eine Notiz.
5. **Buchungen verwalten:** Sieh dir deine Buchungen an, bearbeite sie oder lösche sie bei Bedarf.

Jeder Benutzer erhält nur Zugriff auf seine eigenen Buchungen.

---

## 🔌 REST-API

Die API ist unter `http://localhost:4000/api` erreichbar.

### Authentifizierung

| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `POST` | `/api/auth/register` | Benutzerkonto erstellen |
| `POST` | `/api/auth/login` | Anmelden und JWT erhalten |

### Buchungen

Die Buchungs-Endpunkte erfordern ein gültiges JWT. Das Token wird im HTTP-Header übergeben:

```http
Authorization: Bearer <token>
```

| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `GET` | `/api/transactions` | Eigene Buchungen auflisten |
| `POST` | `/api/transactions` | Neue Buchung erstellen |
| `GET` | `/api/transactions/:id` | Einzelne Buchung abrufen |
| `PUT` | `/api/transactions/:id` | Buchung bearbeiten |
| `DELETE` | `/api/transactions/:id` | Buchung löschen |

Eine Buchung verwendet unter anderem folgende Felder: `type` (`income` oder `expense`), `amount`, `category`, `note` und `date`.

---

## 🗄️ Datenbankzugriff

Die PostgreSQL-Datenbank ist lokal über Port `5432` erreichbar. Die Zugangsdaten werden im Service `db` in `docker-compose.yml` festgelegt.

Um eine PostgreSQL-Shell im laufenden Datenbank-Container zu öffnen:

```bash
docker compose exec db psql -U admin -d household
```

Nützliche SQL-Befehle:

```sql
-- Tabellen anzeigen
\dt

-- Benutzer anzeigen
SELECT id, name, email FROM users;

-- Buchungen anzeigen
SELECT * FROM transactions;
```

Die Datenbank enthält die Tabellen `users` und `transactions`. Buchungen sind über `user_id` einem Benutzer zugeordnet. Beim Löschen eines Benutzers werden seine Buchungen durch die Fremdschlüsselregel ebenfalls gelöscht.

---

## 🧱 Architektur

```text
React-Frontend (Vite)
       |
       | HTTP / REST + JWT
       v
Node.js-Backend (Express)
       |
       | node-postgres (pg)
       v
PostgreSQL-Datenbank
```

- **React:** Darstellung der Benutzeroberfläche und Navigation
- **Express:** REST-Endpunkte und Anwendungslogik
- **JWT:** Authentifizierung geschützter API-Anfragen
- **PostgreSQL:** Dauerhafte Speicherung von Benutzern und Buchungen
- **Docker Compose:** Koordination der Container

---

## 🧪 Automatisierte Tests

Für die Qualitätssicherung werden automatisierte Tests mit Vitest eingesetzt.

### Frontend

- **Vitest:** Ausführung der Unit-Tests
- **React Testing Library:** Testen von React-Komponenten
- **user-event:** Simulation von Benutzerinteraktionen
- **jest-dom:** Zusätzliche Assertions für DOM-Elemente

Die Tests überprüfen unter anderem die Formatierung von Währungsbeträgen und Datumswerten sowie die Funktionalität der Buchungsformulare.

### Tests lokal ausführen

Im Frontend-Verzeichnis:

```bash
npm run test -- --run
```

---

## 🔄 Continuous Integration

GitHub Actions übernimmt die automatische Ausführung der Frontend-Tests.

Der CI-Workflow wird bei folgenden Ereignissen gestartet:

- Push auf den Branch `main` oder `master`
- Pull Requests gegen `main` oder `master`

### Ablauf der Pipeline

1. **Repository auschecken:** GitHub lädt den aktuellen Quellcode.
2. **Node.js einrichten:** Die benötigte Node.js-Version wird bereitgestellt.
3. **Abhängigkeiten installieren:** `npm ci` installiert die Pakete anhand der `package-lock.json`.
4. **Tests ausführen:** Vitest startet die automatisierten Unit- und Komponententests.

Die Pipeline verwendet `Europe/Berlin` als Zeitzone, damit Datums- und Uhrzeittests unabhängig von der standardmäßigen UTC-Zeitzone des GitHub-Runners mit der lokalen deutschen Zeitzone ausgeführt werden.

Der Status der Testausführung kann im GitHub-Repository unter **Actions** eingesehen werden.

---

## 🛑 Anwendung stoppen

Die Container stoppen, ohne das persistente Datenbank-Volume zu löschen:

```bash
docker compose down
```

**Achtung:** `docker compose down --volumes` löscht auch das persistente Datenbank-Volume `db_data` und damit die darin gespeicherten Daten. Verwende diesen Befehl nur, wenn du die Daten bewusst entfernen möchtest.

---

## 💡 Mögliche Erweiterungen

- 🧪 Erweiterung der automatisierten Tests um Backend-Unit- und Integrationstests
- 🔎 Filterung und Sortierung der Buchungen nach Zeitraum, Kategorie und Typ
- 📅 Monats- und Jahresauswertungen
- 🎯 Budgets und Ausgabenlimits pro Kategorie
- 📈 Erweiterte Statistiken und Auswertungen
- 📤 Export von Buchungen, beispielsweise als CSV
- ☁️ Bereitstellung einer öffentlichen Live-Demo

---

## 📄 Hinweis

Das Haushaltsbuch ist ein Portfolio-Projekt zur praktischen Anwendung von Konzepten der Full-Stack-Webentwicklung. Es verbindet ein React-Frontend mit einer REST-API auf Basis von Node.js und Express sowie einer PostgreSQL-Datenbank. Die Anwendung demonstriert unter anderem Benutzerregistrierung, JWT-basierte Authentifizierung, CRUD-Operationen, automatisierte Tests, Continuous Integration und Containerisierung mit Docker Compose.

---

## 👤 Autor

**Yvan Zambou**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profil-blue?logo=linkedin)](https://linkedin.com/in/yvan-zambou-29aba9261)
[![GitHub](https://img.shields.io/badge/GitHub-Projekte-black?logo=github)](https://github.com/yvanzambou)