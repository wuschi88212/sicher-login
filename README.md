SandoMedia Secure Login - Demo

Inhalt:
- index.html - öffentliche Startseite (Link zur Loginseite)
- login.html - Loginformular (Benutzername + Passwort)
- geheim.html - geschützte Seite (SandoMedia in Regenbogenfarben)
- server.js - Express-Server: prüft Login, setzt signed cookie
- package.json - npm Scripts & Abhängigkeiten
- vercel.json - (optional) Vercel-Konfiguration
- style.css & client.js - Frontend Styles & Login JS

Benutzerkonto (Demo):
- Benutzername: peter
- Passwort: (das von dir gewählte Passwort, gehasht auf dem Server)

Wichtig:
- Setze in Vercel das Umgebungsvariable COOKIE_SECRET mit einem sicheren Wert.
  Beispiel: in Vercel Dashboard -> Project Settings -> Environment Variables:
    COOKIE_SECRET = 'ein sehr langes geheimnis'
- Deployment-Empfehlung: Deploye das Repository auf Vercel (connect GitHub),
  und stelle sicher, dass die Node.js-Version 18+ ist.

Lokales Testen:
1. Entpacke den Ordner.
2. npm install
3. npm start
4. Öffne http://localhost:3000
