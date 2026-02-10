import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const Library = ({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) => {
    const innerRadius = 8;
    const outerRadius = 14;
    const height = 12; // 4 Floors approx.
    const floorHeight = height / 4;

    // Colors requested
    const colors = {
        column: '#FFFFFF', // Pure White
        glass: '#112233', // Dark Blue/Black
        roof: '#999999', // Cement Grey
        pyramid: '#88CCFF', // Light Blue/Transparent
        base: '#333333', // Dark Base
    };

    // Create 8 Wings
    const wings = Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4; // 45 degrees
        return (
            <group key={i} rotation={[0, angle, 0]}>
                {/* Main Volume (Glass Curtain Wall) */}
                <mesh position={[0, height / 2, (innerRadius + outerRadius) / 2]} receiveShadow castShadow>
                    <boxGeometry args={[6, height, outerRadius - innerRadius + 2]} />
                    <meshStandardMaterial color={colors.glass} roughness={0.2} metalness={0.8} />
                </mesh>

                {/* White Columns at the corners (Outer) */}
                <mesh position={[-3.1, height / 2, outerRadius + 1]} castShadow receiveShadow>
                    <boxGeometry args={[1, height, 1]} />
                    <meshStandardMaterial color={colors.column} />
                </mesh>
                <mesh position={[3.1, height / 2, outerRadius + 1]} castShadow receiveShadow>
                    <boxGeometry args={[1, height, 1]} />
                    <meshStandardMaterial color={colors.column} />
                </mesh>

                {/* Horizontal Frames for Floors */}
                {[1, 2, 3].map((floor) => (
                    <mesh key={floor} position={[0, floor * floorHeight, (innerRadius + outerRadius) / 2 + 1.1]}>
                        <boxGeometry args={[6.2, 0.2, outerRadius - innerRadius + 2.2]} />
                        <meshStandardMaterial color={colors.column} />
                    </mesh>
                ))}
            </group>
        );
    });

    return (
        <group position={position} rotation={rotation}>
            {/* 8 Wings */}
            {wings}

            {/* Central Core (Octagonal) */}
            <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[innerRadius, innerRadius, height, 8]} />
                <meshStandardMaterial color={colors.glass} roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Base / Ground Floor */}
            <mesh position={[0, 0.5, 0]} receiveShadow>
                <cylinderGeometry args={[outerRadius + 2, outerRadius + 3, 1, 8]} />
                <meshStandardMaterial color={colors.base} />
            </mesh>

            {/* Roof (Flat Octagonal Slab) */}
            <mesh position={[0, height + 0.5, 0]} receiveShadowCast>
                <cylinderGeometry args={[outerRadius + 2, outerRadius + 2, 1, 8]} />
                <meshStandardMaterial color={colors.roof} roughness={0.9} />
            </mesh>

            {/* Central Glass Pyramid */}
            <mesh position={[0, height + 3, 0]}>
                {/* 4 Radial Segments = Square Pyramid base */}
                <coneGeometry args={[6, 5, 4]} />
                <meshPhysicalMaterial
                    color={colors.pyramid}
                    transmission={0.6}
                    opacity={0.8}
                    transparent
                    roughness={0.1}
                    metalness={0.1}
                />
            </mesh>

            {/* Signage - "BIBLIOTECA ALEJANDRO SEGOVIA" */}
            {/* Placed on North side (Z negative or aligned with Main Entrance) */}
            {/* Assuming facing the Plaza at [40, 0, 5], facing [25, 0, 25]... */}
            {/* Let's place it on one of the flat faces of the octagon roof edge or high facade */}
            <group position={[0, height - 1.5, outerRadius + 1.5]} rotation={[0, 0, 0]}>
                <mesh position={[0, 0, 0]} >
                    <boxGeometry args={[12, 2, 0.5]} />
                    <meshStandardMaterial color={colors.column} />
                </mesh>
                <Text
                    position={[0, 0.5, 0.3]}
                    fontSize={0.8}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    BIBLIOTECA
                </Text>
                <Text
                    position={[0, -0.5, 0.3]}
                    fontSize={0.6}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    ALEJANDRO SEGOVIA
                </Text>
            </group>

        </group>
    );
};

export default Library;
