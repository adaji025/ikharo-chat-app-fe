'use client';

import { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatArea from './ChatArea';
import { Chat } from '../types/chat';

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    lastMessage: 'Hey, how are you?',
    timestamp: '10:30 AM',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    lastMessage: 'See you tomorrow!',
    timestamp: '9:15 AM',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: '3',
    name: 'Alice Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    lastMessage: 'Thanks for the help!',
    timestamp: 'Yesterday',
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: '4',
    name: 'Bob Williams',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    lastMessage: 'Can we meet today?',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: '5',
    name: 'Charlie Brown',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
    lastMessage: 'Great! See you there.',
    timestamp: '2 days ago',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '6',
    name: 'Diana Prince',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
    lastMessage: 'The meeting is at 3 PM',
    timestamp: '2 days ago',
    unreadCount: 3,
    isOnline: true,
  },
];

export default function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [chats, setChats] = useState<Chat[]>(mockChats);

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    // Mark as read when selected
    setChats((prevChats) =>
      prevChats.map((c) =>
        c.id === chat.id ? { ...c, unreadCount: 0 } : c
      )
    );
  };

  return (
    <div className="flex h-screen bg-[#0b141a] text-white">
      <ChatSidebar
        chats={chats}
        selectedChat={selectedChat}
        onChatSelect={handleChatSelect}
      />
      {selectedChat ? (
        <ChatArea chat={selectedChat} />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[#0b141a]">
          <div className="text-center">
            <h2 className="text-2xl font-light text-gray-400 mb-2">
              Select a chat to start messaging
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
