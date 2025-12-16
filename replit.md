# Email Threat Analysis Platform

## Overview
An AI-powered security platform for email threat analysis. Detects phishing, malware, and suspicious activity before they become threats.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack React Query
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Backend Services**: Supabase, Firebase

## Project Structure
```
src/
├── components/      # React components including shadcn/ui
│   └── AccountDropdown.tsx  # User profile dropdown with dev mode toggle
├── config/          # API keys and Firebase configuration
├── data/            # Sample data (empty fallbacks, no fake data)
├── hooks/           # Custom React hooks
├── integrations/    # Supabase client
├── lib/             # Utility functions
├── pages/           # Route pages
├── services/        # API and business logic services
│   ├── deviceFingerprintService.ts  # Deterministic browser fingerprinting
│   ├── sessionTimeService.ts        # Session time tracking with persistence
│   └── devModeService.ts            # Dev mode subscription/theme management
└── utils/           # Helper utilities
```

## Key Features

### Device Fingerprinting
Deterministic fingerprints generated from browser characteristics (userAgent, platform, screen resolution, timezone, language) instead of random values.

### Session Time Tracking
Tracks total time spent since first login, persisted in localStorage across sessions. Updates periodically and on page unload.

### Dev Mode
Subscription-based developer mode with dark green theme, glass-effect UI, and DEV MODE badge.

### Real Data Only
No fake/sample users or metrics. Shows empty states when data is unavailable. User data comes from Google OAuth profile.

## Development
- **Port**: 5000 (frontend)
- **Dev Server**: `npm run dev`
- **Build**: `npm run build`

## Configuration
- Vite is configured with `allowedHosts: true` for Replit proxy compatibility
- Host binds to `0.0.0.0` for network access

## Recent Changes (December 2025)
- Removed all fake sample data (John Doe, Jane Smith, etc.)
- Added deterministic device fingerprinting
- Implemented session time tracking with persistence
- Created AccountDropdown component with dev mode subscription
- Added dev mode theme (dark green, glass effects)
