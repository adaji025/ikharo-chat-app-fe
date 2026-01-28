import { Check, CheckCheck } from 'lucide-react';
import { Message } from '../types/chat';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[65%] rounded-lg px-2 py-1 ${
          message.isSent
            ? 'bg-[#005c4b] text-[#e9edef]'
            : 'bg-[#202c33] text-[#e9edef]'
        }`}
      >
        <div className="flex items-end gap-1">
          <p className="text-sm break-words">{message.text}</p>
          <div className="flex items-center gap-1 min-w-fit">
            <span className="text-xs text-[#8696a0] whitespace-nowrap">
              {message.timestamp}
            </span>
            {message.isSent && (
              <span className="text-[#8696a0]">
                {message.isRead ? (
                  <CheckCheck className="w-4 h-4 text-[#53bdeb]" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
