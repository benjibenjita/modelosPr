import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simple component to draw connection lines between buildings
export const NetworkLayer = () => {
    const lineRef = useRef<THREE.LineSegments>(null);

    const points = [
        new THREE.Vector3(-50, 5, 40), // Block H
        new THREE.Vector3(90, 5, 50),  // Admin
        new THREE.Vector3(50, 5, -50), // Library
        new THREE.Vector3(15, 5, 10), // Block A
        new THREE.Vector3(-8, 5, -35), // Block B
        new THREE.Vector3(-50, 5, 40), // Back to H (Loop)
    ];

    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 64, 0.5, 8, false);

    useFrame((state) => {
        if (lineRef.current) {
            // Pulse effect
            (lineRef.current.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
        }
    });

    return (
        <group>
            {/* Draw lines/tubes connecting key points */}
            <mesh ref={lineRef as any}>
                <primitive object={geometry} />
                <meshBasicMaterial color="#00ff00" transparent opacity={0.5} wireframe />
            </mesh>

            {/* Nodes */}
            {points.map((p, i) => (
                <mesh key={i} position={p}>
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshBasicMaterial color="#00ff00" />
                </mesh>
            ))}
        </group>
    );
};
