import { useState } from "react";
import sendImg from "../../assets/send.svg";
import "./chat.css";

const SelectedChat = () => {
  const [content, setContent] = useState("");

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
  };

  return (
    <section className="selected-chat">
      <div className="selected-chat_action d-f g-1">
        <input
          type="text"
          value={content}
          placeholder="Type a message"
          onChange={handleContentChange}
          autoFocus
        />
        <button onClick={handleSendMessage}>
          <img src={sendImg} />
        </button>
      </div>
    </section>
  );
};

export default SelectedChat;
