
# 🖥️ Macfolio – A macOS-Inspired Portfolio

Macfolio is a fully interactive, macOS-style portfolio site that mimics the desktop experience of a Mac. Built with React, Next.js, Framer Motion, and Tailwind (optional if you're using inline styling), it brings together design and storytelling to showcase projects, publications, and achievements through a playful, immersive interface.

Explore the desktop, click on draggable icons, open Finder windows, browse documents, and experience my technical work in a way that’s both intuitive and visually engaging.

---

## ✨ Features

- 🖼️ **macOS Desktop UI** – Drag-and-drop desktop icons with a persistent dock and navbar
- 🔍 **Spotlight Search** – Apple-style search experience with blur overlay and real-time results
- 🗂️ **Finder Window System** – Simulated file explorer for navigating projects, publications, and certifications
- 📄 **Document Previews** – Animated popup windows for `.pdf`, `.txt`, and external links
- 📂 **Folder Navigation** – Back/forward arrows, subfolders, and JSON-driven content structure
- ⚠️ **Device Warning Modal** – Modal detection on mobile that redirects to a fallback portfolio
- 🎨 **Apple Fonts + Icons** – Includes SF Pro font stack and Apple-style iconography
- 🧠 **Framer Motion Animations** – Smooth modal transitions, search fade-ins, and window movement

---

## 🛠️ Tech Stack

- **Next.js** – App Router with dynamic routing and static hosting
- **React** – Component-based structure for UI and interactivity
- **Framer Motion** – Page and modal animations
- **React Icons** – Icon support for modal UI and buttons
- **Custom JSON** – Stores project, publication, and certification data in `/public/`

---

## 📁 Folder Structure (simplified)

```
src/
├── components/
│   ├── DesktopLayout.tsx
│   ├── FinderWindow.tsx
│   ├── DocumentPopup.tsx
│   ├── Navbar.tsx
│   ├── Dock.tsx
│   ├── TerminalApp.tsx
│   ├── SpotlightSearch.tsx
│   └── DeviceWarning.tsx
├── app/
│   └── page.tsx
public/
├── finalKit/             // App icons (finder.png, safari.png, etc)
├── projects.json         // Project metadata
├── certifications.json   // Certification metadata
├── publications.json     // Publication metadata
└── resume.pdf
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/asuryaUSC/macfolio.git
cd macfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the dev server

```bash
npm run dev
```

Visit `http://localhost:3000` to view Macfolio locally.

---

## 🌐 Deployment

Macfolio is deployed on [Vercel](https://vercel.com), and live at:  
🔗 **https://www.aadityasurya.com**

To deploy your own version:

```bash
npx vercel
```

---

## 🧪 Testing the Device Warning

To trigger the mobile-only modal:

- Open Chrome DevTools → Toggle device toolbar (Cmd + Shift + M)
- Select a phone model and refresh
- Or override the user agent manually

Mobile users will be shown a macOS-style warning and redirected to your fallback portfolio.

---

## 📎 Credits

- Inspired by Apple’s desktop UI
- Icons sourced from macOS screenshots and refined in Figma
- Fonts: SF Pro / SF Compact (locally installed or fallback system font)
- Built by [Aaditya Surya](https://www.aadityasurya.com)

---

## 📬 Contact

Want to collaborate, chat, or learn more?

- ✉️ Email: aaditya.surya0@gmail.com
- 🌐 Website: [aadityasurya.com](https://www.aadityasurya.com)
- 🧑‍💻 GitHub: [@asuryaUSC](https://github.com/asuryaUSC)

---

## 🫶 Acknowledgments

Shoutout to all the engineers and designers who inspired this project — and to everyone who believes portfolios can be fun **and** functional.
