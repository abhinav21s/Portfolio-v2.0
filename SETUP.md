# Setup Guide

## Quick Start

Follow these steps to get your portfolio up and running:

### 1. Install Dependencies

```bash
npm install
```

This will install:
- React 18.3.1
- React DOM 18.3.1
- Framer Motion 11.0.0
- Zustand 4.5.0
- Vite 5.2.0
- Tailwind CSS 3.4.3
- PostCSS & Autoprefixer

### 2. Customize Your Content

Open `src/data/portfolioData.js` and update:

#### Personal Information
```javascript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your tagline",
  email: "your@email.com",
  // ... update all fields
}
```

#### Projects
Add your projects to the `projects` array. Each project becomes a leaf in the Merkle Tree:
```javascript
{
  id: "proj-001",
  title: "Your Project",
  description: "Project description",
  techStack: ["Tech1", "Tech2"],
  challenges: "What challenges you faced",
  results: "What you achieved",
  links: {
    github: "https://github.com/...",
    demo: "https://..."
  },
  metrics: {
    users: "1000+",
    // ... other metrics
  }
}
```

#### Skills
Update the skills object with your tech stack:
```javascript
export const skills = {
  backend: {
    title: "Backend Engineering",
    items: ["Node.js", "Python", ...]
  },
  // ... other categories
}
```

#### Experience & Leadership
Update your work experience and leadership roles.

### 3. Add Your Photo

Place your professional photo at:
```
public/profile.jpg
```

Or update the path in `portfolioData.js`:
```javascript
photo: "/your-photo-name.jpg"
```

### 4. Update Social Links

In `portfolioData.js`, update your social media links:
```javascript
social: {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
  email: "your@email.com"
}
```

### 5. Customize Colors (Optional)

Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  'deep-black': '#0A0A0A',      // Background
  'card-dark': '#111111',        // Card backgrounds
  'primary-teal': '#22D3EE',     // Primary accent
  'accent-amber': '#F59E0B',     // Success states
  // ... customize as needed
}
```

### 6. Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### 7. Build for Production

When ready to deploy:
```bash
npm run build
```

The optimized build will be in the `dist` folder.

### 8. Preview Production Build

```bash
npm run preview
```

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify
1. Push your code to GitHub
2. Connect repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```
4. Run: `npm run deploy`

## Troubleshooting

### Dependencies Not Installing
- Make sure you have Node.js 16+ installed
- Try: `npm cache clean --force` then `npm install`

### Port 3000 Already in Use
- Change port in `vite.config.js`:
```javascript
server: {
  port: 3001, // or any other port
}
```

### Fonts Not Loading
- Check internet connection (fonts load from Google Fonts)
- Or download fonts locally and update `index.html`

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Run `npm run build`

## Features to Explore

### Merkle Tree Visualization
- Click any project to see details
- View the cryptographic path to root
- Try the tamper demo to see hash invalidation

### Responsive Design
- Test on mobile, tablet, and desktop
- Tree adapts to screen size

### Accessibility
- Navigate with keyboard (Tab, Enter, Escape)
- Screen reader compatible
- Respects reduced motion preferences

## Next Steps

1. ✅ Install dependencies
2. ✅ Customize content
3. ✅ Add your photo
4. ✅ Test locally
5. ✅ Build for production
6. ✅ Deploy to hosting platform
7. ✅ Share your portfolio!

## Need Help?

- Check the main README.md for detailed documentation
- Review the code comments in each component
- All data is in `src/data/portfolioData.js` for easy updates

---

Happy building! 🚀
