# CalSmash

A modern, standalone web calendar viewer that unifies events from multiple Microsoft / Outlook accounts into one clean FullCalendar view.

**CalSmash** smashes all your Outlook calendars into a single, beautiful interface.

## Features
- Add multiple Outlook.com, Hotmail, Microsoft 365, or work/school accounts
- Fetches every calendar (primary + secondary) from each account
- Unified month / week / day / list views with color-coding per account
- Toggle individual calendars on/off
- Progressive Web App (install to home screen)
- Pure client-side (MSAL.js + Microsoft Graph) — no backend, tokens stay in your browser

## Setup (required)

1. Go to [Azure Portal](https://portal.azure.com) → Microsoft Entra ID → App registrations → New registration.
2. Name: `CalSmash`
3. Supported account types: **Accounts in any organizational directory and personal Microsoft accounts**
4. Redirect URI: Single-page application (SPA) → your deployment URL (e.g. `https://yourdomain.com/` or GitHub Pages URL) or `http://localhost:5500` for local.
5. Register and copy the **Application (client) ID**.
6. In `index.html`, replace `YOUR_CLIENT_ID_HERE` with that ID.
7. API permissions → Add a permission → Microsoft Graph → Delegated → `Calendars.Read` and `User.Read`.

## Run / Deploy

### Local
```bash
npx serve .
# or python -m http.server 5500
```
Open the served URL and set the redirect URI accordingly.

### GitHub Pages
Push to a repo and enable Pages from the root of the `main` branch.

## Usage
1. Click **Add Account** and sign in (select account each time for multiples).
2. Events load automatically, color-coded by account.
3. Check/uncheck calendars in the sidebar.
4. Switch views or click Refresh.

Built as an improved, rebranded version of the original Outlook Unified Calendar concept.
