# Strapi Crash Course

A full-stack blog application built with Strapi CMS (backend) and Astro (frontend), featuring PostgreSQL as the database. This project demonstrates how to create a headless CMS with multilingual support and dynamic page generation.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Features](#features)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This project consists of two main applications:
- **Blog (Strapi Backend)**: A headless CMS for managing blog content, pages, and components
- **UI (Astro Frontend)**: A fast, modern frontend for displaying the blog content

## 🛠 Tech Stack

### Backend (blog/)
- **Strapi v5.33.1** - Headless CMS
- **Node.js** (>=20.0.0 <=24.x.x)
- **PostgreSQL** - Database
- **React** - Admin panel UI

### Frontend (ui/)
- **Astro v5.16.6** - Static site generator
- **Marked** - Markdown parser
- **Node.js** - Runtime

### Infrastructure
- **Docker & Docker Compose** - PostgreSQL containerization

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 20.x to 24.x) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js, version >= 6.0.0)
- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop)
- **Git** - [Download here](https://git-scm.com/)

## 📥 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Strapi-Crash-Course
```

### 2. Start PostgreSQL Database

The project uses Docker Compose to run PostgreSQL:

```bash
docker-compose up -d
```

This will:
- Start a PostgreSQL container on port 5432
- Create a database named `blog`
- Set up default credentials (postgres/postgres)
- Persist data in a Docker volume

Verify the database is running:
```bash
docker-compose ps
```

### 3. Install Backend Dependencies

```bash
cd blog
npm install
```

### 4. Install Frontend Dependencies

```bash
cd ../ui
npm install
```

## 🚀 Running the Application

### Start the Backend (Strapi)

From the `blog/` directory:

```bash
# Run the setup
npm run setup

# Seed the database (if desired)

# Development mode (with auto-reload)
npm run dev

# Production mode
npm run build
npm run start
```

The Strapi admin panel will be available at: **http://localhost:1337/admin**

On first run, you'll need to create an admin user account.

### Start the Frontend (Astro)

From the `ui/` directory:

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The frontend will be available at: **http://localhost:4321** (or the port shown in the terminal)

## 📁 Project Structure

```
Strapi-Crash-Course/
├── docker-compose.yml          # PostgreSQL container configuration
├── blog/                       # Strapi Backend
│   ├── config/                 # Strapi configuration files
│   │   ├── database.js         # Database connection settings
│   │   ├── server.js           # Server configuration
│   │   └── ...
│   ├── src/
│   │   ├── api/                # Content-type definitions
│   │   │   ├── blog/           # Blog content type
│   │   │   └── page/           # Page content type
│   │   ├── components/         # Reusable components
│   │   │   ├── about/          # About component
│   │   │   └── hero/           # Hero component
│   │   └── index.js            # Entry point
│   ├── database/               # Database migrations
│   ├── public/uploads/         # Uploaded media files
│   └── package.json
│
└── ui/                         # Astro Frontend
    ├── src/
    │   ├── components/         # Astro components
    │   │   ├── About.astro
    │   │   ├── Hero.astro
    │   │   └── MarkdownComponent.astro
    │   ├── layouts/            # Layout components
    │   │   ├── Layout.astro
    │   │   ├── Nav.astro
    │   │   └── Head.astro
    │   ├── pages/              # Route pages
    │   │   ├── index.astro
    │   │   └── blog/
    │   │       ├── [slug].astro
    │   │       └── es/         # Spanish locale
    │   └── lib/
    │       └── strapi.js       # Strapi API client
    ├── public/
    │   └── styles/
    └── package.json
```

## ✨ Features

- **Headless CMS**: Manage content through Strapi's intuitive admin panel
- **Content Types**: 
  - Blog posts with dynamic routing
  - Custom pages
- **Reusable Components**:
  - Hero sections
  - About sections
- **Multilingual Support**: Spanish (es) locale support
- **Pagination**: Blog pagination functionality
- **Markdown Support**: Rich content with markdown rendering
- **Media Management**: Upload and manage media files through Strapi
- **User Permissions**: Built-in user management with Strapi's users-permissions plugin

## 🔧 Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `blog/` directory (if needed for custom configuration):

```env
# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=blog
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres

# Server
HOST=0.0.0.0
PORT=1337

# Admin
ADMIN_JWT_SECRET=<your-admin-jwt-secret>
API_TOKEN_SALT=<your-api-token-salt>
APP_KEYS=<your-app-keys>
JWT_SECRET=<your-jwt-secret>
```

**Note**: Strapi will generate these secrets automatically on first run if not provided.

### Frontend Configuration

The frontend connects to the Strapi API. Check [ui/src/lib/strapi.js](ui/src/lib/strapi.js) to verify the API endpoint configuration.

## 📜 Available Scripts

### Backend (blog/)

```bash
npm run dev        # Start development server with auto-reload
npm run build      # Build for production
npm run start      # Start production server
npm run strapi     # Run Strapi CLI commands
npm run console    # Open Strapi console
npm run upgrade    # Upgrade Strapi to latest version
```

### Exporting and import database data
To export database data, make sure you are in the root folder of the Strapi project (blog). Then run the following command:

```bash
npm run strapi export -- --no-encrypt --file blog-data
```

To import database data, first ensure the database has been created. Then in the root folder of the Strapi project (blog), run:
```bash
npm run strapi import -- -f blog-data.tar
```

### Frontend (ui/)

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Docker

```bash
docker-compose up -d       # Start PostgreSQL in background
docker-compose down        # Stop PostgreSQL
docker-compose logs        # View PostgreSQL logs
docker-compose ps          # Check container status
```

## 🐛 Troubleshooting

### Database Connection Issues

If Strapi can't connect to PostgreSQL:
1. Verify Docker container is running: `docker-compose ps`
2. Check database logs: `docker-compose logs postgres`
3. Ensure port 5432 is not used by another service
4. Restart the database: `docker-compose restart postgres`

### Port Conflicts

If you get port conflicts:
- **Port 1337** (Strapi): Change in `blog/config/server.js`
- **Port 5432** (PostgreSQL): Change in `docker-compose.yml`
- **Port 4321** (Astro): Automatically assigns a different port if in use

### Node Version Issues

Ensure you're using Node.js version 20.x to 24.x:
```bash
node --version
```

Consider using [nvm](https://github.com/nvm-sh/nvm) to manage Node versions.

### Strapi Admin Not Loading

1. Clear browser cache
2. Try incognito/private mode
3. Rebuild Strapi admin: `npm run build` in the blog/ directory
4. Check console for JavaScript errors

### Missing Dependencies

If you encounter module errors:
```bash
# In blog/ or ui/ directory
rm -rf node_modules package-lock.json
npm install
```

## 📝 Getting Started Guide

1. **Clone and install** (see [Installation](#installation))
2. **Start PostgreSQL**: `docker-compose up -d`
3. **Start Strapi**: In `blog/`, run `npm run dev`
4. **Create admin account**: Visit http://localhost:1337/admin
5. **Create content**: Add blog posts and pages through the admin panel
6. **Start frontend**: In `ui/`, run `npm run dev`
7. **View your site**: Visit http://localhost:4321

## 📚 Additional Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Astro Documentation](https://docs.astro.build/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

## 📄 License

This project is for educational purposes.

---

**Happy coding! 🚀**
