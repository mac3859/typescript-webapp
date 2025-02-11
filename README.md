# Test summary attached at the end
[Jump to Test result](#test-result)



# TypeScript Web Application

A modern web application built with React, TypeScript, and Vite, featuring comprehensive testing setup with Playwright and BrowserStack integration.

## Project Overview

This project is a TypeScript-based web application that demonstrates modern web development practices and tooling:

- **Frontend**: React with TypeScript
- **Build Tool**: Vite
- **Testing**: Playwright for end-to-end testing
- **Cross-browser Testing**: BrowserStack integration
- **Authentication**: Firebase Authentication

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd typescript-webapp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
- Copy `frontend/.env.example` to `frontend/.env`
- Configure your Firebase credentials

4. Start the development server:
```bash
cd frontend
npm run dev
```

## Testing

### Local Testing

Run Playwright tests locally:
```bash
npm test
```

### BrowserStack Testing

Run tests on BrowserStack:
```bash
npm run test:browserstack
```

The BrowserStack configuration supports:
- Chrome (latest)
- Firefox (latest)
- Safari (latest) on OS X Monterey

## Project Structure

```
├── frontend/           # React + TypeScript frontend application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── tests/         # Frontend tests
├── tests/             # E2E tests
└── playwright.config.ts # Playwright configuration
```

## Development

- The application uses Vite for fast development and building
- Hot Module Replacement (HMR) is enabled by default
- ESLint is configured for TypeScript and React


# Test Result


![Screenshot 2025-02-11 at 4 24 42 PM](https://github.com/user-attachments/assets/2e0b8b97-6989-4678-a8da-fc0a8ed8c376)

