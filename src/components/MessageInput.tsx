import { useState } from "react";

type MessageInputProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [text, setText] = useState("");

  function submit() {
    if (disabled) return;
    onSend(text);
    setText("");
  }

  return (
    <div className="message-input">
      <input
        type="text"
        value={text}
        disabled={disabled}
        placeholder={disabled ? "Select a chat first..." : "Type a message..."}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
      />
      <button type="button" onClick={submit} disabled={disabled}>
        Send
      </button>
    </div>
  );
}