import React, { useMemo } from 'react';
import * as THREE from 'three';

// --- SUB-COMPONENTS ---

const Tree = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => (
    <group position={position} scale={[scale, scale, scale]}>
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.2, 0.3, 3, 6]} />
            <meshStandardMaterial color="#5D4037" />
        </mesh>
        <mesh position={[0, 4, 0]} castShadow receiveShadow>
            <dodecahedronGeometry args={[2]} />
            <meshStandardMaterial color="#2E7D32" />
        </mesh>
    </group>
);

const Bush = ({ position }: { position: [number, number, number] }) => (
    <mesh position={position} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 8, 8]} />
        <meshStandardMaterial color="#4CAF50" />
    </mesh>
)

const ParkingSpot = ({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) => (
    <group position={position} rotation={rotation}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[2.5, 5]} />
            <meshStandardMaterial color="#555555" />
        </mesh>
        <mesh position={[1.2, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.1, 5]} />
            <meshStandardMaterial color="#FFEB3B" />
        </mesh>
        <mesh position={[-1.2, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.1, 5]} />
            <meshStandardMaterial color="#FFEB3B" />
        </mesh>
    </group>
);

const ParkingRow = ({ position, count = 10 }: { position: [number, number, number], count?: number }) => (
    <group position={position}>
        {Array.from({ length: count }).map((_, i) => (
            <ParkingSpot key={i} position={[i * 2.6, 0.02, 0]} />
        ))}
    </group>
);

const OvalRoad = () => {
    // Ellipse dimensions
    const xRadius = 140;
    const zRadius = 150; // Elongated in Z (was 90)
    const roadWidth = 8;

    const shape = useMemo(() => {
        const outerCurve = new THREE.EllipseCurve(
            0, 0,            // ax, aY
            xRadius, zRadius,           // xRadius, yRadius
            0, 2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );

        const innerCurve = new THREE.EllipseCurve(
            0, 0,
            xRadius - roadWidth, zRadius - roadWidth,
            0, 2 * Math.PI,
            false,
            0
        );

        const shape = new THREE.Shape(outerCurve.getPoints(64));
        const hole = new THREE.Path(innerCurve.getPoints(64));
        shape.holes.push(hole);
        return shape;
    }, []);

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, 0.05, 5]} receiveShadow>
            {/* Center offset approx [10, 0, 5] to center around campus mass */}
            <shapeGeometry args={[shape]} />
            <meshStandardMaterial color="#333333" roughness={0.8} />
        </mesh>
    );
}

const GreenPathBC = () => (
    <mesh position={[-8, 0.03, -5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 25]} />
        <meshStandardMaterial color="#4caf50" roughness={0.9} />
    </mesh>
)

export const Infrastructure = () => {
    const pathColor = "#777777";

    // --- PATH COORDINATES ---
    const path1Length = 130 - 75;
    const path1Center = [(130 + 75) / 2, 0.05, 45];

    const path4Length = 75 - (-55);
    const path4Center = [30, 0.05, (75 + (-55)) / 2];

    const spurBLength = 75 - (-8);
    const spurBCenter = [(75 + -8) / 2, 0.05, -10];

    const spurDLength = 75 - (-22);
    const spurDCenter = [(75 + -22) / 2, 0.05, 40];

    // Vegetation Positions
    const randomTrees = useMemo(() => {
        const trees = [];
        // Area 1: Top Right (Near Block B/C)
        for (let i = 0; i < 8; i++) trees.push([-20 + Math.random() * 40, 0, -40 + Math.random() * 20]);
        // Area 2: Top Left (Near Library)
        for (let i = 0; i < 8; i++) trees.push([60 + Math.random() * 40, 0, -60 + Math.random() * 20]);
        // Area 3: Bottom Left (Near Entrance/Admin)
        for (let i = 0; i < 8; i++) trees.push([90 + Math.random() * 30, 0, 60 + Math.random() * 30]);
        // Area 4: Bottom Right (Near Civic Plaza)
        for (let i = 0; i < 8; i++) trees.push([0 + Math.random() * 40, 0, 60 + Math.random() * 30]);
        // Area 5: Far Back
        for (let i = 0; i < 15; i++) trees.push([-60 + Math.random() * 40, 0, -20 + Math.random() * 60]);

        return trees;
    }, []);

    return (
        <group>
            {/* --- PARKING --- */}
            <group position={[105, 0, 32]}>
                <ParkingRow position={[0, 0, 0]} count={10} />
                <ParkingRow position={[0, 0, 6]} count={10} />
            </group>
            <group position={[105, 0, 58]}>
                <ParkingRow position={[0, 0, 0]} count={10} />
                <ParkingRow position={[0, 0, -6]} count={10} />
            </group>

            {/* --- RECTILINEAR PATH NETWORK --- */}
            {/* Path 1: Main */}
            <mesh position={[path1Center[0], 0.05, 45]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[path1Length, 10]} />
                <meshStandardMaterial color={pathColor} />
            </mesh>
            {/* Path 2: Transversal */}
            <mesh position={[75, 0.05, -5]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} receiveShadow>
                <planeGeometry args={[100, 10]} />
                <meshStandardMaterial color={pathColor} />
            </mesh>
            {/* Path 3: Lateral */}
            <mesh position={[52.5, 0.05, -55]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[45, 10]} />
                <meshStandardMaterial color={pathColor} />
            </mesh>
            {/* Path 4: Distributor */}
            <mesh position={[path4Center[0], 0.05, path4Center[2]]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} receiveShadow>
                <planeGeometry args={[path4Length, 10]} />
                <meshStandardMaterial color={pathColor} />
            </mesh>
            {/* Spurs */}
            <mesh position={[spurBCenter[0], 0.05, -10]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[spurBLength, 8]} />
                <meshStandardMaterial color={pathColor} />
            </mesh>
            <mesh position={[spurDCenter[0], 0.05, 40]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[spurDLength, 8]} />
                <meshStandardMaterial color={pathColor} />
            </mesh>

            {/* --- GREEN PATH (B TO C) --- */}
            <GreenPathBC />

            {/* --- OVAL RING ROAD --- */}
            <OvalRoad />

            {/* --- VEGETATION --- */}
            {/* Trees along Main Path */}
            {Array.from({ length: 5 }).map((_, i) => (
                <Tree key={`t1-${i}`} position={[130 - i * 12, 0, 52]} />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
                <Tree key={`t2-${i}`} position={[130 - i * 12, 0, 38]} />
            ))}

            {/* Scattered Vegetation */}
            {randomTrees.map((pos, i) => (
                <Tree key={`rand-tree-${i}`} position={pos as [number, number, number]} scale={0.8 + Math.random() * 0.4} />
            ))}

            {/* Some Bushes near Admin */}
            <Bush position={[80, 0, 30]} />
            <Bush position={[82, 0, 20]} />
            <Bush position={[78, 0, 35]} />

        </group>
    );
};
