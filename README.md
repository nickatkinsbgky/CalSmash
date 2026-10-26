# CalSmash

A modern, standalone web calendar viewer that unifies events from multiple **Microsoft / Outlook**, **Google Calendar**, and **iCloud** sources into one clean FullCalendar view.

**CalSmash** smashes all your calendars into a single, beautiful interface.

## Features
- Add multiple Outlook.com, Hotmail, Microsoft 365, or work/school accounts
- Add Google accounts (personal or Workspace)
- iCloud via CalDAV (requires your own Cloudflare Worker proxy for private calendars)
- Public shared calendar ICS links
- Fetches every calendar from each account
- Unified month / week / day / list views with color-coding
- Toggle individual calendars on/off
- Progressive Web App
- Pure client-side for Outlook & Google; iCloud needs a tiny proxy

## Setup

### Microsoft / Outlook
1. Azure Portal → Microsoft Entra ID → App registrations → New registration.
2. Name: `CalSmash`
3. Supported accounts: any org directory + personal Microsoft accounts
4. Redirect URI (SPA): your Pages URL or `http://localhost:5500`
5. Copy the Application (client) ID → replace `YOUR_MS_CLIENT_ID_HERE` in `index.html`
6. API permissions → Microsoft Graph → Delegated → `Calendars.Read` + `User.Read`

### Google Calendar
1. Google Cloud Console → enable Google Calendar API
2. Create OAuth client ID (Web application)
3. Authorized JavaScript origins: your deployment origin
4. Copy Client ID → replace `YOUR_GOOGLE_CLIENT_ID_HERE` in `index.html`

### iCloud (full private support)
Apple blocks direct browser access to CalDAV. Deploy the included proxy:

1. Open `icloud-proxy-worker.js` in this repo.
2. Go to [Cloudflare Workers dashboard](https://dash.cloudflare.com) → Workers & Pages → Create.
3. Paste the worker code and deploy.
4. Copy the worker URL (e.g. `https://calsmash-icloud.yourname.workers.dev`).
5. In `index.html`, set:
   ```js
   const ICLOUD_PROXY_URL = 'https://calsmash-icloud.yourname.workers.dev';
   ```
6. Generate an app-specific password at [appleid.apple.com](https://appleid.apple.com) → Sign-In and Security → App-Specific Passwords.
7. Use **Add iCloud** and enter your Apple ID + the app-specific password.

**Security note:** The app-specific password is sent through the worker you deploy. Keep the worker private or restricted.

Public shared calendars can still be added via ICS link without a proxy.

## Run / Deploy

### Local
```bash
npx serve .
```

### GitHub Pages
Settings → Pages → Deploy from `main` branch / root.  
Live: `https://nickatkinsbgky.github.io/CalSmash/`

## Usage
1. Add Outlook / Google / iCloud accounts.
2. Events load color-coded by account.
3. Toggle calendars in the sidebar.
4. Refresh as needed.

Built as an improved multi-provider calendar viewer.
