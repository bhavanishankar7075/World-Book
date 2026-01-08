

---

# 📚 World Books – Product Data Explorer (Frontend)

A modern full-stack book discovery platform that scrapes real-world product data from **WorldOfBooks**, enriches it with metadata, and presents it through a powerful searchable interface.

This frontend is built with **Next.js App Router**, optimized for SEO, performance, and professional UX.

---

## 🚀 Tech Stack

| Technology              | Usage                |
| ----------------------- | -------------------- |
| Next.js 14 (App Router) | Frontend Framework   |
| TypeScript              | Type safety          |
| Tailwind CSS            | UI Styling           |
| Axios                   | API Communication    |
| Skeleton UI             | Loading placeholders |

---

## 📁 Folder Structure

```
frontend/
 ├── src/
 │   ├── app/
 │   │   ├── page.tsx
 │   │   ├── search/
 │   │   │   ├── page.tsx
 │   │   │   └── layout.tsx
 │   │   ├── category/[...slug]/page.tsx
 │   │   ├── product/[slug]/page.tsx
 │   │   └── layout.tsx
 │   ├── components/
 │   │   ├── Navbar.tsx
 │   │   ├── SkeletonGrid.tsx
 │   │   └── ProductCard.tsx
 │   ├── lib/
 │   │   └── api.ts
 │   └── globals.css
 └── README.md
```

---

## ⚙️ Environment Setup

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## ▶ Run Frontend

```bash
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🔎 Application Routes

| Feature       | Route                           | Description                          |
| ------------- | ------------------------------- | ------------------------------------ |
| Home          | `/`                             | Navigation categories                |
| Category View | `/category/collections/...slug` | Books inside selected category       |
| Product Page  | `/product/:slug`                | Full book detail page                |
| Search Page   | `/search?q=yellowface`          | Search books with filters & sorting  |
| Admin Stats   | `/analytics` (API)              | Analytics dashboard backend endpoint |

---

## ✨ Key Features

* Real-time book scraping
* SEO-friendly metadata generation
* Smart search with sorting
* Skeleton loading UI
* Fully responsive layout
* MongoDB powered product system

---

## 🧪 Example Search

```
http://localhost:3000/search?q=yellowface
```

---

## 🧠 Project Purpose

This project demonstrates real-world skills in:

* Web scraping automation
* Data persistence & normalization
* SEO metadata handling
* Frontend-backend system design

---

