# 🏦 Household Book App

Eine moderne Full‑Stack‑Plattform zur Verwaltung von Einnahmen und Ausgaben.  
Das Projekt umfasst:

- **Backend:** Node.js, Express, PostgreSQL, JWT‑Authentifizierung  
- **Frontend:** React (Vite), Axios  
- **Datenbank:** PostgreSQL  
- **Containerisierung:** Docker & Docker‑Compose  
- **CI/CD:** GitHub Actions + AWS ECS Deployment  
- **Architektur:** Saubere Trennung von Models, Services, Controllern und Routes  

---

## 🚀 Features

### 🔐 Benutzerverwaltung
- Registrierung & Login
- Passwort‑Hashing (bcrypt)
- JWT‑basierte Authentifizierung
- Geschützte API‑Routen

### 💰 Haushaltsbuch‑Funktionen
- Transaktionen anlegen (Einnahmen/Ausgaben)
- Transaktionsliste pro Benutzer
- Monatsübersicht (Income, Expenses, Balance)
- Kategorien & Datum

### 🌐 REST‑API (Express)
- `/api/auth/register`
- `/api/auth/login`
- `/api/transactions` (GET/POST)

### 🎨 Frontend (React)
- Login‑Maske
- Dashboard
- Transaktionsliste
- API‑Kommunikation via Axios

### 🐳 Docker‑Compose Umgebung
- Backend‑Service
- Frontend‑Service
- PostgreSQL‑Service
- Persistente Volumes

### ☁️ AWS Deployment (optional)
- Docker‑Images → ECR
- Deployment → ECS Fargate
- Automatisiert via GitHub Actions

---

## 📁 Projektstruktur

