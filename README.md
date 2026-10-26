# CalSmash

A modern, standalone web calendar viewer that unifies events from multiple **Microsoft / Outlook** and **Google Calendar** accounts into one clean FullCalendar view.

**CalSmash** smashes all your calendars into a single, beautiful interface.

## Features
- Add multiple Outlook.com, Hotmail, Microsoft 365, or work/school accounts
- Add Google accounts (personal or Workspace)
- Fetches every calendar (primary + secondary) from each account
- Unified month / week / day / list views with color-coding per account
- Toggle individual calendars on/off
- Progressive Web App (install to home screen)
- Pure client-side (MSAL.js + Microsoft Graph + Google Identity Services) — no backend, tokens stay in your browser

## Setup (required)

### Microsoft / Outlook
1. Go to [Azure Portal](https://portal.azure.com) → Microsoft Entra ID → App registrations → New registration.
2. Name: `CalSmash`
3. Supported account types: **Accounts in any organizational directory and personal Microsoft accounts**
4. Redirect URI: Single-page application (SPA) → your deployment URL (e.g. `https://nickatkinsbgky.github.io/CalSmash/` or `http://localhost:5500` for local).
5. Register and copy the **Application (client) ID**.
6. In `index.html`, replace `YOUR_MS_CLIENT_ID_HERE` with that ID.
7. API permissions → Add a permission → Microsoft Graph → Delegated → `Calendars.Read` and `User.Read`.

### Google Calendar
1. Go to [Google Cloud Console](https://console.cloud.google.com/) → Create or select a project.
2. Enable the **Google Calendar API**.
3. APIs & Services → Credentials → Create Credentials → OAuth client ID → Web application.
4. Name: `CalSmash`
5. Authorized JavaScript origins: your deployment origin (e.g. `https://nickatkinsbgky.github.io` or `http://localhost:5500`).
6. Authorized redirect URIs: same as the origin + path if needed (often just the origin for GIS).
7. Copy the **Client ID**.
8. In `index.html`, replace `YOUR_GOOGLE_CLIENT_ID_HERE` with that ID.
9. Under OAuth consent screen, add the scope `https://www.googleapis.com/auth/calendar.readonly` (or configure as needed for testing).

## Run / Deploy

### Local
```bash
npx serve .
# or python -m http.server 5500
```
Open the served URL and set the origins/redirects accordingly.

### GitHub Pages
In the repo Settings → Pages → Source: Deploy from branch `main` / root.  
Live URL: `https://nickatkinsbgky.github.io/CalSmash/`

## Usage
1. Click **Add Outlook** or **Add Google** and sign in (select account each time for multiples).
2. Events load automatically, color-coded by account, with a provider badge.
3. Check/uncheck calendars in the sidebar.
4. Switch views or click Refresh.
5. Google tokens expire; re-click **Add Google** if prompted to refresh.

Built as an improved, rebranded version of the original Outlook Unified Calendar concept, now with multi-provider support.
