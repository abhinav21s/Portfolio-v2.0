# Abhinav's Merkle Tree Portfolio

A premium, minimalist blockchain-themed personal portfolio that represents professional identity as a Merkle Tree. Every project is a leaf, and the root hash symbolizes the complete professional identity.

## 🎯 Concept

This portfolio demonstrates blockchain's core principle of data integrity through an interactive Merkle Tree visualization. Each project is a leaf node, and any tampering with data causes hash invalidation that propagates to the root—showcasing immutability and verifiability.

## ✨ Features

- **Interactive Merkle Tree**: Visual representation of projects as a cryptographic tree structure
- **Tamper Demonstration**: See how blockchain ensures data integrity
- **Real SHA-256 Hashing**: Uses native Web Crypto API for authentic cryptographic operations
- **Smooth Animations**: Subtle, high-quality animations with Framer Motion
- **Fully Responsive**: Mobile-first design that works beautifully on all devices
- **Accessible**: ARIA labels, keyboard navigation, and reduced motion support
- **Premium Design**: Dark theme with teal/cyan accents and generous spacing

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📝 Customization

### Update Personal Information

Edit `src/data/portfolioData.js` to update:
- Personal info (name, title, bio, contact)
- Skills and tech stack
- Projects (automatically become leaves in the Merkle Tree)
- Experience and leadership
- Hobbies and interests

### Add Your Photo

Place your photo at `public/profile.jpg` (or update the path in `portfolioData.js`)

### Customize Colors

Edit `tailwind.config.js` to change the color scheme:
```js
colors: {
  'deep-black': '#0A0A0A',
  'primary-teal': '#22D3EE',
  // ... other colors
}
```

### Add More Projects

Simply add new project objects to the `projects` array in `portfolioData.js`. They will automatically:
- Become leaf nodes in the Merkle Tree
- Generate cryptographic hashes
- Participate in the tamper demonstration
- Display in the visualization

## 🏗️ Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── MerkleTreeSection.jsx
│   │   ├── MerkleTreeVisualization.jsx
│   │   ├── ProjectDetails.jsx
│   │   ├── Experience.jsx
│   │   ├── BeyondTheChain.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── portfolioData.js # All content data
│   ├── store/
│   │   └── merkleStore.jsx  # Merkle Tree state management
│   ├── utils/
│   │   └── merkleTree.js    # Merkle Tree algorithms
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/                  # Static assets
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Design Philosophy

- **Quiet Luxury**: Premium feel without flashiness
- **Technical Precision**: Real cryptographic operations, not simulations
- **Disciplined Execution**: Clean code, thoughtful animations, purposeful interactions
- **Storytelling**: The portfolio tells a story through the Merkle Tree metaphor
- **Accessibility First**: Keyboard navigation, screen readers, reduced motion

## 🔧 Technologies

- **React 18**: Modern React with hooks
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth, performant animations
- **Web Crypto API**: Native SHA-256 hashing
- **Zustand**: Lightweight state management (via Context API)

## 📱 Responsive Design

- **Desktop**: Full tree visualization with connecting lines
- **Tablet**: Simplified tree with card layout
- **Mobile**: Vertical card list with expandable details

## ♿ Accessibility

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Reduced motion support for users with vestibular disorders
- High contrast ratios for text

## 🎯 Performance

- Optimized bundle size
- Lazy loading where appropriate
- Efficient re-renders with React optimization
- CSS animations over JavaScript where possible
- Lighthouse score target: 90+

## 📄 License

This project is open source and available for personal use. Feel free to fork and customize for your own portfolio!

## 🤝 Contributing

This is a personal portfolio template, but suggestions and improvements are welcome! Feel free to open an issue or submit a pull request.

## 📧 Contact

For questions or collaboration opportunities, reach out through the contact form on the portfolio or via:
- Email: abhinav@example.com
- GitHub: @abhinavsharma
- LinkedIn: Abhinav Sharma

---

Built with ❤️ and disciplined precision by Abhinav Sharma
