# Chat Workshop App (React + Vite + TypeScript)

A workshop-built chat application demonstrating modern React architecture, TypeScript usage, component design, state management, and UI interaction patterns.

This project evolved step-by-step from a simple chat list into a fully interactive mini chat system.

---

## 🚀 Tech Stack

- React 18
- Vite
- TypeScript
- CSS (Flexbox layout)

---

## 🎯 Features

### 🗂 Chat Management (Sidebar)
- Add new chats
- Select active chat
- Rename chats (inline edit mode)
- Delete chats (auto-selects another if active is deleted)

### 💬 Messaging System
- Send messages to active chat
- Messages stored per chat
- User and assistant roles
- Messages rendered dynamically

### 🤖 Smart Assistant
- Random conversational responses
- Keyword-based intelligent responses:
  - React
  - TypeScript
  - CSS / layout
  - Debugging / errors
  - Help requests
- Fake typing delay (600–1400ms)
- “Assistant is typing…” indicator

---

## 🧠 Architecture Overview

### Data Modeling

```ts
type Message = {
  id: string
  role: "user" | "assistant"
  text: string
  createdAt: number
}

type Chat = {
  id: string
  name: string
  messages: Message[]
  isTyping?: boolean
}

src/
  components/
    Sidebar.tsx
    ChatInput.tsx
    ChatWindow.tsx
    MessageInput.tsx
  App.tsx
  App.css
  main.tsx
  index.css

⚙️ Setup Instructions
1️ Create Project
npm create vite@latest chat-workshop -- --template react-ts
cd chat-workshop
npm install
2️ Run Dev Server
npm run dev
3️ Build
npm run build
4️ Preview Production Build
npm run preview
🧩 Core Concepts Demonstrated

Functional Components

Props & Prop Drilling

State Management with useState

Derived State with useMemo

Controlled Inputs

Form Submission Handling

Event Typing in TypeScript

Immutable State Updates

Conditional Rendering

Component Composition

Smart Response Logic

Asynchronous UI simulation with setTimeout

🔮 Possible Future Improvements

Persist chats to localStorage

Real AI API integration

Message timestamps formatting

Scroll-to-bottom behavior

Animations for typing indicator

Dark/light theme toggle

Context API or state management library

📚 Purpose

This project was built as a structured learning workshop to understand:

How React apps scale from simple lists to dynamic systems

How to model application data

How to structure real-world components

How TypeScript improves safety and clarity
