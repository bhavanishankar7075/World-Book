# 📚 World Book

A full-stack book discovery platform that automatically scrapes and indexes thousands of books from [worldofbooks.com](https://www.worldofbooks.com) using a headless browser pipeline. Built with Next.js, NestJS, TypeScript, Playwright, BullMQ, and Redis.

[![GitHub](https://img.shields.io/badge/GitHub-World--Book-black?style=for-the-badge&logo=github)](https://github.com/bhavanishankar7075/World-Book)
![NestJS](https://img.shields.io/badge/NestJS-Backend-E0234E?style=for-the-badge&logo=nestjs)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-000000?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript)

---

## 📌 What Is This?

World Book is a web scraping + display platform. The backend runs a **Playwright-powered headless Chromium pipeline** that crawls worldofbooks.com, extracts navigation categories, subcategories, product listings, and product details — and stores everything in MongoDB. The Next.js frontend serves this data as a fast, SEO-optimized book discovery interface.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Next.js Frontend                     │
│         (SSR + SSG, TanStack Query, Tailwind CSS)        │
└────────────────────────┬────────────────────────────────┘
                         │ REST API
┌────────────────────────▼────────────────────────────────┐
│                   NestJS Backend                         │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  Scrape      │  │  BullMQ      │  │  Swagger      │  │
│  │  Pipeline    │  │  Job Queue   │  │  API Docs     │  │
│  │ (Playwright) │  │  (Redis)     │  │               │  │
│  └──────────────┘  └──────────────┘  └───────────────┘  │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│   MongoDB (Products, Categories, Navigation, Reviews)    │
│   Redis   (Queue management + Caching)                  │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwindcss)

- **Framework:** Next.js 16 (App Router, SSR/SSG)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **Data Fetching:** TanStack Query (React Query) v5
- **SEO:** Built-in sitemap.ts, robots.ts, dynamic metadata per product page
- **HTTP:** Axios

### Backend
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)
![Redis](https://img.shields.io/badge/Redis-BullMQ-DC382D?logo=redis)

- **Framework:** NestJS v11 (modular, enterprise-grade)
- **Language:** TypeScript (strict)
- **Database:** MongoDB + Mongoose ODM
- **Scraping:** Playwright (headless Chromium)
- **Job Queue:** BullMQ + Redis (background scrape jobs)
- **Caching:** NestJS Cache Manager + Redis
- **Rate Limiting:** NestJS Throttler
- **API Docs:** Swagger / OpenAPI (`@nestjs/swagger`)
- **Validation:** class-validator + class-transformer
- **DevOps:** Docker, Docker Compose, GitHub Actions CI/CD

---

## ✨ Features

### 🕷️ Automated Scraping Pipeline
The backend runs a multi-stage Playwright scraping pipeline:

```
Stage 1: Scrape Navigation  →  Extract all top-level collections from worldofbooks.com
Stage 2: Scrape Categories  →  Extract subcategories for each navigation item
Stage 3: Scrape Products    →  Extract product listings per category (title, price, image, slug)
Stage 4: Scrape Details     →  Extract full product details (description, specs, ratings)
```

- Uses headless Chromium via Playwright
- Delay between requests to avoid rate limiting
- Upsert strategy — re-running never creates duplicates
- BullMQ job queue handles background processing

### 📖 Book Discovery Interface
- Browse books by navigation category and subcategory
- Product listing pages with filters
- Individual product detail pages with SEO metadata
- Search across the entire catalogue
- Skeleton loading states throughout for smooth UX
- Browsing history tracker

### 🔧 Admin Panel
- Trigger full scrape pipeline via API
- Recalculate category product counts
- Scrape missing product details on demand
- View scrape job status

### 🚀 Performance & SEO
- Next.js App Router with server-side rendering
- Dynamic `sitemap.ts` and `robots.ts` for search engine indexing
- Per-product metadata (title, description) for SEO
- TanStack Query for client-side caching and background updates

---

## 📁 Project Structure

```
World-Book/
├── frontend/                    # Next.js application
│   └── src/
│       ├── app/
│       │   ├── page.tsx         # Homepage — navigation categories
│       │   ├── category/        # Category listing pages
│       │   ├── product/[slug]/  # Product detail pages (SSR + metadata)
│       │   ├── search/          # Search page
│       │   ├── admin/           # Admin panel
│       │   ├── sitemap.ts       # Auto-generated sitemap
│       │   └── robots.ts        # robots.txt config
│       ├── components/          # ProductCard, Navbar, Footer, Skeletons
│       └── lib/                 # API client, React Query setup
│
└── backend/                     # NestJS application
    ├── src/
    │   ├── scrape/              # Playwright scraping service + controller
    │   ├── product/             # Product module (schema, service, controller)
    │   ├── category/            # Category module
    │   ├── navigation/          # Navigation module
    │   ├── product-detail/      # Product detail schema
    │   ├── review/              # Review schema
    │   ├── history/             # Browsing history module
    │   ├── analytics/           # Analytics module
    │   ├── queue/               # BullMQ queue module
    │   └── config/              # MongoDB config
    ├── Dockerfile
    ├── docker-compose.yml       # API + Redis services
    └── .github/workflows/ci.yml # GitHub Actions CI pipeline
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/navigation` | Get all top-level navigation items |
| GET | `/category` | Get all categories |
| GET | `/product` | Get products (with filters) |
| GET | `/product/:slug` | Get single product detail |
| GET | `/product/search` | Search products by query |
| POST | `/scrape/full` | Trigger full scrape pipeline |
| POST | `/scrape/missing-details` | Scrape products missing detail data |
| POST | `/scrape/recalc-counts` | Recalculate category product counts |
| GET | `/analytics` | Platform usage analytics |
| GET | `/history` | User browsing history |

> Full API documentation available at `/api` (Swagger UI) when backend is running.

---

## ⚙️ Local Setup

### Prerequisites
- Node.js (LTS)
- MongoDB (local or Atlas)
- Redis (local or Docker)
- Docker & Docker Compose (optional but recommended)

### Option A — Docker (Recommended)
```bash
git clone https://github.com/bhavanishankar7075/World-Book.git
cd World-Book/backend

# Create .env file
cp .env.example .env  # fill in MONGO_URI

# Start API + Redis
docker-compose up --build
# Backend runs on http://localhost:3001
```

### Option B — Manual

**Backend:**
```bash
cd backend
npm install
```

Create `.env`:
```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/worldbook
REDIS_HOST=localhost
REDIS_PORT=6379
```

```bash
npm run start:dev   # http://localhost:3001
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev         # http://localhost:3000
```

### Trigger the Scraper
Once the backend is running, start the full data pipeline:
```bash
curl -X POST http://localhost:3001/scrape/full
```
This scrapes navigation → categories → products from worldofbooks.com and populates MongoDB.

---

## 🗄️ Database Schema

| Collection | Key Fields |
|---|---|
| **navigation** | title, slug, last_scraped_at |
| **categories** | title, slug, navigation_id, product_count, last_scraped_at |
| **products** | title, slug, author, price, currency, image_url, source_url, category_id |
| **product_details** | product_id, description, specs, ratings_avg, reviews_count |
| **reviews** | product_id, rating, comment |
| **history** | session/user browsing records |

---

## 🐳 Docker

```yaml
# docker-compose.yml
services:
  api:
    build: .
    ports: ["3001:3001"]
    depends_on: [redis]
  redis:
    image: redis
    ports: ["6379:6379"]
```

---

## 🔄 CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push:
- Install dependencies
- TypeScript type check
- ESLint lint check
- Run Jest unit tests
- Build NestJS production bundle

---

## 🔮 Future Improvements

- User accounts and personal reading lists
- Price tracking and alerts for specific books
- Full-text search with Elasticsearch
- Scheduled scraping with cron jobs (auto-refresh data)
- Kubernetes deployment for horizontal scaling
- Rate-limited public API for third-party consumption

---

## 👨‍💻 Author

**Bhavani Shankar Mandala**  
[LinkedIn](https://www.linkedin.com/in/bhavani-shankar-mandala-b728782ba/) • [GitHub](https://github.com/bhavanishankar7075)
