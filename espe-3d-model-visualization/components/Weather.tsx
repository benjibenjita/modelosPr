import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WeatherProps {
    mode: 'clear' | 'rain' | 'fog';
}

export const Weather = ({ mode }: WeatherProps) => {
    const rainCount = 5000;
    const fogCount = 500;
    const rainRef = useRef<THREE.Points>(null);
    const rainGeo = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = [];
        for (let i = 0; i < rainCount; i++) {
            positions.push(
                (Math.random() - 0.5) * 400, // X: Wide Spread
                Math.random() * 100,         // Y: Height
                (Math.random() - 0.5) * 400  // Z: Wide Spread
            );
        }
        geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        return geo;
    }, []);

    useFrame(() => {
        if (mode === 'rain' && rainRef.current) {
            const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
            for (let i = 1; i < positions.length; i += 3) {
                positions[i] -= 0.8; // Fall speed
                if (positions[i] < 0) {
                    positions[i] = 100; // Reset to top
                }
            }
            rainRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    if (mode === 'clear') return null;

    return (
        <group>
            {mode === 'rain' && (
                <points ref={rainRef}>
                    <bufferGeometry attach="geometry" {...rainGeo} />
                    <pointsMaterial attach="material" color="#aaaaaa" size={0.3} transparent opacity={0.6} />
                </points>
            )}
            {/* Fog is handled in Scene fog prop usually, but we can add particles too if needed */}
        </group>
    );
};
