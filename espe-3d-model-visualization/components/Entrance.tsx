import React from 'react';
import { Text } from '@react-three/drei';

export const Entrance = ({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) => {
    const roadLength = 40;
    const roadWidth = 20;
    const beamHeight = 6;
    const beamWidth = 50; // Widened from 30

    const colors = {
        asphalt: "#333333",
        line: "#FFFFFF",
        concrete: "#D3D3D3",
        beamGreen: "#1B4D3E", // ESPE Green
        text: "#FFFFFF",
        grass: "#4caf50",
    };

    return (
        <group position={position} rotation={rotation}>
            {/* --- ROADWAY --- */}
            {/* Main Asphalt Base */}
            <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[roadWidth, roadLength]} />
                <meshStandardMaterial color={colors.asphalt} />
            </mesh>

            {/* Central Parterre */}
            <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[2, roadLength]} />
                <meshStandardMaterial color={colors.grass} />
            </mesh>
            {/* Bushes on Parterre */}
            {Array.from({ length: 8 }).map((_, i) => (
                <mesh key={i} position={[0, 0.5, -roadLength / 2 + 2 + i * 5]} castShadow>
                    <boxGeometry args={[1, 0.8, 1]} />
                    <meshStandardMaterial color="#2E7D32" />
                </mesh>
            ))}

            {/* Lane Markings (White Lines) */}
            {/* Entry Side (Right when entering? Let's assume Z- is In) */}
            {/* 3 Lanes on one side, 2 on the other */}
            {/* Left side (X < 0): 2 Lanes (Exit) */}
            <mesh position={[-5, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.2, roadLength]} />
                <meshStandardMaterial color={colors.line} />
            </mesh>
            {/* Right side (X > 0): 3 Lanes (Entry) */}
            <mesh position={[3.5, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.2, roadLength]} />
                <meshStandardMaterial color={colors.line} />
            </mesh>
            <mesh position={[7, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.2, roadLength]} />
                <meshStandardMaterial color={colors.line} />
            </mesh>


            {/* --- MAIN GATE STRUCTURE --- */}
            {/* Columns - Moved out to accommodate wider beam */}
            <mesh position={[-22, beamHeight / 2, 0]} castShadow>
                <boxGeometry args={[2, beamHeight, 2]} />
                <meshStandardMaterial color={colors.concrete} />
            </mesh>
            <mesh position={[22, beamHeight / 2, 0]} castShadow>
                <boxGeometry args={[2, beamHeight, 2]} />
                <meshStandardMaterial color={colors.concrete} />
            </mesh>
            {/* Center Support (Guardhouse integration) */}
            <mesh position={[0, beamHeight / 2, 0]} castShadow>
                <boxGeometry args={[1, beamHeight, 1]} />
                <meshStandardMaterial color={colors.concrete} />
            </mesh>

            {/* Top Beam */}
            <mesh position={[0, beamHeight + 1.5, 0]} castShadow>
                <boxGeometry args={[beamWidth, 3, 3]} />
                <meshStandardMaterial color={colors.beamGreen} />
            </mesh>

            {/* Signage Text */}
            <Text
                position={[-12, beamHeight + 1.5, 1.6]}
                fontSize={1.5} // Slightly larger text too
                color={colors.text}
                anchorX="center"
                anchorY="middle"
            >
                UNIVERSIDAD DE LAS
                FUERZAS ARMADAS
            </Text>
            <Text
                position={[12, beamHeight + 1.5, 1.6]}
                fontSize={3} // Larger ESPE
                color={colors.text}
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff" // Optional: Use a bold font if available
            >
                ESPE
            </Text>

            {/* --- GUARDHOUSE (Garita) --- */}
            <group position={[0, 1.5, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[4, 3, 6]} />
                    <meshStandardMaterial color={colors.concrete} />
                </mesh>
                {/* Windows */}
                <mesh position={[0, 0.5, 3.1]}>
                    <planeGeometry args={[3, 1.5]} />
                    <meshStandardMaterial color="#88CCFF" roughness={0.2} metalness={0.8} />
                </mesh>
                <mesh position={[2.1, 0.5, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <planeGeometry args={[5, 1.5]} />
                    <meshStandardMaterial color="#88CCFF" roughness={0.2} metalness={0.8} />
                </mesh>
                <mesh position={[-2.1, 0.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
                    <planeGeometry args={[5, 1.5]} />
                    <meshStandardMaterial color="#88CCFF" roughness={0.2} metalness={0.8} />
                </mesh>
            </group>

        </group>
    );
};
