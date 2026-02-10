import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const AdministrativeBuilding = ({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) => {
    const numFloors = 7;
    const floorHeight = 1.5; // Slightly taller floors
    const totalHeight = numFloors * floorHeight;
    const shapeRadius = 8; // Size of the arrowhead

    // Materials
    const colors = {
        concrete: "#D3D3D3", // Light Grey/Sand
        glass: "#112233",    // Dark Blue/Black Reflective
        cylinder: "#88CCFF", // Light Blue Reflective
        tower: "#222222",    // Black/Rust
    };

    // Create the Arrowhead/Diamond Shape
    const buildingShape = useMemo(() => {
        const shape = new THREE.Shape();
        // Tip at (0, shapeRadius) -> Front
        // Right Wing at (shapeRadius, -shapeRadius/2)
        // Back Center at (0, -shapeRadius/2 + 2) -> Indented
        // Left Wing at (-shapeRadius, -shapeRadius/2)

        shape.moveTo(0, shapeRadius);
        shape.lineTo(shapeRadius, -shapeRadius * 0.5);
        shape.lineTo(0, -shapeRadius * 0.5 + 2); // Slight indent at back
        shape.lineTo(-shapeRadius, -shapeRadius * 0.5);
        shape.lineTo(0, shapeRadius);
        return shape;
    }, []);

    const floorGeometrySettings = useMemo(() => ({
        depth: floorHeight * 0.8, // Glass height
        bevelEnabled: false
    }), []);

    const slabGeometrySettings = useMemo(() => ({
        depth: floorHeight * 0.2, // Concrete slab height
        bevelEnabled: false
    }), []);

    // Generate Floors
    const floors = Array.from({ length: numFloors }).map((_, i) => {
        const yPos = (i + 1) * floorHeight; // Start from 1st floor (Ground is open)

        // Setback for the top floor
        const scale = i === numFloors - 1 ? 0.8 : 1;

        return (
            <group key={i} position={[0, yPos, 0]} scale={[scale, 1, scale]}>
                {/* Concrete Slab */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} castShadow receiveShadow>
                    <extrudeGeometry args={[buildingShape, slabGeometrySettings]} />
                    <meshStandardMaterial color={colors.concrete} />
                </mesh>

                {/* Glass Band */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, floorHeight * 0.2, 0]} castShadow receiveShadow>
                    <extrudeGeometry args={[buildingShape, floorGeometrySettings]} />
                    <meshStandardMaterial color={colors.glass} roughness={0.1} metalness={0.9} />
                </mesh>
            </group>
        );
    });

    // Columns for Ground Floor
    const columns = useMemo(() => {
        const cols = [];
        const positions = [
            [0, 0], // Center (Back indent)
            [shapeRadius * 0.8, -shapeRadius * 0.4], // Right Back
            [-shapeRadius * 0.8, -shapeRadius * 0.4], // Left Back
            [shapeRadius * 0.4, shapeRadius * 0.4], // Right Front
            [-shapeRadius * 0.4, shapeRadius * 0.4], // Left Front
        ];

        return positions.map((pos, i) => (
            <mesh key={i} position={[pos[0], floorHeight / 2, pos[1]]} castShadow receiveShadow>
                <cylinderGeometry args={[0.4, 0.4, floorHeight, 16]} />
                <meshStandardMaterial color={colors.concrete} />
            </mesh>
        ));
    }, []);


    return (
        <group position={position} rotation={rotation}>
            {/* Elevated Floors */}
            {floors}

            {/* Ground Floor Columns */}
            {columns}

            {/* Central Glass Cylinder (Front) */}
            {/* Runs from ground to top */}
            <mesh position={[0, totalHeight / 2 + floorHeight / 2, shapeRadius - 1]} castShadow receiveShadow>
                <cylinderGeometry args={[2, 2, totalHeight + floorHeight, 32, 1, true, -Math.PI / 2, Math.PI]} />
                {/* Semicircle facing forward? Or full cylinder? Image shows semicircle protruding. */}
                {/* Let's try a full cylinder for now but embedded. */}
                <meshStandardMaterial color={colors.cylinder} roughness={0.1} metalness={0.5} transparent opacity={0.8} side={THREE.DoubleSide} />
            </mesh>

            {/* Cylinder Cap/Roof */}
            <mesh position={[0, totalHeight + floorHeight, shapeRadius - 1]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[2, 2, 0.5, 32]} />
                <meshStandardMaterial color={colors.concrete} />
            </mesh>

            {/* Rear Emergency Tower */}
            <group position={[0, totalHeight / 2, -shapeRadius - 2]}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[3, totalHeight + 4, 3]} />
                    <meshStandardMaterial
                        color={colors.tower}
                        wireframe={true} // Simple wireframe to simulate lattice
                        transparent
                        opacity={0.8}
                    />
                </mesh>
                {/* Inner core of tower */}
                <mesh>
                    <boxGeometry args={[1, totalHeight + 4, 1]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            </group>

        </group>
    );
};

export default AdministrativeBuilding;
