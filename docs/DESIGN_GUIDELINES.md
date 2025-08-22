# Qwik.skin Design Guidelines

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Layout & Spacing](#layout--spacing)
5. [Component Design](#component-design)
6. [Interactive Elements](#interactive-elements)
7. [Animation & Motion](#animation--motion)
8. [Iconography](#iconography)
9. [Imagery & Assets](#imagery--assets)
10. [Accessibility](#accessibility)
11. [Responsive Design](#responsive-design)
12. [Design Principles](#design-principles)

---

## Brand Identity

### Core Concept

Qwik.skin is a **CS2 skin trading platform** built on **Solana blockchain**. The brand combines:

- **Gaming aesthetics** (CS2 weapon skins, gaming culture)
- **Blockchain technology** (Solana, crypto trading)
- **Modern web design** (clean, professional interface)

### Brand Personality

- **Fast & Efficient**: Quick trading, instant transactions
- **Secure & Trustworthy**: Blockchain security, transparent transactions
- **Premium & High-Quality**: High-value skins, professional platform
- **Gaming-Focused**: CS2 community, weapon aesthetics

---

## Color Palette

### Primary Colors

```css
/* Solana Gradient (Primary Brand Color) */
--primary: 265 100% 64%; /* #9D5CFF - Purple */
--secondary: 158 89% 51%; /* #14F195 - Green */

/* Solana Gradient Classes */
.solana-gradient {
  background: linear-gradient(to right, #9945ff, #14f195);
}

.solana-gradient-text {
  background: linear-gradient(to right, #9945ff, #14f195);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Background Colors

```css
/* Main Background */
--background: 260 100% 5%; /* #0A0A0A - Deep Black */
--card: 260 100% 7%; /* #1A1625 - Dark Purple-Black */

/* Specific Backgrounds */
.bg-[#1A1625] /* Main page background */
.bg-[#2D2438] /* Card/component background */
.bg-[#232126] /* Secondary card background */
```

### Text Colors

```css
/* Primary Text */
--foreground: 0 0% 100%; /* #FFFFFF - Pure White */

/* Secondary Text */
--muted-foreground: 0 0% 80%; /* #CCCCCC - Light Gray */

/* Text Opacity Variants */
text-white/60 /* 60% opacity white */
text-white/70 /* 70% opacity white */
text-white/80 /* 80% opacity white */
text-white/90 /* 90% opacity white */
```

### Accent Colors

```css
/* Success/Positive */
--accent: 158 89% 51%; /* #14F195 - Green */

/* Warning/Error */
--destructive: 0 100% 50%; /* #FF0000 - Red */

/* Interactive States */
--ring: 265 100% 64%; /* #9D5CFF - Purple for focus states */
```

---

## Typography

### Font Families

```css
/* Primary Font - Outfit */
--font-sans: "Outfit", sans-serif;

/* Secondary Font - Space Grotesk */
--font-space: "Space Grotesk", sans-serif;

/* Monospace Font - JetBrains Mono */
--font-mono: "JetBrains Mono", monospace;
```

### Font Usage Guidelines

#### Headings

- **Hero Titles**: Space Grotesk, 6xl (96px), font-medium
- **Section Headers**: Space Grotesk, 4xl (64px), font-bold
- **Card Titles**: Space Grotesk, 2xl (32px), font-semibold
- **Subheadings**: Space Grotesk, xl (24px), font-medium

#### Body Text

- **Primary Text**: Outfit, base (16px), font-normal
- **Secondary Text**: Outfit, sm (14px), font-normal
- **Small Text**: Outfit, xs (12px), font-normal

#### Special Text

- **Prices**: Space Grotesk, various sizes, font-bold
- **Technical Info**: JetBrains Mono, sm (14px), font-normal
- **Navigation**: Space Grotesk, base (16px), font-medium

### Typography Scale

```css
text-xs    /* 12px */
text-sm    /* 14px */
text-base  /* 16px */
text-lg    /* 18px */
text-xl    /* 20px */
text-2xl   /* 24px */
text-3xl   /* 30px */
text-4xl   /* 36px */
text-5xl   /* 48px */
text-6xl   /* 60px */
```

---

## Layout & Spacing

### Container System

```css
/* Main Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Responsive Padding */
px-4 md:px-6 lg:px-8 xl:px-12

/* Section Spacing */
py-16 /* 64px vertical padding */
py-20 /* 80px vertical padding */
```

### Grid System

```css
/* Responsive Grid */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

/* Gap Spacing */
gap-4  /* 16px */
gap-6  /* 24px */
gap-8  /* 32px */
gap-12 /* 48px */
gap-16 /* 64px */
```

### Spacing Scale

```css
/* Margin & Padding */
p-1  /* 4px */
p-2  /* 8px */
p-3  /* 12px */
p-4  /* 16px */
p-6  /* 24px */
p-8  /* 32px */
p-12 /* 48px */
p-16 /* 64px */
p-20 /* 80px */
```

---

## Component Design

### Cards

```css
/* Standard Card */
.bg-[#2D2438] /* Background */
.rounded-lg /* Border radius */
.border.border-[#1A1625] /* Border */
.shadow-md /* Shadow */
.p-4 /* Padding */

/* Card States */
.hover:brightness-125 /* Hover effect */
.transition-all.duration-200 /* Smooth transitions */
```

### Buttons

```css
/* Primary Button */
.solana-gradient /* Solana gradient background */
.text-white /* White text */
.font-bold /* Bold font */
.px-8.py-6 /* Padding */
.rounded-md /* Border radius */
.hover:opacity-90 /* Hover effect */

/* Secondary Button */
.bg-[#2D2438] /* Dark background */
.text-white /* White text */
.border.border-[#1A1625] /* Border */
.hover:bg-[#1A1625] /* Hover effect */
```

### Input Fields

```css
/* Standard Input */
.bg-background /* Background */
.border.border-input /* Border */
.rounded-md /* Border radius */
.px-3.py-2 /* Padding */
.focus-visible:ring-2.focus-visible:ring-ring /* Focus state */
```

### Modals & Dialogs

```css
/* Modal Background */
.bg-black/70 /* Semi-transparent overlay */
.backdrop-blur-md /* Blur effect */

/* Modal Content */
.bg-[#1A1625] /* Dark background */
.rounded-md /* Border radius */
.border.border-border /* Border */
.shadow-lg /* Shadow */
```

---

## Interactive Elements

### Hover States

```css
/* Standard Hover */
.hover:brightness-125 /* Brightness increase */
.hover:opacity-90 /* Opacity decrease */
.hover:bg-[#1A1625] /* Background change */

/* Text Hover */
.hover:text-[#9D5CFF] /* Purple text on hover */
.group-hover:text-[#9D5CFF] /* Group hover effect */
```

### Focus States

```css
/* Focus Ring */
.focus-visible:outline-none
.focus-visible:ring-2
.focus-visible:ring-ring
.focus-visible:ring-offset-2
```

### Active States

```css
/* Button Active */
.active:scale-95 /* Slight scale down */
.active:brightness-90 /* Brightness decrease */
```

---

## Animation & Motion

### Framer Motion Integration

```css
/* Standard Transitions */
transition-all.duration-200 /* 200ms transition */
transition-all.duration-300 /* 300ms transition */

/* Spring Animations */
transition: {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8
}
```

### Animation Types

#### Fade Animations

```css
/* Fade In */
animate-in.fade-in-0
data-[state=open]:animate-in
data-[state=open]:fade-in-0

/* Fade Out */
data-[state=closed]:animate-out
data-[state=closed]:fade-out-0
```

#### Scale Animations

```css
/* Scale In */
data-[state=open]:zoom-in-95
/* Scale Out */
data-[state=closed]:zoom-out-95
```

#### Slide Animations

```css
/* Slide In */
data-[side=bottom]:slide-in-from-top-2
data-[side=top]:slide-in-from-bottom-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
```

### Micro-interactions

```css
/* Hover Scale */
.hover:scale-105 /* 5% scale increase */
.hover:-rotate-[3deg] /* Slight rotation */

/* Loading States */
.animate-spin /* Spinning animation */
.animate-pulse /* Pulsing animation */
```

---

## Iconography

### Icon Style

- **Style**: Minimal, clean, geometric
- **Weight**: Medium to bold
- **Color**: White with opacity variants
- **Size**: 16px, 20px, 24px standard sizes

### Icon Usage

```css
/* Standard Icon */
.w-4.h-4 /* 16px */
.w-5.h-5 /* 20px */
.w-6.h-6 /* 24px */

/* Icon Colors */
.text-white /* Pure white */
.text-white/50 /* 50% opacity */
.text-white/60 /* 60% opacity */
.text-[#9D5CFF] /* Brand purple */
```

### Icon Categories

- **Navigation**: Menu, arrows, close
- **Actions**: Add, remove, cart, zoom
- **Status**: Lock, check, warning
- **Social**: Steam, external links

---

## Imagery & Assets

### Weapon Images

- **Style**: High-quality CS2 weapon renders
- **Background**: Transparent or dark backgrounds
- **Effects**: Drop shadows, glow effects
- **Format**: WebP for optimization

### Image Guidelines

```css
/* Standard Image */
.object-contain /* Maintain aspect ratio */
.object-cover /* Fill container */
.drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] /* Drop shadow */
.hover:drop-shadow-[0_0_35px_rgba(179,136,255,0.4)] /* Glow effect */
```

### Background Patterns

```css
/* Dot Pattern */
background-image: url('/dot-pattern.svg')
background-size: auto
opacity: 50%

/* Gradient Overlays */
bg-gradient-to-br.from-[rgba(20,20,20,0.5)].to-transparent
```

---

## Accessibility

### Color Contrast

- **Minimum contrast ratio**: 4.5:1 for normal text
- **High contrast mode**: Support for system preferences
- **Focus indicators**: Clear focus rings on all interactive elements

### Keyboard Navigation

- **Tab order**: Logical tab sequence
- **Skip links**: Skip to main content
- **Keyboard shortcuts**: Standard web shortcuts

### Screen Reader Support

- **Alt text**: Descriptive alt text for all images
- **ARIA labels**: Proper ARIA attributes
- **Semantic HTML**: Use appropriate HTML elements

### Motion Preferences

```css
/* Respect user motion preferences */
@media (prefers-reduced-motion: reduce) {
  .animate-* {
    animation: none;
  }
}
```

---

## Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
min-[400px]: /* 400px and up */
min-[500px]: /* 500px and up */
min-[600px]: /* 600px and up */
min-[750px]: /* 750px and up */
min-[950px]: /* 950px and up */
min-[951px]: /* 951px and up */

/* Standard Tailwind Breakpoints */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Responsive Patterns

```css
/* Responsive Grid */
grid-cols-1.md:grid-cols-2.lg:grid-cols-3.xl:grid-cols-4

/* Responsive Text */
text-sm.md:text-base.lg:text-lg

/* Responsive Spacing */
p-4.md:p-6.lg:p-8
```

### Mobile Considerations

- **Touch targets**: Minimum 44px for touch interactions
- **Scroll behavior**: Smooth scrolling, custom scrollbars
- **Viewport**: Proper viewport meta tags
- **Performance**: Optimized images and animations

---

## Design Principles

### 1. Gaming-First Design

- **Visual hierarchy**: Emphasize weapon images and prices
- **Interactive feedback**: Immediate response to user actions
- **Gaming aesthetics**: Dark theme, neon accents, weapon imagery

### 2. Blockchain Integration

- **Transparency**: Clear transaction information
- **Security**: Visual indicators of secure processes
- **Crypto-friendly**: Solana branding and terminology

### 3. Performance & Speed

- **Fast loading**: Optimized assets and lazy loading
- **Smooth animations**: 60fps animations with proper easing
- **Responsive interactions**: Immediate feedback on user actions

### 4. User Experience

- **Intuitive navigation**: Clear information architecture
- **Progressive disclosure**: Show information when needed
- **Error prevention**: Clear validation and error states

### 5. Consistency

- **Design system**: Consistent use of colors, typography, and spacing
- **Component reuse**: Standardized components across the platform
- **Brand alignment**: All elements align with brand identity

---

## Implementation Guidelines

### CSS Classes

- Use Tailwind CSS utility classes for consistency
- Create custom CSS only when necessary
- Follow the established color and spacing scales

### Component Structure

- Use React components with TypeScript
- Implement proper prop interfaces
- Follow the established component patterns

### State Management

- Use Zustand for global state
- Implement proper loading and error states
- Handle user interactions gracefully

### Performance

- Optimize images and assets
- Implement proper lazy loading
- Use efficient animations and transitions

---

## Quality Assurance

### Design Review Checklist

- [ ] Follows brand guidelines
- [ ] Uses correct color palette
- [ ] Implements proper typography
- [ ] Responsive design works correctly
- [ ] Accessibility standards met
- [ ] Performance optimized
- [ ] Consistent with existing components

### Testing Guidelines

- Test across different devices and browsers
- Verify accessibility with screen readers
- Check performance metrics
- Validate responsive behavior
- Test user interactions and animations

---

_This design guideline document should be updated as the design system evolves. All team members should follow these guidelines to maintain consistency across the platform._
