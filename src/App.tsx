import { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatInput from "./components/ChatInput";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import "./App.css";

export type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  createdAt: number;
};

export type Chat = {
  id: string;
  name: string;
  messages: Message[];
  isTyping?: boolean; 
};

function uid() {
  return crypto.randomUUID?.() ?? String(Date.now() + Math.random());
}

function pickRandom(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function getSmartResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (msg.includes("react")) {
    return pickRandom([
      "React tip: keep state as high as necessary, as low as possible.",
      "React likes immutable updates—avoid mutating arrays/objects in state.",
      "In React, derived data is often better computed than stored.",
      "If you’re mapping lists, remember stable keys (ids > index).",
    ]);
  }

  if (msg.includes("typescript") || msg.includes("ts")) {
    return pickRandom([
      "TypeScript tip: type your boundaries—props, state, and function inputs.",
      "If TS complains about null, add a guard or use a non-null assertion carefully.",
      "Use union types for constrained values (like role: 'user' | 'assistant').",
    ]);
  }

  if (
    msg.includes("help") ||
    msg.includes("stuck") ||
    msg.includes("confused")
  ) {
    return pickRandom([
      "Tell me what you expected to happen vs what actually happened.",
      "Drop the error message or a screenshot and I’ll help you debug it.",
      "What part is unclear—state, props, events, or TypeScript?",
    ]);
  }

  if (msg.includes("error") || msg.includes("bug") || msg.includes("broken")) {
    return pickRandom([
      "Debug move: check the console first—what’s the exact error text?",
      "Try isolating: comment out pieces until the error disappears, then narrow it down.",
      "If it’s state-related, confirm you’re not mutating arrays/objects directly.",
    ]);
  }

  if (msg.includes("css") || msg.includes("style") || msg.includes("layout")) {
    return pickRandom([
      "CSS tip: flex + gap is your best friend for clean layouts.",
      "If alignment is off, check parent display settings and element widths.",
      "Use max-width on content areas to avoid super wide UI on large screens.",
    ]);
  }

  return pickRandom([
    "Interesting—say a bit more about that.",
    "I’m with you. What’s the next step you’re thinking?",
    "Let’s break that down—what’s the main goal?",
    "That makes sense. Want a quick example?",
    `You said: "${userMessage}". What would you like to do with that?`,
  ]);
}

export default function App() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: uid(),
      name: "React Basics",
      messages: [
        {
          id: uid(),
          role: "assistant",
          text: "Welcome! Pick a chat and send a message.",
          createdAt: Date.now(),
        },
      ],
      isTyping: false,
    },
    { id: uid(), name: "Props & State", messages: [], isTyping: false },
    { id: uid(), name: "Component Structure", messages: [], isTyping: false },
  ]);

  const [activeChatId, setActiveChatId] = useState<string>(chats[0]?.id ?? "");
  const [newChatInput, setNewChatInput] = useState<string>("");

  const activeChat = useMemo(
    () => chats.find((c) => c.id === activeChatId) ?? null,
    [chats, activeChatId],
  );

  function addChat(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const newChat: Chat = {
      id: uid(),
      name: trimmed,
      messages: [],
      isTyping: false,
    };
    setChats((prev) => [...prev, newChat]);
    setActiveChatId(newChat.id);
    setNewChatInput("");
  }

  function deleteChat(chatId: string) {
    setChats((prev) => {
      const next = prev.filter((c) => c.id !== chatId);
      if (chatId === activeChatId) {
        setActiveChatId(next[0]?.id ?? "");
      }
      return next;
    });
  }

  function renameChat(chatId: string, newName: string) {
    const trimmed = newName.trim();
    if (!trimmed) return;

    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, name: trimmed } : c)),
    );
  }

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || !activeChatId) return;

    const userMsg: Message = {
      id: uid(),
      role: "user",
      text: trimmed,
      createdAt: Date.now(),
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, userMsg], isTyping: true }
          : chat,
      ),
    );

    const delay = 600 + Math.floor(Math.random() * 800);

    window.setTimeout(() => {
      const botMsg: Message = {
        id: uid(),
        role: "assistant",
        text: getSmartResponse(trimmed),
        createdAt: Date.now(),
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, botMsg], isTyping: false }
            : chat,
        ),
      );
    }, delay);
  }

  return (
    <div className="app">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onDeleteChat={deleteChat}
        onRenameChat={renameChat}
      />

      <main className="main-content">
        <h1>Chat App</h1>

        <ChatInput
          input={newChatInput}
          setInput={setNewChatInput}
          addChat={addChat}
        />

        <div className="chat-area">
          <ChatWindow chat={activeChat} />
          <MessageInput onSend={sendMessage} disabled={!activeChatId} />
        </div>
      </main>
    </div>
  );
}