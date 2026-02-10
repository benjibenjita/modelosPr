import React, { useRef } from 'react';
import {
    CloudIcon,
    SunIcon,
    CloudRainIcon,
    WindIcon,
    SignalIcon,
    MapPinIcon,
    Navigation2Icon,
    ChevronLeftIcon,
    ChevronRightIcon
} from 'lucide-react';

interface InterfaceProps {
    onNavigate: (position: [number, number, number]) => void;
    onWeatherChange: (mode: 'clear' | 'rain' | 'fog') => void;
    onToggleNetwork: () => void;
    showNetwork: boolean;
}

const locations = [
    { name: 'Bloque A (Complex)', position: [10, 5, 25] },
    { name: 'Bloque B (Complex)', position: [-8, 5, 5] },
    { name: 'Bloque D (Complex)', position: [8, 5, -35] },
    { name: 'Bloque H (Complex)', position: [8, 5, -21] },
    { name: 'Biblioteca', position: [50, 5, -50] },
    { name: 'Administrativo', position: [55, 5, 25] },
    { name: 'Entrada Principal', position: [120, 5, 45] },
    { name: 'Plaza Cívica', position: [35, 5, 25] },
];

export const Interface: React.FC<InterfaceProps> = ({ onNavigate, onWeatherChange, onToggleNetwork, showNetwork }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-6 select-none">
            {/* Header */}
            <header className="flex justify-between items-start pointer-events-auto">
                <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                    <h1 className="text-white text-2xl font-bold tracking-tighter flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        EspeMap
                    </h1>
                    <p className="text-white/40 text-xs mt-1 uppercase tracking-widest font-medium">Visualizador Interactivo del Campus</p>
                </div>

                <div className="flex gap-2">
                    <div className="flex bg-black/40 backdrop-blur-md border border-white/10 p-1 rounded-lg">
                        <button
                            onClick={() => onWeatherChange('clear')}
                            className="p-2 hover:bg-white/10 rounded-md transition-all text-white/70 hover:text-white"
                            title="Clear Sky"
                        >
                            <SunIcon size={20} />
                        </button>
                        <button
                            onClick={() => onWeatherChange('rain')}
                            className="p-2 hover:bg-white/10 rounded-md transition-all text-white/70 hover:text-white"
                            title="Rain System"
                        >
                            <CloudRainIcon size={20} />
                        </button>
                        <button
                            onClick={() => onWeatherChange('fog')}
                            className="p-2 hover:bg-white/10 rounded-md transition-all text-white/70 hover:text-white"
                            title="Cyber Fog"
                        >
                            <WindIcon size={20} />
                        </button>
                    </div>

                    <button
                        onClick={onToggleNetwork}
                        className={`p-3 backdrop-blur-md border rounded-xl transition-all ${showNetwork
                            ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                            : 'bg-black/40 border-white/10 text-white/70 hover:text-white'
                            }`}
                        title="Toggle Network Layer"
                    >
                        <SignalIcon size={20} />
                    </button>
                </div>
            </header>

            {/* Navigation Footer with Arrows */}
            <footer className="relative w-full pointer-events-auto flex items-center group/footer px-10">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 z-20 p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 transition-all shadow-2xl active:scale-95"
                >
                    <ChevronLeftIcon size={24} />
                </button>

                {/* Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="w-full overflow-x-auto flex gap-4 py-8 no-scrollbar scroll-smooth"
                >
                    {locations.map((loc) => (
                        <button
                            key={loc.name}
                            onClick={() => onNavigate(loc.position as [number, number, number])}
                            className="group relative flex flex-col items-start bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500/50 p-5 rounded-2xl min-w-[200px] transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 overflow-hidden shadow-lg"
                        >
                            {/* Decorative Glow */}
                            <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />

                            <div className="flex items-center justify-between w-full mb-3">
                                <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                                    <MapPinIcon size={16} className="text-blue-400/70 group-hover:text-blue-400" />
                                </div>
                                <Navigation2Icon size={14} className="text-white/10 group-hover:text-blue-400 transition-colors" />
                            </div>
                            <span className="text-white/90 text-sm font-bold tracking-tight truncate w-full group-hover:text-white">{loc.name}</span>
                            <span className="text-white/30 text-[10px] uppercase tracking-widest mt-1.5 font-medium">Navegar al punto</span>
                        </button>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 z-20 p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 transition-all shadow-2xl active:scale-95"
                >
                    <ChevronRightIcon size={24} />
                </button>
            </footer>

            {/* Instructions */}
            <div className="fixed bottom-48 left-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-2xl">
                <p className="text-white/80 text-[11px] uppercase tracking-widest font-medium flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-blue-400"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> CLIC IZQUIERDO</span> Rotar
                    <span className="text-white/20">•</span>
                    <span className="flex items-center gap-1.5 text-purple-400"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full" /> CLIC DERECHO</span> Desplazar
                    <span className="text-white/20">•</span>
                    <span className="flex items-center gap-1.5 text-green-400"><div className="w-1.5 h-1.5 bg-green-400 rounded-full" /> SCROLL</span> Zoom
                </p>
            </div>
        </div>
    );
};
