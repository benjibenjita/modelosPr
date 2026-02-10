import React from 'react';

export const Minimap = () => {
    return (
        <div className="relative w-48 h-48 bg-black/90 border border-cyan-500/50 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(0,240,255,0.1)]">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
                {/* Background Grid */}
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 240, 255, 0.1)" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Dynamic content would go here, for now static representation of campus */}
                {/* Central Block A - Rotated */}
                <rect x="90" y="90" width="20" height="20" transform="rotate(45, 100, 100)" fill="#1B4D3E" stroke="#00f0ff" strokeWidth="1" />

                {/* Block B */}
                <rect x="60" y="120" width="15" height="15" fill="#333" stroke="#00f0ff" strokeWidth="1" />

                {/* Block D */}
                <rect x="60" y="60" width="15" height="15" fill="#333" stroke="#00f0ff" strokeWidth="1" />

                {/* Admin */}
                <path d="M 160 100 L 180 90 L 180 110 Z" fill="#bd00ff" />

                {/* You Are Here Marker (Static for now) */}
                <circle cx="100" cy="180" r="3" fill="yellow">
                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                </circle>
            </svg>
            <div className="absolute bottom-1 right-1 text-[10px] text-cyan-500/80 font-mono">X: 120 Y: 45</div>
        </div>
    );
};
