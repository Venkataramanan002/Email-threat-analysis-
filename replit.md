# Tirreno - Cybersecurity Platform

## Overview
Tirreno is a Vite + React + TypeScript cybersecurity platform with AI-driven security analysis features. It provides real-time threat detection, user behavior monitoring, and comprehensive security dashboards.

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Charts**: Recharts

### Directory Structure
```
src/
├── components/       # React components (Dashboard, ThreatDetection, UserManagement, etc.)
├── services/         # API services and data aggregation
│   ├── api.ts                     # Base API client
│   ├── ipService.ts               # IPify & IPInfo integration
│   ├── googleService.ts           # Google OAuth and Gmail API
│   ├── threatIntelligenceService.ts # Shodan, Censys, GreyNoise, AlienVault
│   ├── dataAggregationService.ts  # Unified data enrichment
│   ├── userDataService.ts         # User data aggregation
│   └── behaviorTrackingService.ts # Session behavior tracking
├── config/           # Configuration files
│   └── apiKeys.ts    # API keys configuration
├── pages/            # Page components (OAuthCallback, etc.)
├── hooks/            # Custom React hooks
└── lib/              # Utility functions
```

### Data Flow
1. **IP Detection**: IPify API → IPInfo API → Real location data
2. **Google OAuth**: Stores real profile data in localStorage
3. **Gmail API**: Stores email metadata/settings in localStorage
4. **Threat Intelligence**: Shodan, Censys, GreyNoise, AlienVault APIs
5. **Components**: Read from localStorage with proper loading/error states

### Key Features
- Real-time IP and location detection
- Google OAuth integration for user profile
- Gmail API integration for email security analysis
- Multi-source threat intelligence (Shodan, Censys, GreyNoise, AlienVault)
- User behavior tracking and session monitoring
- Risk score calculation and classification
- PDF report generation

## Development

### Running Locally
```bash
npm install
npm run dev
```
The development server runs on port 5000.

### Building for Production
```bash
npm run build
```
Output is in the `dist` directory.

## Deployment
- **Type**: Static site deployment
- **Build Command**: `npm run build`
- **Public Directory**: `dist`

## Security Configuration

### API Keys Setup
All API keys are loaded from environment variables (no hardcoded values in code).
Set the following environment variables in Replit Secrets:

**Required for basic functionality:**
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON` - Supabase anon key (client-safe, RLS protected)

**Optional API integrations:**
- `VITE_IPINFO_TOKEN` - IP geolocation
- `VITE_FIREBASE_API_KEY` - Firebase (public config)
- `VITE_SHODAN_API_KEY` - Shodan threat intel
- `VITE_CENSYS_API_ID` / `VITE_CENSYS_API_SECRET` - Censys
- `VITE_GREYNOISE_API_KEY` - GreyNoise
- `VITE_ALIENVAULT_OTX_API_KEY` - AlienVault OTX
- `VITE_VIRUSTOTAL_API_KEY` - VirusTotal
- `VITE_ABUSEIPDB_API_KEY` - AbuseIPDB

### Security Notes
- **SUPABASE_SERVICE_ROLE** is intentionally NOT included (never expose in frontend)
- For production, threat intelligence API calls should be proxied through a backend
- Firebase and Supabase anon keys are designed for client-side use (with security rules)

## Recent Changes
- **Security**: Removed all hardcoded API keys, now loaded from environment variables
- **Security**: Removed SUPABASE_SERVICE_ROLE from frontend (critical fix)
- **Landing Page**: Created Email Threat Analysis marketing page with Tahoe glass theme
- Configured Vite for Replit proxy compatibility
- Fixed LSP errors in service files
- All components properly display loading/error states
