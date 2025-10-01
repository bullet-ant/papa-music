# Papa Music - YouTube Audio Downloader

A Progressive Web App (PWA) for downloading audio from YouTube with ease.

## Features

- 🎵 Extract audio from YouTube videos
- 📱 Installable as a mobile app (PWA)
- 🎨 Clean, modern UI with dark mode
- 💾 Multiple audio quality options
- ⚡ Fast and responsive

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running (see server folder)

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your API URL:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

```bash
npm run build
npm start
```

## PWA Installation

### On Android:

1. Build and run in production mode
2. Open the app in Chrome/Edge on your Android device
3. Tap the menu (⋮) → "Install app" or "Add to Home Screen"

### On Desktop:

1. Visit the app in Chrome/Edge
2. Click the install icon (⊕) in the address bar

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |

## Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Set the `NEXT_PUBLIC_API_URL` environment variable to your production API URL
2. Build and deploy as usual

Example for Vercel:
```bash
vercel env add NEXT_PUBLIC_API_URL
```

## Tech Stack

- **Framework**: Next.js 15
- **UI**: Tailwind CSS + shadcn/ui
- **PWA**: next-pwa
- **Icons**: Lucide React

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
