
# Pabasara Ilankoon — Portfolio

Built with **Next.js 14** + **Tailwind CSS** + **TypeScript**.  

---

## 📁 Project Structure

```
pabasara-portfolio/
├── app/
│   ├── globals.css          ← All global styles
│   ├── layout.tsx           ← Root layout + metadata (SEO)
│   └── page.tsx             ← Main page (assembles sections)
├── components/
│   ├── Navbar.tsx           ← Fixed nav with mobile menu
│   ├── Footer.tsx           ← Footer
│   └── sections/
│       ├── Hero.tsx         ← Landing section
│       ├── About.tsx        ← Tabbed about section
│       ├── Projects.tsx     ← Filterable project grid
│       ├── Skills.tsx       ← Interactive skill panel
│       ├── Achievements.tsx ← Awards + certifications
│       └── Contact.tsx      ← Contact form + links
├── lib/
│   └── data.ts              
├── public/
│   ├── images/              ← Put your photos here
│   │   └── profile.jpg      ← Your profile photo
│   └── resume.pdf           ← Your CV
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

---

## 🚀 Step-by-Step Setup in VS Code

### Step 1 — Install Node.js
Download and install from https://nodejs.org (choose LTS version)

### Step 2 — Open in VS Code
```bash
# Open VS Code terminal (Ctrl + `)
cd pabasara-portfolio
```

### Step 3 — Install dependencies
```bash
npm install
```

### Step 4 — Run locally
```bash
npm run dev
```
Open http://localhost:3000 in your browser. You'll see your portfolio live!

---

## ✏️ How to Edit Content

**All your data is in one file: `lib/data.ts`**

Open it and edit:
- `personalInfo` → your name, bio, links, photo path
- `projects[]` → add/edit/remove projects
- `skills[]` → your skill categories and tools
- `achievements[]` → competition wins
- `certifications[]` → your certs
- `education[]` → your education
- `leadership[]` → leadership roles

---

## 🖼️ Adding Your Photo

1. Put your photo file at `public/images/profile.jpg`
2. That's it — it will show up automatically

For project images, add them to `public/images/` and update the `image` field in each project in `data.ts`.

---

## 🌐 Deploying to Vercel (Free)

### Option A — Vercel (Recommended, same as Sahas's site)

1. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. Go to https://vercel.com and sign in with GitHub

3. Click **"New Project"** → import your repo → click **Deploy**

4. Done! You'll get a live URL like `pabasara-portfolio.vercel.app`

5. To use a custom domain: go to Vercel → Project Settings → Domains

### Option B — GitHub Pages

1. In `next.config.js`, change `output: "export"` (already set ✓)
2. Push to GitHub
3. Go to repo Settings → Pages → select `main` branch → `/out` folder
4. Run `npm run build` and push the `out/` folder

---

## 🎨 Customizing Colors

Edit `tailwind.config.js` to change the accent color:
```js
accent: "#6c63ff",         // Main purple — change this
"accent-light": "#a78bfa", // Lighter purple
"accent-green": "#34d399", // Green for status badges
```

---

## 📦 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | Framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| Framer Motion | Animations (optional, installed) |

---

## 🆘 Common Issues

**"Module not found"** → Run `npm install` again

**Photo not showing** → Make sure file is at `public/images/profile.jpg` (exact name)

**Build error** → Run `npm run build` to see detailed errors

**Port 3000 in use** → Run `npm run dev -- -p 3001`

# portfolio
Electronics &amp; Telecommunication Engineering portfolio featuring AI/ML systems, robotics competitions, and full-stack applications.

