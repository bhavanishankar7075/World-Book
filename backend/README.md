
---

## 1️⃣ Swagger / API Documentation

### Install

```bash
npm install @nestjs/swagger swagger-ui-express
```

### Update `main.ts`

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalGuards(new ThrottlerGuard());

  const config = new DocumentBuilder()
    .setTitle("World Books API")
    .setDescription("Product Data Explorer – REST API")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
```

Visit:

```
http://localhost:3001/api/docs
```

---

## 2️⃣ GitHub Actions – CI Pipeline

Create: `.github/workflows/ci.yml`

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

---

## 3️⃣ Docker Setup

### `Dockerfile`

```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["node", "dist/main.js"]
```

### `docker-compose.yml`

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

## 4️⃣ Final Backend README.md (replace yours)

````md
# 🌍 World Books – Product Data Explorer (Backend)

Production-ready NestJS backend that scrapes live book data from **worldofbooks.com**, persists it, and exposes REST APIs.

---

## 🚀 Tech Stack
- NestJS
- MongoDB + Mongoose
- Playwright
- Redis
- Swagger
- Docker
- GitHub Actions CI

---

## ⚙️ Setup

```bash
npm install
npm run start:dev
````

---

## 🔐 Environment

```env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/product-explorer
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## 📡 APIs

| Method | Endpoint               | Description                   |
| ------ | ---------------------- | ----------------------------- |
| GET    | /navigation            | Navigation headings           |
| GET    | /category/:slug        | Category products             |
| GET    | /products/:slug        | Product detail                |
| POST   | /scrape/navigation     | Trigger navigation scrape     |
| POST   | /scrape/category       | Trigger category scrape       |
| POST   | /scrape/products       | Trigger product scrape        |
| POST   | /scrape/product-detail | Trigger product detail scrape |

---

## 📄 Swagger Docs

```
http://localhost:3001/api/docs
```

---

## 🐳 Docker

```bash
docker-compose up --build
```

---

## 🧪 CI

GitHub Actions pipeline auto-builds backend on every push.

---



