'use client';

import { useState } from 'react';
import { Search, MoreVertical, Paperclip, Smile, Send } from 'lucide-react';
import { Chat, Message } from '../types/chat';
import MessageBubble from './MessageBubble';

interface ChatAreaProps {
  chat: Chat;
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hey! How are you doing?',
    timestamp: '10:25 AM',
    isSent: false,
    isRead: true,
  },
  {
    id: '2',
    text: "I'm doing great, thanks for asking! How about you?",
    timestamp: '10:26 AM',
    isSent: true,
    isRead: true,
  },
  {
    id: '3',
    text: "I'm good too! Just working on some projects.",
    timestamp: '10:27 AM',
    isSent: false,
    isRead: true,
  },
  {
    id: '4',
    text: 'That sounds interesting! What kind of projects?',
    timestamp: '10:28 AM',
    isSent: true,
    isRead: true,
  },
  {
    id: '5',
    text: 'Mostly web development stuff. Building a chat app actually!',
    timestamp: '10:29 AM',
    isSent: false,
    isRead: true,
  },
  {
    id: '6',
    text: 'Wow, that is cool! I would love to see it when you are done.',
    timestamp: '10:30 AM',
    isSent: true,
    isRead: true,
  },
];

export default function ChatArea({ chat }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isSent: true,
        isRead: false,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0b141a]">
      {/* Header */}
      <div className="h-16 bg-[#202c33] px-4 flex items-center justify-between border-b border-[#2a3942]">
        <div className="flex items-center gap-3">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-[#e9edef] font-medium">{chat.name}</h2>
            <p className="text-xs text-[#8696a0]">
              {chat.isOnline ? 'online' : 'offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-[#2a3942] transition-colors">
            <Search className="w-5 h-5 text-[#aebac1]" />
          </button>
          <button className="p-2 rounded-full hover:bg-[#2a3942] transition-colors">
            <MoreVertical className="w-5 h-5 text-[#aebac1]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#0b141a] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxwYXRoIGQ9Ik0wIDBoMTAwdjEwMEgweiIgZmlsbD0iIzBiMTQxYSIvPjxwYXRoIGQ9Ik0wIDBoNTB2NTBINTB6IiBmaWxsPSIjMTExYjIxIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')]">
        <div className="max-w-3xl mx-auto space-y-2">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-[#202c33] px-4 py-3">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-[#2a3942] transition-colors">
            <Smile className="w-5 h-5 text-[#8696a0]" />
          </button>
          <button className="p-2 rounded-full hover:bg-[#2a3942] transition-colors">
            <Paperclip className="w-5 h-5 text-[#8696a0]" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="w-full px-4 py-2 bg-[#2a3942] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-1 focus:ring-[#00a884]"
            />
          </div>
          {inputText.trim() ? (
            <button
              onClick={handleSend}
              className="p-2 rounded-full bg-[#00a884] hover:bg-[#06cf9c] transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          ) : (
            <button className="p-2 rounded-full hover:bg-[#2a3942] transition-colors">
              <Send className="w-5 h-5 text-[#8696a0]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
