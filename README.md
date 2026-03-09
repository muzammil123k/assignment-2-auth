# Full-Stack Authentication & AI Dashboard

**Author:** Muzammil Idrees
**Project:** Assignment 2 - Authentication System

A robust, full-stack SvelteKit application demonstrating advanced authentication, role-based access control (RBAC), secure email verification, and AI integration.

## ✨ Features

* **Multi-Provider Authentication:** Secure login using custom Email/Password credentials, Google OAuth, and GitHub OAuth via Auth.js.
* **Strict Verification Flow:** Users are blocked from logging in until they verify their email via a secure, expiring link sent via Nodemailer.
* **Password Reset:** Complete self-service password reset pipeline with secure, temporary email tokens.
* **Role-Based Access Control (RBAC):** Distinct `user` and `admin` roles, protected via SvelteKit server hooks and layout guards.
* **Admin Dashboard:** Dedicated admin panel for managing users, tracking analytics, and modifying roles (e.g., suspending users).
* **AI Integration:** Integrated Google Gemini AI chat interface.

## 🛠️ Tech Stack

* **Framework:** SvelteKit (Svelte 5)
* **Database:** PostgreSQL (Containerized via Docker)
* **ORM:** Drizzle ORM
* **Authentication:** Auth.js (`@auth/sveltekit`)
* **Styling:** Tailwind CSS
* **Mailing:** Nodemailer (SMTP)
* **AI:** Google Gemini API (`@ai-sdk/svelte`)

## 🚀 Local Development Setup

### 1. Prerequisites
Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) & [pnpm](https://pnpm.io/)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for the database)

### 2. Environment Variables
Create a `.env` file in the root directory and populate it with your credentials:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/assignment2"

# Auth.js Configuration
AUTH_SECRET="generate-a-random-secret-key"

# OAuth Providers
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"
GOOGLE_ID="your_google_client_id"
GOOGLE_SECRET="your_google_client_secret"

# Nodemailer Configuration (Use an App Password, not a standard account password)
EMAIL_USER="your.email@gmail.com"
EMAIL_PASS="your_16_character_app_password"

# AI Integration
GEMINI_API_KEY="your_google_gemini_api_key"
```

### 3. Start the Database
Spin up the PostgreSQL instance using Docker:

```bash
docker-compose up -d
```

### 4. Install Dependencies & Push Schema
Install the required packages and push the Drizzle schema to the database:

```bash
pnpm install
pnpm db:push
```

### 5. Run the Application
Start the development server:

```bash
pnpm dev
```

Navigate to http://localhost:5173 in your browser.
