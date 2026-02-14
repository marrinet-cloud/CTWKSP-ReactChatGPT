import type { Chat } from "../App";

type ChatWindowProps = {
  chat: Chat | null;
};

export default function ChatWindow({ chat }: ChatWindowProps) {
  if (!chat) return <div className="chat-window">Select a chat to start.</div>;

  return (
    <div className="chat-window">
      <div className="chat-title">{chat.name}</div>

      <div className="messages">
        {chat.messages.length === 0 ? (
          <div className="empty">No messages yet. Send one below.</div>
        ) : (
          chat.messages.map((m) => (
            <div
              key={m.id}
              className={m.role === "user" ? "msg user" : "msg assistant"}
            >
              {m.text}
            </div>
          ))
        )}

        {chat.isTyping ? (
          <div className="typing">Assistant is typing…</div>
        ) : null}
      </div>
    </div>
  );
}