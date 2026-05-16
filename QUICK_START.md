# 🚀 Quick Start Guide

Get your portfolio running in 5 minutes!

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Start Development Server (30 sec)

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Step 3: Customize Your Content (2 min)

Open `src/data/portfolioData.js` and update:

### Your Name & Info
```javascript
export const personalInfo = {
  name: "Your Name Here",
  title: "Your Title Here",
  tagline: "Your tagline here",
  email: "your@email.com",
  // ... rest of the fields
}
```

### Your Projects
```javascript
export const projects = [
  {
    id: "proj-001",
    title: "Your Project Name",
    description: "What you built",
    techStack: ["React", "Node.js", "etc"],
    // ... rest of the fields
  },
  // Add more projects...
]
```

### Your Skills
```javascript
export const skills = {
  backend: {
    title: "Backend Engineering",
    items: ["Your", "Skills", "Here"]
  },
  // ... other categories
}
```

## Step 4: Add Your Photo (30 sec)

Place your photo at:
```
public/profile.jpg
```

## Step 5: Test Everything (1 min)

1. ✅ Check all sections load
2. ✅ Click on projects in the tree
3. ✅ Try the "Tamper Demo" button
4. ✅ Test the contact form
5. ✅ Verify all your links work

## Step 6: Build for Production

```bash
npm run build
```

## Step 7: Deploy

### Option A: Vercel (Easiest)
1. Push to GitHub
2. Import in Vercel
3. Deploy automatically ✨

### Option B: Netlify
1. Push to GitHub
2. Connect in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Option C: GitHub Pages
```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

Update `vite.config.js`:
```javascript
base: '/your-repo-name/'
```

Then:
```bash
npm run build
npm run deploy
```

## 🎉 Done!

Your portfolio is live! Share it with the world.

## 📚 Need More Help?

- **Detailed Setup**: See `SETUP.md`
- **Full Documentation**: See `README.md`
- **Project Overview**: See `PROJECT_OVERVIEW.md`

## 🎯 Key Features to Show Off

1. **Interactive Merkle Tree**: Click any project
2. **Tamper Demo**: Shows blockchain integrity
3. **Smooth Animations**: Premium feel
4. **Fully Responsive**: Works on all devices
5. **Real Cryptography**: SHA-256 hashing

## 💡 Pro Tips

- Update `portfolioData.js` regularly with new projects
- Keep your photo professional and high-quality
- Test on mobile devices
- Share on LinkedIn and Twitter
- Add real project links and demos

---

**Questions?** Check the other documentation files or review the code comments!

Happy building! 🚀
