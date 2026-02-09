import Link from "next/link";
import { useEffect, useState } from "react";
import {
  faMessage,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObjectId } from "mongodb";
import { v4 as uuid } from "uuid";

export const ChatSidebar = ({ chatId }) => {
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
  }, [chatId]);

  return (
    <div className="flex flex-col overflow-hidden bg-gray-900 text-white">
      <Link
        href="/chat"
        className="side-menu-item bg-emerald-500 hover:bg-emerald-600"
      >
        <FontAwesomeIcon icon={faPlus} /> New chat
      </Link>
      <div className="flex-1 overflow-auto bg-gray-950">
        {chatList.map((chat) => (
          <Link
            key={chat._id}
            href={`/chat/${chat._id}`}
            className={`side-menu-item ${
              chatId === chat._id ? "bg-gray-700 hover:bg-gray-700" : ""
            }`}
          >
            <FontAwesomeIcon icon={faMessage} className="text-white/50" />{" "}
            <span
              title={chat.title}
              className="overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {chat.title}
            </span>
          </Link>
        ))}
      </div>
      <Link href="/api/auth/logout" className="side-menu-item">
        <FontAwesomeIcon icon={faRightFromBracket} /> Logout
      </Link>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const chatId = ctx.params?.chatId?.[0] || null;
  if (chatId) {
    const { user } = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    const db = client.db("FofoDB");
    const chat = await db.collection("chats").findOne({
      userId: user.sub,
      _id: new ObjectId(chatId),
    });
    return {
      props: {
        chatId,
        title: chat.title,
        messages: chat.messages.map((message) => ({
          ...message,
          _id: uuid(),
        })),
      },
    };
  }
  return {
    props: {},
  };
};
