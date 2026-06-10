# 🚀 SponsorVerse

### Where Events Meet Their Universe of Sponsors

SponsorVerse is a full-stack sponsorship marketplace that connects **event organizers** with **brands and sponsors** looking to reach the right audience.

Instead of relying on cold emails, spreadsheets, and manual outreach, organizers can publish events with structured sponsorship packages while sponsors discover opportunities that match their industry, audience, and budget.

**Live Demo:** https://sponsoverse.vercel.app

---

## ✨ Why SponsorVerse?

Finding sponsors is one of the biggest challenges for event organizers.

Traditional sponsorship outreach is:

* Time-consuming
* Difficult to scale
* Highly dependent on personal networks
* Fragmented across emails, PDFs, and spreadsheets

SponsorVerse provides a centralized platform where:

* Organizers showcase sponsorship opportunities
* Sponsors discover relevant events
* Both parties connect through a structured workflow

---

## 🎯 Core Features

### 👨‍💼 Organizer Portal

* Create and manage events
* Define audience demographics
* Publish sponsorship opportunities
* Configure sponsorship tiers:

  * ☄️ Comet
  * ⭐ Star
  * 💥 Nova
  * 🌌 Galaxy
* Review incoming sponsor inquiries
* Accept or reject sponsorship requests

### 🏢 Sponsor Portal

* Browse sponsorship opportunities
* Filter events by:

  * Category
  * Location
  * Audience size
  * Budget
* View sponsorship packages
* Express interest directly from event pages

### 🔐 Authentication & Access Control

* Role-based accounts
* Organizer-specific workflows
* Sponsor-specific workflows
* Secure session management using Auth.js

### ☁️ Production Infrastructure

* PostgreSQL database hosted on Neon
* Deployed on Vercel
* Prisma ORM for type-safe database access

---

## 🏗️ System Architecture

```text
Organizer
    │
    ▼
Create Event
    │
    ▼
Sponsorship Tiers
    │
    ▼
PostgreSQL (Neon)
    ▲
    │
Sponsor Discovery
    │
    ▼
Express Interest
    │
    ▼
Organizer Dashboard
    │
    ▼
Accept / Reject Inquiry
```

---

## 📸 Screenshots

### Landing Page

![Landing Page](docs/screenshots/landing.png)

### Organizer Dashboard

![Organizer Dashboard](docs/screenshots/organizer_dashboard.png)

### Sponsor Discovery

![Sponsor Discovery](docs/screenshots/sponsor_dashboard.png)

### Inquiry Management

![Inquiry Management](docs/screenshots/inquiries.png)

---

## 🛠 Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS v4
* shadcn/ui

### Backend

* Next.js Server Actions
* Auth.js (NextAuth v5)

### Database

* PostgreSQL
* Prisma ORM
* Neon Serverless Postgres

### Deployment

* Vercel

---

## 🚀 Running Locally

### Clone Repository

```bash
git clone https://github.com/nehal2905/sponsoverse.git
cd sponsoverse
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

```env
DATABASE_URL=
AUTH_SECRET=
```

### Apply Database Migrations

```bash
npx prisma migrate dev
```

### Start Development Server

```bash
npm run dev
```

Visit:

```text
http://localhost:3000
```

---

## 📊 Project Highlights

* Full-stack SaaS application
* Production deployment on Vercel
* PostgreSQL database integration
* Role-based authorization
* Real-time sponsor inquiry workflow
* Responsive modern UI
* Type-safe backend using Prisma

---

## 🔮 Future Roadmap

* AI-powered sponsor matching engine
* Sponsorship deck upload & analysis
* Event recommendation system
* In-app messaging
* Analytics dashboard
* Payment processing
* Sponsor performance insights

---

## 👨‍💻 Author

**Akula Nehal**

Building secure, scalable software across:

* Full-Stack Development
* Cybersecurity
* Detection Engineering
* AI Applications
