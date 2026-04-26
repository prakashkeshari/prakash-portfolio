# Prakash Keshari — Portfolio

Personal portfolio site built with **React + Vite + Tailwind CSS**.

## 🚀 Quick Start (Local Dev)

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🌐 Deploy to GitHub Pages

### 1. Update `package.json` homepage

If deploying to a **user site** (`prakashkeshari.github.io`):
```json
"homepage": "https://prakashkeshari.github.io"
```

If deploying to a **project repo** (`prakashkeshari.github.io/my-portfolio`):
```json
"homepage": "https://prakashkeshari.github.io/my-portfolio"
```

Also update `vite.config.js` base:
```js
base: '/'              // for user site
base: '/my-portfolio/' // for project repo
```

### 2. Create a GitHub repo

Go to [github.com/new](https://github.com/new):
- Name: `prakashkeshari.github.io` (for user site) OR any name (for project site)
- Keep it public

### 3. Push your code

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/prakashkeshari/REPO_NAME.git
git push -u origin main
```

### 4. Deploy

```bash
npm run deploy
```

This runs `npm run build` then pushes the `dist/` folder to the `gh-pages` branch.

### 5. Enable GitHub Pages

In your repo: **Settings → Pages → Source → Deploy from branch → `gh-pages`**

Your site goes live at your homepage URL within ~2 minutes. 🎉

---

## 📝 Customise

- **Your email**: Replace `prakashkeshari@example.com` in `App.jsx`
- **Your LinkedIn**: Update URL in `App.jsx`
- **Projects**: Edit the `PROJECTS` array in `App.jsx`
- **Skills**: Edit the `SKILLS` array in `App.jsx`
- **Colors**: Edit `tailwind.config.js` (accent: orange `#FF5C00`)

## 🛠 Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- lucide-react icons
- gh-pages for deployment
