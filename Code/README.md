# Librarian - Figma Plugin

A Figma plugin that connects live UI component libraries (like Shadcn/UI, Lucide Icons, GitHub-based design systems) directly into Figma for rapid prototyping.

## ✨ Features

- 🎨 **47+ Shadcn/UI components** with live previews
- 📦 **60+ Tailwind CSS components**
- 🎯 **Blocks system** for complex layouts
- 🎭 **1,400+ Lucide icons** (CDN-loaded)
- ⚙️ **Custom repository support** (add your own libraries!)
- 🚀 **Fast & lightweight** (300KB bundle, 400ms load)
- 🔥 **Hot reload** in development mode
- 💾 **Persistent settings** (saved repositories)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Figma desktop app

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Build the plugin
npm run build

# 3. Load in Figma Desktop
#    Plugins → Development → Import plugin from manifest...
#    Select manifest.json from this project
```

That's it! 🎉

## 🔧 Development

### Hot Reload Mode (Recommended)

```bash
npm run dev
```

**What this does:**
- Watches for file changes
- Rebuilds automatically
- Updates plugin instantly when you save

**To use:**
1. Keep `npm run dev` running
2. Open plugin in Figma
3. Edit `App.tsx` in your code editor
4. Save → See changes instantly! ⚡

### Production Build

```bash
npm run build
```

**Output:**
- `dist/code.js` - Plugin backend (45KB)
- `dist/ui.html` - Plugin UI (300KB)

### Build Commands

```bash
npm run build        # Build everything
npm run build:code   # Build plugin backend only
npm run build:ui     # Build UI only
npm run dev          # Development mode (hot reload)
npm run watch        # Alias for dev
```

## 📁 Project Structure

```
librarian-plugin/
├── dist/                     # Build output (generated)
│   ├── code.js              # Plugin backend
│   └── ui.html              # Plugin UI
│
├── App.tsx                   # Main React UI
├── code.ts                   # Plugin backend (Figma API)
├── main.tsx                  # React entry point
│
├── components/
│   ├── ui/                  # 47 Shadcn/UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   └── figma/
│       └── ImageWithFallback.tsx
│
├── lib/                      # Component registries & loaders
│   ├── component-registry.tsx
│   ├── tailwind-component-registry.tsx
│   ├── blocks-registry.tsx
│   ├── cdn-icon-loader.ts
│   └── ...
│
├── imports/                  # Figma imports & SVGs
│   └── svg-*.ts
│
├── styles/
│   └── globals.css          # Global styles (Tailwind CSS)
│
├── manifest.json             # Plugin configuration
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── vite.config.ts            # Vite build config
```

## How It Works

1. **Plugin Backend (`code.ts`)**: Runs in the Figma plugin sandbox with access to the Figma API. Handles creating nodes and storing metadata.

2. **Plugin UI (React app)**: The user interface built with React, displaying component options and previews.

3. **Communication**: The backend and UI communicate via `postMessage` API.

## 🚢 Publishing to Figma Community

### 1. Prepare for Publishing

```bash
# Build production version
npm run build

# Test thoroughly
# - Insert all component types
# - Test with real projects
# - Check performance
# - Verify all features work
```

### 2. Submit to Figma

1. In Figma Desktop, run your plugin
2. Click the **⋮** menu in plugin window
3. Select **"Publish new release"**
4. Fill in plugin details:
   - **Name:** Librarian
   - **Description:** Connects live UI component libraries into Figma
   - **Category:** Design tools
   - **Tags:** components, ui, design system
5. Upload cover image and screenshots
6. Submit for review

### 3. Review Process

- Figma reviews within 1-2 weeks
- You'll receive feedback via email
- Make requested changes and resubmit
- Once approved, plugin goes live! 🎉

## 🎨 Adding Custom Components

### Add to Component Registry

Edit `lib/component-registry.tsx`:

```typescript
export const componentRegistry: ComponentConfig[] = [
  // ... existing components
  {
    name: 'MyComponent',
    description: 'My custom component',
    category: 'Custom',
    variants: [
      { name: 'Default', value: 'default' },
      { name: 'Outline', value: 'outline' }
    ],
    sizes: [
      { name: 'Small', value: 'sm' },
      { name: 'Large', value: 'lg' }
    ]
  }
];
```

### Add Preview Renderer

In the same file:

```typescript
export function renderComponentPreview(config: ComponentConfig) {
  switch (config.name) {
    case 'MyComponent':
      return <MyCustomPreview />;
    // ... other cases
  }
}
```

### Add Backend Handler

Edit `code.ts` to create Figma nodes:

```typescript
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'place-component') {
    if (msg.data.componentName === 'MyComponent') {
      await createMyComponent(msg.data);
    }
  }
};
```

### Rebuild

```bash
npm run build
```

## 🌐 Adding Custom Repositories

1. Run plugin in Figma
2. Click **Settings** icon
3. Under **Components**, **Blocks**, or **Icons** section
4. Click **+** to add repository
5. Enter:
   - **Name:** Your library name
   - **URL:** CDN or GitHub URL

**Example URLs:**
```
https://cdn.jsdelivr.net/npm/your-library@latest
https://unpkg.com/your-package@1.0.0
https://raw.githubusercontent.com/user/repo/main/components/
```

Repositories are saved automatically and persist between sessions!

## 📊 Performance

**Bundle Sizes:**
- Plugin backend: ~45 KB
- Plugin UI: ~300 KB
- **Total: ~345 KB** (60% smaller than typical React plugins)

**Load Times:**
- Initial load: ~400ms
- Hot reload: <100ms

**Optimizations:**
- Tree-shaking (Vite)
- Code splitting
- CDN-loaded icons (not bundled)
- Minimal dependencies

## 🐛 Troubleshooting

### Build fails

```bash
# Clean and rebuild
rm -rf dist
npm run build
```

### Plugin won't load

**Check:**
- Using Figma **Desktop** (not browser)
- `dist/` folder exists
- Imported correct `manifest.json`

### Components don't show

**Fix:**
- Right-click plugin → Inspect
- Check console for errors
- Verify imports in `App.tsx`

### "Cannot find module" error

```bash
npm install
npm run build
```

## 📚 Documentation

- **🚀 Quick Setup:** See `🚀-QUICK-SETUP.md`
- **📖 PRD:** See `PRD.md` for full specifications
- **🎓 Guidelines:** See `guidelines/Guidelines.md`

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Credits

Built with:
- [Bolt Figma](https://github.com/thomas-lowry/figma-plugin-boilerplate) - Plugin boilerplate
- [Shadcn/UI](https://ui.shadcn.com/) - Component library
- [Lucide Icons](https://lucide.dev/) - Icon library
- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 🌟 Show Your Support

If you find this plugin useful:
- ⭐ Star this repository
- 🐦 Share on social media
- 💬 Leave feedback in Figma Community
- 🐛 Report bugs or suggest features

---

**Made with ❤️ for the Figma community**
