
---

# 🌍 World Books – Product Data Explorer (Backend)

A production-ready NestJS backend that scrapes live book data from **worldofbooks.com**, enriches product metadata, and exposes REST APIs for the frontend.

---

## 🚀 Tech Stack

| Technology | Purpose                |
| ---------- | ---------------------- |
| NestJS     | Backend Framework      |
| MongoDB    | Primary Database       |
| Mongoose   | ODM Layer              |
| Playwright | Web Scraping Engine    |
| Redis      | Job Queue / Cache      |
| Swagger    | API Documentation      |
| Docker     | Containerization       |
| GitHub CI  | Continuous Integration |

---

## ⚙️ Setup Instructions

```bash
npm install
npm run start:dev
```

Backend runs at:

```
http://localhost:3001
```

---

## 🔐 Environment Variables

Create `.env` in backend root:

```env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/product-explorer
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## 📡 API Endpoints

| Method | Endpoint                | Description                    |
| ------ | ----------------------- | ------------------------------ |
| GET    | /navigation             | Navigation headings            |
| GET    | /category/:slug         | Category products              |
| GET    | /products/:slug         | Product detail page            |
| GET    | /products/search        | Search with sorting & filters  |
| GET    | /analytics              | System analytics dashboard     |
| POST   | /scrape/full            | Trigger full scraping pipeline |
| POST   | /scrape/missing-details | Scrape missing product details |

---

## 📄 Swagger Documentation

After starting backend, open:

```
http://localhost:3001/api/docs
```

You will see fully interactive API documentation.

---

## 🐳 Docker Setup

### Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["node", "dist/main.js"]
```

---

### docker-compose.yml

```yaml
version: "3"

services:
  api:
    build: .
    ports:
      - "3001:3001"
    env_file:
      - .env
    depends_on:
      - redis

  redis:
    image: redis
    ports:
      - "6379:6379"
```

Run:

```bash
docker-compose up --build
```

---

## 🔄 CI Pipeline (GitHub Actions)

Create file:

```
.github/workflows/ci.yml
```

```yaml
name: Backend CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run lint
      - run: npm run build
```


