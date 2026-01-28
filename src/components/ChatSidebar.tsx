'use client';

import { Search, MoreVertical, MessageCircle } from 'lucide-react';
import { Chat } from '../types/chat';

interface ChatSidebarProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
}

export default function ChatSidebar({
  chats,
  selectedChat,
  onChatSelect,
}: ChatSidebarProps) {
  return (
    <div className="w-1/3 min-w-[320px] max-w-[420px] flex flex-col bg-[#111b21] border-r border-[#2a3942]">
      {/* Header */}
      <div className="h-16 bg-[#202c33] px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#6a7175] flex items-center justify-center cursor-pointer hover:bg-[#54656f] transition-colors">
            <span className="text-lg">👤</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-[#2a3942] transition-colors">
            <MessageCircle className="w-5 h-5 text-[#aebac1]" />
          </button>
          <button className="p-2 rounded-full hover:bg-[#2a3942] transition-colors">
            <MoreVertical className="w-5 h-5 text-[#aebac1]" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2 bg-[#111b21]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8696a0]" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full pl-10 pr-4 py-2 bg-[#202c33] rounded-lg text-[#d1d7db] placeholder-[#8696a0] focus:outline-none focus:ring-1 focus:ring-[#00a884]"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className={`px-4 py-3 cursor-pointer hover:bg-[#202c33] transition-colors border-b border-[#2a3942] ${
              selectedChat?.id === chat.id ? 'bg-[#2a3942]' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full"
                />
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00a884] rounded-full border-2 border-[#111b21]"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[#e9edef] font-medium text-sm truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-[#8696a0] ml-2">
                    {chat.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#8696a0] truncate">
                    {chat.lastMessage}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className="ml-2 bg-[#00a884] text-white text-xs font-medium px-2 py-0.5 rounded-full min-w-[20px] text-center">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
