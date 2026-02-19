# Dexterous Barber Lounge

## Overview
A single-page React website for Dexterous Barber Lounge, a barbershop in Newark, CA. The site features service listings, a portfolio gallery, reviews, contact form, and booking integration via Square.

## Project Architecture
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS v4 (via @tailwindcss/postcss)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build**: Vite bundler

## Structure
- `index.html` - Entry HTML file
- `src/App.jsx` - Main React component containing all pages (Home, Service, Portfolio, Contact, About)
- `src/main.jsx` - React entry point
- `src/index.css` - Tailwind CSS import
- `vite.config.js` - Vite configuration (port 5000, all hosts allowed)
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration

## Development
- Run: `npm run dev` (starts on port 5000)
- Build: `npm run build` (outputs to `dist/`)

## Deployment
- Static deployment from `dist/` directory
