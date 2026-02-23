
import { CheckCheck, Check, FileText, Download } from 'lucide-react';
import { ChatMessage } from '../hooks/useChat';
import VoiceMessage from './VoiceMessage';

interface MessageBubbleProps {
    message: ChatMessage;
    isMine: boolean;
    showTail: boolean;
}

const formatTime = (date: any) => {
    if (!date) return '';
    try {
        const d = date instanceof Date ? date : new Date(date);

        // checking if valid date
        if (isNaN(d.getTime())) return '';

        return d.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    } catch {
        return '';
    }
};

export default function MessageBubble({ message, isMine, showTail }: MessageBubbleProps) {
    return (
        <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} ${showTail ? 'mt-3' : 'mt-0.5'}`}>
            <div
                className={`relative max-w-[85%] sm:max-w-md md:max-w-xl px-2.5 pt-1.5 pb-2 shadow-sm ${isMine
                    ? 'bg-blue-600 text-white rounded-lg'
                    : 'bg-white text-gray-900 rounded-lg border border-gray-100'
                    } ${showTail && isMine ? 'rounded-tr-none' : ''} ${showTail && !isMine ? 'rounded-tl-none' : ''}`}
            >
                {/* Triangle Tail */}
                {showTail && (
                    <div
                        className={`absolute top-0 w-[11px] h-[13px] ${isMine ? 'right-[-8px] bg-blue-600' : 'left-[-8px] bg-white ' + (!isMine ? 'border-t border-l border-gray-100' : '')
                            }`}
                        style={{ clipPath: isMine ? 'polygon(0 0, 0 100%, 100% 0)' : 'polygon(0 0, 100% 0, 100% 100%)' }}
                    ></div>
                )}

                <div className="flex flex-wrap items-end gap-1.5 min-w-0 pr-1 z-10 relative">
                    {message.type === 'voice' && message.voiceUrl ? (
                        <VoiceMessage audioUrl={message.voiceUrl} isMine={isMine} />
                    ) : message.type === 'image' && message.fileUrl ? (
                        <div className="flex flex-col flex-1 mr-6 -mt-1 -ml-1.5 -mr-1.5 mb-1 bg-black/5 rounded-[6px] overflow-hidden group">
                            <a href={message.fileUrl} target="_blank" rel="noopener noreferrer">
                                <img src={message.fileUrl} alt={message.fileName || "Image"} className="max-w-full sm:max-w-xs h-auto max-h-[300px] object-cover rounded-[6px]" />
                            </a>
                        </div>
                    ) : message.type === 'video' && message.fileUrl ? (
                        <div className="flex flex-col flex-1 mr-6 -mt-1 -ml-1.5 -mr-1.5 mb-1 bg-black/5 rounded-[6px] overflow-hidden">
                            <video src={message.fileUrl} controls className="max-w-full sm:max-w-xs h-auto max-h-[300px] rounded-[6px]" />
                        </div>
                    ) : message.type === 'file' && message.fileUrl ? (
                        <div className={`flex flex-1 items-center gap-3 p-2.5 rounded-lg border ${isMine ? 'bg-white/10 border-white/20' : 'bg-gray-50 border-gray-200'} mr-6 mb-1 mt-1`}>
                            <div className={`p-2 rounded-full shrink-0 ${isMine ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                                <FileText className={`w-5 h-5 ${isMine ? 'text-white' : 'text-blue-500'}`} />
                            </div>
                            <div className="flex-1 min-w-0 pr-2">
                                <p className="text-[13px] font-medium leading-tight truncate">{message.fileName || "Document"}</p>
                                <p className={`text-[11px] mt-0.5 ${isMine ? 'text-blue-200' : 'text-gray-500'}`}>
                                    {message.fileSize ? (message.fileSize / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown size'} • {message.fileName?.split('.').pop()?.toUpperCase()}
                                </p>
                            </div>
                            <a href={message.fileUrl} target="_blank" rel="noopener noreferrer" download className={`p-2 shrink-0 rounded-full hover:bg-black/10 transition-colors`}>
                                <Download className={`w-4 h-4 ${isMine ? 'text-white' : 'text-gray-500'}`} />
                            </a>
                        </div>
                    ) : (
                        <p className="text-[14.2px] break-words whitespace-pre-wrap flex-1 mr-6">{message.text}</p>
                    )}

                    <div className="flex items-center space-x-0.5 shrink-0 translate-y-1 -mr-0.5 float-right max-h-[15px]">
                        <span className={`text-[11px] leading-[15px] ${isMine ? 'text-blue-100' : 'text-gray-400'}`}>
                            {formatTime(message.createdAt)}
                        </span>
                        {isMine && (
                            message.status === 'read' ? (
                                <CheckCheck className="w-[16px] h-[15px] text-cyan-300 ml-1" />
                            ) : message.status === 'delivered' ? (
                                <CheckCheck className="w-[16px] h-[15px] text-white/70 ml-1" />
                            ) : (
                                <Check className="w-[16px] h-[15px] text-white/70 ml-1" />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
