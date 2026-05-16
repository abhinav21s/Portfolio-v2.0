# Testing Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:3000` in your browser.

## Features to Test

### 1. Hero Section
- [ ] Merkle Root hash displays correctly
- [ ] "Explore the Tree" button scrolls to Merkle Tree section
- [ ] "Get in Touch" button scrolls to Contact section
- [ ] Scroll indicator animates smoothly
- [ ] Gradient orbs visible in background

### 2. About Section
- [ ] Photo placeholder displays
- [ ] Bio paragraphs render correctly
- [ ] Stat cards animate on scroll
- [ ] Hover effects work on stat cards

### 3. Skills Section
- [ ] All 4 skill categories display
- [ ] Click to expand/collapse categories
- [ ] Skill tags have hover effects
- [ ] "All branches connect to root" indicator visible

### 4. Projects Section (NEW)
- [ ] All project cards display in grid
- [ ] Tech stack tags visible
- [ ] Metrics display correctly
- [ ] **"View in Merkle Tree" button works:**
  - Click button
  - Page scrolls to Merkle Tree section
  - Corresponding leaf highlights after scroll
- [ ] Hover effects on cards (lift + glow)

### 5. Merkle Tree Section (MAIN FEATURE)

#### Tree Health Indicator
- [ ] Circular progress shows 100% when valid
- [ ] Shows percentage correctly
- [ ] Displays "✓ All hashes valid" when tree is valid

#### Tree Visualization (Desktop)
- [ ] Root node at top (larger, with border-4)
- [ ] Internal nodes in middle levels
- [ ] Leaf nodes at bottom (project names visible)
- [ ] **SVG connection lines:**
  - [ ] Curved paths between nodes
  - [ ] Lines visible and properly positioned
  - [ ] Gradient colors applied

#### Click Interaction
- [ ] Click any leaf node
- [ ] Path to root highlights with glow
- [ ] **Animated particles flow along path**
- [ ] Project details panel opens below
- [ ] Cryptographic path shows at bottom of details

#### Tamper Demo
- [ ] Click "Try Tamper Demo" button
- [ ] Info banner appears with instructions
- [ ] Click any leaf to tamper
- [ ] **Hash invalidation:**
  - [ ] Leaf turns red
  - [ ] Path to root turns red
  - [ ] Particles turn red
  - [ ] Tree Health drops below 100%
  - [ ] Status shows "⚠ Integrity compromised"
- [ ] "Re-mine Chain" button appears
- [ ] Click "Re-mine Chain"
- [ ] Mining animation shows
- [ ] Tree recalculates (takes ~1.5s)
- [ ] All nodes turn teal again
- [ ] Tree Health returns to 100%

#### Mobile View
- [ ] Root hash card displays at top
- [ ] Project cards in grid (2 columns on tablet, 1 on mobile)
- [ ] Tap card to select
- [ ] Tamper demo works on mobile

### 6. Experience Section
- [ ] Timeline displays correctly
- [ ] Experience cards show achievements
- [ ] Leadership section visible

### 7. Beyond the Chain
- [ ] 4 hobby cards display
- [ ] Icons and descriptions visible
- [ ] Quote section at bottom

### 8. Contact Section
- [ ] Form fields work
- [ ] Social links display
- [ ] Submit button shows loading state
- [ ] Success message appears after submit

### 9. Footer
- [ ] Current Merkle Root displays
- [ ] Quick links work
- [ ] Social icons link correctly

## Responsive Testing

### Desktop (1920px+)
- [ ] Full tree visualization with SVG lines
- [ ] All sections properly spaced
- [ ] Hover effects work smoothly

### Laptop (1280px - 1920px)
- [ ] Tree scales appropriately
- [ ] All content readable
- [ ] No horizontal scroll

### Tablet (768px - 1280px)
- [ ] 2-column layouts work
- [ ] Tree switches to mobile view
- [ ] Touch interactions work

### Mobile (< 768px)
- [ ] Single column layouts
- [ ] Root hash card visible
- [ ] Project cards stack vertically
- [ ] All buttons accessible
- [ ] No content overflow

## Performance Testing

### Lighthouse Scores (Target)
- [ ] Performance: 90+
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] SEO: 90+

### Animation Performance
- [ ] Smooth 60fps animations
- [ ] No jank during scroll
- [ ] Tree building is smooth
- [ ] Particle animations don't lag

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Escape closes project details
- [ ] Focus indicators visible

### Screen Reader
- [ ] All images have alt text
- [ ] Buttons have aria-labels
- [ ] Sections have proper headings
- [ ] Tree nodes have descriptive labels

### Reduced Motion
- [ ] Animations respect prefers-reduced-motion
- [ ] Page still functional without animations

## Browser Testing

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Common Issues & Solutions

### SVG Lines Not Showing
- Check browser console for errors
- Ensure node positions are calculated
- Verify SVG viewBox is correct

### Particles Not Animating
- Check if animateMotion is supported
- Verify path data is correct
- Check browser compatibility

### Scroll to Tree Not Working
- Verify element ID is "merkle-tree"
- Check if smooth scroll is enabled
- Test scroll-padding-top in CSS

### Tree Health Not Updating
- Check if calculateTreeHealth function runs
- Verify root node is available
- Check state updates in merkleStore

### Mobile Layout Issues
- Test with browser dev tools
- Check Tailwind breakpoints (lg:, md:, sm:)
- Verify responsive classes applied

## Final Checklist

Before deploying:
- [ ] All content updated in portfolioData.js
- [ ] Photo added to public/profile.jpg
- [ ] All links tested and working
- [ ] No console errors
- [ ] Tested on multiple devices
- [ ] Lighthouse scores acceptable
- [ ] Accessibility tested
- [ ] Build succeeds: `npm run build`
- [ ] Preview works: `npm run preview`

---

**If all tests pass, you're ready to deploy!** 🚀
