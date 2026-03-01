# 🪔 Vinayak Travels — Feedback Portal

A beautiful, spiritual-themed feedback and trip management website for Vinayak Travels.

## ✨ Features

- **Client Side**: Attractive feedback form with star ratings, yes/no, and text questions
- **Upcoming Trips**: Dynamic trip cards with seat availability
- **Testimonials Wall**: Auto-displays submitted feedbacks
- **Admin Panel**: Full management - add/edit/delete trips, questions, view feedbacks
- **Export**: Download all feedbacks as CSV
- **Spiritual Design**: Saffron/cream theme with OM watermark, Cinzel fonts

## 🔐 Admin Access

Default password: `vinayak@admin123`

> To change the password, edit `src/App.jsx` line 38 and update the password string.

## 🚀 Deploy on Vercel (Easiest)

1. Create a GitHub account at [github.com](https://github.com) if you don't have one
2. Create a new repository and upload all these files
3. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
4. Click **"New Project"** → Import your GitHub repository
5. Vercel auto-detects Vite → Click **"Deploy"**
6. Done! Your site will be live in 60 seconds 🎉

## 🚀 Deploy on GitHub Pages

1. Push code to GitHub
2. Run: `npm run build`
3. In `vite.config.js`, add: `base: '/your-repo-name/'`
4. Push the `dist` folder or use GitHub Actions

## 💻 Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
vinayak-travels/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx          ← Main app + data management
│   ├── index.css        ← Global styles
│   └── components/
│       ├── Header.jsx
│       ├── HeroSection.jsx
│       ├── UpcomingTrips.jsx
│       ├── FeedbackForm.jsx
│       ├── TestimonialsWall.jsx
│       ├── Footer.jsx
│       ├── AdminLogin.jsx
│       └── AdminPanel.jsx
```

## 💾 Data Storage

All data is stored in the browser's `localStorage` — no backend needed!
This means data persists between sessions on the same device/browser.

---

🌺 *Har Har Mahadev* 🌺
