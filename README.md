<div align="center">

# PasteDocs 📄✨
**The Zero-Cost, Absolute Privacy Client-Side Document Formatter**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg?style=for-the-badge)](https://github.com/)
[![React](https://img.shields.io/badge/React-18%2B-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Ready-yellow.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

*Paste any government requirement. Auto-resize. Absolute Privacy. Zero server uploads.*

</div>

---

## 🏛️ The Core Philosophy (Why PasteDocs?)

### ❌ The Problem
Applying for official portals (visas, government exams, banking forms, school applications) is a formatting nightmare. The common requirements are unforgiving:
> *"Upload must be under 50KB, exactly 600x600 pixels, and in JPEG format only."*

Historically, users have been forced to:
1. Struggle with complex, paid desktop photo editors like Photoshop.
2. **Compromise their privacy** by uploading highly sensitive documents (Aadhaar cards, PAN cards, Passports, High School Marksheets, Signatures) to sketchy, ad-ridden web resizers where background data-harvesting and surveillance are very real threats.

### ✅ Our Solution: PasteDocs
PasteDocs is built on an uncompromising principle: **Your sensitive documents belong to you.** 
We take a radically different approach to traditional online tools. PasteDocs utilizes modern browser capabilities to perform all resizing, compression, and format conversions **100% locally on your device**. 
- **Zero Server Overhead:** Files are processed on your browser using your CPU. No data is ever sent to a server.
- **Absolute Privacy:** Your document literally never leaves your phone or laptop. 
- **Lightning Fast:** Powered by local processing APIs and Web Workers for instant results.

---

## 🚀 Deep-Dive Features List

### 🔄 Multi-Engine Client-Side Formatting
All image manipulation happens completely inside your browser's sandboxed environment via the Native Canvas API and WebAssembly. 

### 🧬 Dynamic NLP Requirement Parser
Paste high-level administrative rules from a government website (e.g. *"Passport photo size must be 3.5cm x 4.5cm, under 50KB"*). PasteDocs' dynamic RegExp parsing engine instantly extracts the raw pixel bounds, target KB weight limits, and backdrop configurations to execute automated transformations.

### 🧵 Multithreaded Background Web Workers
Heavy scaling and compression math is offloaded from the main UI thread to asynchronous background **Web Workers** (`docWorker.ts`). This ensures the app maintains **60fps animations** on low-end smartphones while running high-quality compression loops.

### 🏎️ High-Performance Catalog & Filtering
The platform hosts **130+ pre-configured templates** mapped across multiple specialized target categories:
- **Central Govt:** State UPSC, SSC, banking exams (SBI PO, IBPS).
- **State PSC:** Provincial administrative exam standards.
- **Police & Judiciary:** Law enforcement physical-application sizing guidelines.
- **ID Documents:** Aadhaar, PAN card, driving licenses, and marksheets.
- **Visa Photo:** Biometric compliant dimensional cuts for worldwide countries (US, UAE, Schengen, etc).

---

## 🔒 Recent Platform Upgrades & Stability Optimizations

To ensure production-grade security, enterprise performance, and unmatched mobile reliability, we have implemented the following system enhancements:

### 1. Zero-Blocking Alerts Interface
- Replaced legacy, thread-blocking synchronous `window.alert()` calls across the entire platform (WhatsApp copy sharing, file downloaders, ZIP bundler pipelines).
- Implemented stateful, non-blocking visual feedback overlays, inline validation messages, and smooth feedback banners.
- Users no longer experience UI freezing during heavy queue compression.

### 2. High-Performance Memory & Handle Cleanup
- Optimized the file-handling pipelines to actively revoke target browser references.
- Every `URL.createObjectURL` is programmatically cleaned up with `URL.revokeObjectURL(url)` immediately after loading to prevent system memory leaks. 
- This prevents page crashes and slow-downs when processing batch queues on standard RAM-constrained mobile browsers.

### 3. Smart 50MB Safeguards
- Rigid limits are enforced client-side inside `useDocStore.ts`. 
- Attempting to drop massive, unsupported raw assets immediately triggers a warning banner rather than letting the web browser choke or run out of memory.

### 4. Dynamic Router Template Map & Seamless SEO Integration
- Fully integrated programmatic SEO template engines matching dynamic routes (`/exam/:slug`, `/tool/:slug`, `/document/:slug`, `/visa/:slug`).
- These templates dynamically load exact configurations from the core data structures (`ALL_TOOLS`, `ALL_EXAMS`, `ALL_DOCUMENTS`, `ALL_VISAS`) to automatically feed precise DPI, aspect parameters, background replacement codes, and format criteria into the processing core.

---

## 💻 Tech Stack

PasteDocs is powered by robust, industry-standard modern tooling:

### Frontend Core & Build
- **React (v18+)** - Declarative component-based user interfaces.
- **Vite** - Blazing fast bundler and builder.
- **TypeScript** - Strict static typing for bug-free scaling.

### State & Routing
- **Zustand** - Unopinionated, lightweight, and incredibly fast state management without React Context re-render cycles.
- **React Router Dom (v6)** - Client-side page management optimized for search visibility and indexing.

### Styling & UI
- **Tailwind CSS (v4)** - Responsive utility classes keeping bundle sizes extraordinarily lean.
- **Lucide React** - Clean and accessible vector iconography.
- **Framer Motion** - Smooth transitions and micro-interactions.

---

## 📂 Project Directory Structure

```text
├── 📁 public/
│   ├── ✨ favicon.svg
│   ├── 📝 manifest.json
│   └── 🌐 _redirects         # Single-Page App redirection routing for hosting
├── 📁 src/
│   ├── 📁 components/        # Isolated reusable UI components
│   │   ├── UploadZone.tsx    # Drag-and-drop file interface
│   │   ├── BulkDownload.tsx  # Dynamic ZIP packaging for batches
│   │   ├── FileQueueItem.tsx # File queue element with validation error displays
│   │   └── Layout.tsx        # Responsive site shell header/footer
│   ├── 📁 pages/             # Route-level components
│   │   ├── Home.tsx          # Main formatting hub
│   │   ├── Tools.tsx         # Real-time searchable pre-config catalog
│   │   ├── ToolTemplate.tsx  # Dynamic single-tool template
│   │   ├── ExamTemplate.tsx  # Dynamic single-exam template
│   │   └── Privacy.tsx       # Absolute privacy declaration
│   ├── 📁 store/             # Zustand state management
│   │   └── useDocStore.ts    # Centralized state engine with 50MB safeguards
│   ├── 📁 data/              # Programmatic SEO configurations
│   │   ├── toolData.ts       # Utility templates list
│   │   ├── examData.ts       # Global exam requirements database
│   │   ├── documentData.ts   # Main government ID specs
│   │   └── visaData.ts       # International visa standards
│   ├── 📁 workers/           # Background multithreading
│   │   └── docWorker.ts      # Web Worker background compression script
│   ├── 🎨 index.css          # Tailwind CSS entry file
│   ├── ⚛️ App.tsx            # Main router configuration
│   └── 🚀 main.tsx           # React DOM injection point
├── ⚙️ package.json           # Dependencies and build scripts
├── ⚙️ vite.config.ts         # Vite bundler rules
└── 📜 README.md              # Project documentation (You are here)
```

---

## 🕹️ Getting Started (Local Setup)

Want to run the absolute privacy formatter locally on your machine?

**1. Clone the repository**
```bash
git clone https://github.com/your-username/pastedocs.git
cd pastedocs
```

**2. Install dependencies**
```bash
npm install
```

**3. Launch the development server**
```bash
npm run dev
```

**4. Build for production**
```bash
npm run build
```
The highly optimized standalone client-side files will compile cleanly into the `/dist` directory.

---

## 👨‍💻 About the Developer

PasteDocs was passionately engineered and launched by **Jay Prajapati**, a final-year Diploma in Information Technology student and indie SaaS builder based in Gujarat, India. 

Driven by the belief that high-quality, problem-solving software shouldn't spy on you, this tool was created to save thousands of applicants from the headache of highly strict bureaucratic requirements and sketchy, ad-backed resizers.

---

## 📝 License

This project is licensed under the **MIT License**. Refer to the `LICENSE` file for full details.
