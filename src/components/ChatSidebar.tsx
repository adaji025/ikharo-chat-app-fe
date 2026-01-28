'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MoreVertical, MessageCircle, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
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
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="w-1/3 min-w-[320px] max-w-[420px] flex flex-col bg-[#111b21] border-r border-[#2a3942]">
      {/* Header */}
      <div className="h-16 bg-[#202c33] px-4 flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#6a7175] flex items-center justify-center cursor-pointer hover:bg-[#54656f] transition-colors">
              <span className="text-lg">👤</span>
            </div>
          )}
          {user && (
            <div>
              <p className="text-sm text-[#e9edef] font-medium">{user.name}</p>
              <p className="text-xs text-[#8696a0]">{user.email}</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-[#2a3942] transition-colors">
            <MessageCircle className="w-5 h-5 text-[#aebac1]" />
          </button>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full hover:bg-[#2a3942] transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-[#aebac1]" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-12 bg-[#202c33] border border-[#2a3942] rounded-lg shadow-lg min-w-[180px] z-10">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 flex items-center gap-3 text-[#e9edef] hover:bg-[#2a3942] transition-colors rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
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
