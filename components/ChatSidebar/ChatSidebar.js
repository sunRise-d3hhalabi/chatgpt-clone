import Link from "next/link";
import { useEffect, useState } from "react";

export const ChatSidebar = () => {
  const [chatList, setChatList] = useState([]);
  useEffect(() => {
    const loadChatList = async () => {
      const response = await fetch(`/api/chat/getChatList`, {
        method: "POST",
      });
      const json = await response.json();
      console.log("CHAT LIST: ", json);
      setChatList(json?.chats || []);
    };
    loadChatList();
  }, []);
  return (
    <div className="flex flex-col overflow-hidden bg-gray-900 text-white">
      <Link href="/chat">New chat</Link>
      <div className="flex-1 overflow-auto bg-gray-950">
        {chatList.map((chat) => (
          <Link key={chat._id} href={`/chat/${chat._id}`}>
            {chat.title} <br/>
          </Link>
          
        ))}
      </div>
      <Link href="/api/auth/logout">Logout</Link>
    </div>
  );
};
