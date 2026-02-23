
import { Loader2 } from 'lucide-react';

/**
 * 2️⃣ NORMAL LOADER FOR OTHER ACTIONS
 * 
 * Minimal reusable circular spinner for async actions like fetching, sending, uploading.
 */
interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
    const sizeClass = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    }[size];

    return (
        <Loader2
            className={`animate-spin text-purple-600 ${sizeClass} ${className}`}
            style={{
                filter: 'drop-shadow(0px 0px 4px rgba(139, 92, 246, 0.4))'
            }}
        />
    );
}
