import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  // Sample messages array
  const {targetUserId} = useParams();
  const messagesEndRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
  ]);
  const user = useSelector((state) => state.user.user);
  const userId = user?._id
  const firstName = user?.firstName;

  const fetchMessages = async () => {
    const resp = await axios.get(BASE_URL + `/chat/${targetUserId}`, {withCredentials: true});

    setMessages(resp.data.messages);
  }

  useEffect(() => {
    fetchMessages();
  }, [targetUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  useEffect(() => {
    if(!userId || !targetUserId) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
        console.log(firstName + " :  " + text);
        setMessages((messages) => [...messages, { firstName, lastName, text }]);
      });

    return () => {
        socket.disconnect();
    }
  }, [userId, targetUserId])

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[70vh] w-2/3 max-w-lg mx-auto bg-base-200">
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4 border border-gray-300 rounded-lg mx-4 my-4">
        {messages.map((msg, index) => {
          const firstName = msg?.senderId?.firstName || msg?.firstName;
          const lastName = msg?.senderId?.lastName || msg?.lastName;
          return (
            <div
              key={index}
              className={
                "chat " +
                (user?.firstName === firstName ? "chat-end" : "chat-start")
              }
            >

              <div className="chat-header">
              {`${firstName} ${lastName}`}
                <time className="text-xs opacity-50"> 2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-base-300">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="input input-bordered flex-grow mr-4"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;