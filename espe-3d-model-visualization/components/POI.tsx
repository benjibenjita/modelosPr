import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

interface POIProps {
    position: [number, number, number];
    label: string;
    description: string;
    imageUrl?: string; // Optional image URL
}

export const POI = ({ position, label, description, imageUrl }: POIProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <group position={position}>
            {/* Marker */}
            <mesh onClick={() => setIsOpen(!isOpen)}
                onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
                onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}>
                <sphereGeometry args={[2, 16, 16]} />
                <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
            </mesh>

            {/* Floating Ring Animation */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2.5, 3, 32]} />
                <meshBasicMaterial color="#00f0ff" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>

            {/* Modal / Tooltip */}
            <Html position={[0, 4, 0]} center distanceFactor={20} zIndexRange={[100, 0]}>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="w-64 bg-black/90 border border-cyan-500/50 p-4 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] backdrop-blur-md"
                        >
                            <h3 className="text-cyan-400 font-bold font-tech text-lg mb-1">{label}</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
                            {imageUrl && (
                                <div className="mt-3 rounded-lg overflow-hidden border border-white/10">
                                    <img src={imageUrl} alt={label} className="w-full h-32 object-cover" />
                                </div>
                            )}
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                className="mt-3 w-full py-1 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 text-xs rounded transition-colors uppercase tracking-wider"
                            >
                                Cerrar
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Minimized Label (Always visible when closed?) */}
                {!isOpen && (
                    <div
                        className="px-2 py-1 bg-black/50 text-cyan-500 text-xs font-bold border border-cyan-500/30 rounded backdrop-blur-sm whitespace-nowrap cursor-pointer hover:bg-cyan-500/20 transition-colors"
                        onClick={() => setIsOpen(true)}
                    >
                        {label}
                    </div>
                )}
            </Html>
        </group>
    );
};
import * as THREE from 'three';
