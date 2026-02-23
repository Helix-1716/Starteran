

export default function TypingIndicator() {
    return (
        <div className="flex justify-start mt-3 mb-2">
            <div className="bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-1.5 w-fit">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
        </div>
    );
}
