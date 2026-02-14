import { useState } from "react";
import type { Chat } from "../App";

type SidebarProps = {
  chats: Chat[];
  activeChatId: string;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string, newName: string) => void;
};

export default function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
}: SidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState<string>("");

  function startRename(chat: Chat) {
    setEditingId(chat.id);
    setDraftName(chat.name);
  }

  function cancelRename() {
    setEditingId(null);
    setDraftName("");
  }

  function saveRename(chatId: string) {
    onRenameChat(chatId, draftName);
    cancelRename();
  }

  return (
    <aside className="sidebar">
      <h2>Chats</h2>

      <ul className="chat-list">
        {chats.map((chat) => {
          const isActive = chat.id === activeChatId;
          const isEditing = chat.id === editingId;

          return (
            <li
              key={chat.id}
              className={isActive ? "chat-row active" : "chat-row"}
            >
              {isEditing ? (
                <div className="chat-edit">
                  <input
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveRename(chat.id);
                      if (e.key === "Escape") cancelRename();
                    }}
                    autoFocus
                  />
                  <button type="button" onClick={() => saveRename(chat.id)}>
                    Save
                  </button>
                  <button type="button" onClick={cancelRename}>
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    className="chat-item"
                    onClick={() => onSelectChat(chat.id)}
                    title="Select chat"
                  >
                    {chat.name}
                  </button>

                  <div className="chat-actions">
                    <button
                      type="button"
                      onClick={() => startRename(chat)}
                      title="Rename"
                    >
                      Rename
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteChat(chat.id)}
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}