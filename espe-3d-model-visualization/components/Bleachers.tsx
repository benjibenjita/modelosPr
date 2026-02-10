import React from 'react';
import * as THREE from 'three';

interface BleachersProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

export const Bleachers: React.FC<BleachersProps> = ({ position, rotation }) => {
  const rows = 5;
  const seatsPerRow = 20; // Increased width
  const seatWidth = 0.6;
  const seatDepth = 0.5;
  const rowHeight = 0.4;
  const rowDepth = 0.8;
  const aisleWidth = 1.5; // Central aisle

  return (
    <group position={position} rotation={rotation}>

      {/* --- CONCRETE BASE (Stepped) --- */}
      {[...Array(rows)].map((_, rowIndex) => (
        <mesh
          key={`step-${rowIndex}`}
          position={[0, (rowIndex * rowHeight) + (rowHeight / 2), -rowIndex * rowDepth]}
          receiveShadow
        >
          {/* Main concrete step width = total seats width + aisle */}
          <boxGeometry args={[seatsPerRow * seatWidth + aisleWidth + 1, rowHeight, rowDepth]} />
          <meshStandardMaterial color="#889988" roughness={0.8} /> {/* Green-tinted concrete */}
        </mesh>
      ))}

      {/* --- SEATS --- */}
      {[...Array(rows)].map((_, rowIndex) => {
        const isRed = rowIndex % 2 !== 0; // Alternating row colors
        const seatColor = isRed ? "#CC0000" : "#006400";

        return (
          <group key={`row-seats-${rowIndex}`} position={[0, (rowIndex * rowHeight) + rowHeight, -rowIndex * rowDepth]}>
            {[...Array(seatsPerRow)].map((_, seatIndex) => {
              // Calculate position with a gap in the middle for the Aisle
              const halfSeats = seatsPerRow / 2;
              let xPos = (seatIndex - halfSeats + 0.5) * seatWidth;

              // Add shift for aisle
              if (seatIndex >= halfSeats) xPos += aisleWidth / 2;
              else xPos -= aisleWidth / 2;

              return (
                <group key={`seat-${seatIndex}`} position={[xPos, 0, 0]}>
                  {/* Seat Base */}
                  <mesh position={[0, 0.05, 0]} castShadow>
                    <boxGeometry args={[0.45, 0.1, 0.4]} />
                    <meshStandardMaterial color={seatColor} />
                  </mesh>
                  {/* Seat Back (Curved/Inclined) */}
                  <mesh position={[0, 0.3, -0.15]} rotation={[-0.2, 0, 0]} castShadow>
                    <boxGeometry args={[0.45, 0.4, 0.05]} />
                    <meshStandardMaterial color={seatColor} />
                  </mesh>
                </group>
              );
            })}
          </group>
        );
      })}

      {/* --- RAILINGS (Sides) --- */}
      {[-1, 1].map((side, i) => {
        const xOffset = (seatsPerRow * seatWidth + aisleWidth) / 2 + 0.2;
        return (
          <group key={`rail-${i}`} position={[side * xOffset, 0, 0]}>
            {/* Sloped Handrail */}
            <mesh position={[0, rows * rowHeight * 0.5 + 0.5, -(rows * rowDepth) / 2 + 0.5]} rotation={[0.45, 0, 0]}>
              <boxGeometry args={[0.05, 0.05, rows * rowDepth * 1.1]} />
              <meshStandardMaterial color="#333" />
            </mesh>
            {/* Vertical Posts */}
            {[0, 2, 4].map((step, j) => (
              <mesh key={`post-${j}`} position={[0, (step * rowHeight) + 0.5, -step * rowDepth]}>
                <boxGeometry args={[0.05, 1.2, 0.05]} />
                <meshStandardMaterial color="#333" />
              </mesh>
            ))}
          </group>
        )
      })}

      {/* --- CENTRAL STAIRS (Visual) --- */}
      <mesh position={[0, rows * rowHeight / 2, -((rows - 1) * rowDepth) / 2]} rotation={[-0.5, 0, 0]}>
        <planeGeometry args={[aisleWidth * 0.8, rows * rowDepth * 1.1]} />
        <meshStandardMaterial color="#667766" roughness={0.9} />
      </mesh>

    </group>
  );
};