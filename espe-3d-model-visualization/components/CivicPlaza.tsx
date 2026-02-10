import React from 'react';

interface CivicPlazaProps {
    position: [number, number, number];
    rotation?: [number, number, number];
}

export const CivicPlaza: React.FC<CivicPlazaProps> = ({ position, rotation = [0, 0, 0] }) => {
    return (
        <group position={position} rotation={rotation}>
            {/* Base de la Plaza */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 15]} />
                <meshStandardMaterial color="#d0d0d0" roughness={0.8} />
            </mesh>

            {/* Detalles decorativos (jardineras simples en las esquinas) */}
            <mesh position={[-9, 0.25, -6.5]} castShadow receiveShadow>
                <boxGeometry args={[1.5, 0.5, 1.5]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[9, 0.25, -6.5]} castShadow receiveShadow>
                <boxGeometry args={[1.5, 0.5, 1.5]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[-9, 0.25, 6.5]} castShadow receiveShadow>
                <boxGeometry args={[1.5, 0.5, 1.5]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[9, 0.25, 6.5]} castShadow receiveShadow>
                <boxGeometry args={[1.5, 0.5, 1.5]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Vegetación (simulada con cubos verdes) */}
            <mesh position={[-9, 0.75, -6.5]} castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#228B22" />
            </mesh>
            <mesh position={[9, 0.75, -6.5]} castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#228B22" />
            </mesh>
            <mesh position={[-9, 0.75, 6.5]} castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#228B22" />
            </mesh>
            <mesh position={[9, 0.75, 6.5]} castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#228B22" />
            </mesh>
        </group>
    );
};
