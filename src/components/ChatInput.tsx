import type { Dispatch, SetStateAction, FormEvent, ChangeEvent } from "react";

type ChatInputProps = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  addChat: (name: string) => void;
};

export default function ChatInput({
  input,
  setInput,
  addChat,
}: ChatInputProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addChat(input);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="chat-create">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter chat name..."
      />
      <button type="submit">Add</button>
    </form>
  );
}
