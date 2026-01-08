
---

# 📚 World Books – Frontend (Next.js)

A modern responsive frontend for the **World Books – Product Data Explorer** project.
This application allows users to browse book categories, view products, and explore individual book details with real-time scraped data.

---

## 🚀 Tech Stack

| Technology              | Usage                       |
| ----------------------- | --------------------------- |
| Next.js 14 (App Router) | Frontend Framework          |
| TypeScript              | Type safety                 |
| Tailwind CSS            | UI Styling                  |
| React Query (TanStack)  | API data fetching & caching |
| Axios                   | HTTP Client                 |

---

## 📁 Folder Structure

```
frontend/
 ├── src/
 │   ├── app/
 │   │   ├── page.tsx                # Homepage – Navigation List
 │   │   ├── category/[...slug]/
 │   │   │   └── page.tsx            # Category Products Page
 │   │   ├── product/[slug]/
 │   │   │   └── page.tsx            # Product Details Page
 │   │   ├── about/page.tsx
 │   │   ├── contact/page.tsx
 │   │   └── layout.tsx
 │   ├── components/
 │   │   └── Navbar.tsx
 │   ├── lib/queryClient.ts
 │   └── globals.css
 └── README.md
```

---

## ⚙️ Environment Variables

Create `.env.local` file in frontend root:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## ▶️ Run Frontend

```bash
npm install
npm run dev
```

Open browser:

```
http://localhost:3000
```

---

## 🔄 Application Flow

| Page     | Route                                                    | Description                                         |
| -------- | -------------------------------------------------------- | --------------------------------------------------- |
| Home     | `/`                                                      | Displays navigation categories scraped from backend |
| Category | `/category/collections/fiction-books`                    | Displays books inside selected category             |
| Product  | `/product/yellowface-book-rebecca-f-kuang-9780008532819` | Shows product details & description                 |
| About    | `/about`                                                 | Project info                                        |
| Contact  | `/contact`                                               | Contact form                                        |

---

## ⏳ Skeleton Loading

All product and category pages display **real skeleton loaders** instead of plain loading text for professional UX.

---

## 📦 API Integration

All frontend data is fetched from backend:

| API               | Purpose           |
| ----------------- | ----------------- |
| `/navigation`     | Navigation list   |
| `/category/:slug` | Category products |
| `/products/:slug` | Product details   |

---

## 📱 Responsive Design

* Mobile: 2 column layout
* Tablet/Desktop: 4 column layout
* Fully responsive navbar

---

## 🧠 Features

* Dynamic routing using slugs
* Category navigation with nested slugs
* Product details with scraped description
* Skeleton loaders for smooth UX
* Fully responsive UI

---


