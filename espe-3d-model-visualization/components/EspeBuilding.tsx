import React, { useMemo } from 'react';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

// --- ASSETS & COLORS ---

// Circular Logo (Default)
const BuildingLogo = ({ texturePath }: { texturePath: string }) => {
  const texture = useTexture(texturePath);
  return (
    <mesh position={[0, 0, 0.1]} castShadow receiveShadow>
      <circleGeometry args={[1.8, 32]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={1}
        roughness={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Rectangular Logo (For Postgrados/Block D)
const RectangularLogo = ({ texturePath }: { texturePath: string }) => {
  const texture = useTexture(texturePath);
  return (
    // Adjusted size for a typical banner/sign: 6 wide x 2 high
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <planeGeometry args={[6, 2]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={1}
        roughness={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

class TextureErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("Texture failed to load:", error);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// Updated Layout Colors per User Request
const colors = {
  concrete: "#E8E6D9", // Cream / Light Concrete
  metal: "#1B4D3E",    // Dark Green Aluminum
  glass: "#4A6572",    // Blue-Grey Reflective Glass
  stairsGreen: "#1B4D3E", // Dark Green for Bleachers structure
  seatRed: "#D32F2F",     // Red for Bleachers seats
  darkGap: "#222222"   // Shadow/Gap color
};


// --- FACADE COMPONENTS ---
// ... (WindowUnit and FacadeRow remain mostly the same, FacadeRow needs a slight adjustment for variable widths)

const WindowUnit = ({ width, height, position }: { width: number, height: number, position: [number, number, number] }) => {
  const frameThickness = 0.1;
  const dividerHeightRatio = 0.3;
  const topHeight = height * dividerHeightRatio;
  const bottomHeight = height * (1 - dividerHeightRatio);
  const topY = (height / 2) - (topHeight / 2);
  const bottomY = (-height / 2) + (bottomHeight / 2);

  return (
    <group position={position}>
      <mesh position={[0, height / 2 - frameThickness / 2, 0]} castShadow><boxGeometry args={[width, frameThickness, 0.15]} /><meshStandardMaterial color={colors.metal} /></mesh>
      <mesh position={[0, -height / 2 + frameThickness / 2, 0]} castShadow><boxGeometry args={[width, frameThickness, 0.15]} /><meshStandardMaterial color={colors.metal} /></mesh>
      <mesh position={[-width / 2 + frameThickness / 2, 0, 0]} castShadow><boxGeometry args={[frameThickness, height, 0.15]} /><meshStandardMaterial color={colors.metal} /></mesh>
      <mesh position={[width / 2 - frameThickness / 2, 0, 0]} castShadow><boxGeometry args={[frameThickness, height, 0.15]} /><meshStandardMaterial color={colors.metal} /></mesh>
      <mesh position={[0, (height / 2) - topHeight, 0]} castShadow><boxGeometry args={[width, frameThickness, 0.15]} /><meshStandardMaterial color={colors.metal} /></mesh>
      <mesh position={[0, topY, 0]}><planeGeometry args={[width - frameThickness * 2, topHeight - frameThickness * 1.5]} /><meshStandardMaterial color={colors.glass} roughness={0.2} metalness={0.8} /></mesh>
      <mesh position={[0, bottomY, 0]}><planeGeometry args={[width - frameThickness * 2, bottomHeight - frameThickness * 1.5]} /><meshStandardMaterial color={colors.glass} roughness={0.2} metalness={0.8} /></mesh>
    </group>
  );
};

const FacadeRow = ({ width, height, numBays, position }: { width: number, height: number, numBays: number, position: [number, number, number] }) => {
  const columnWidth = 0.6;
  const bayWidth = (width - columnWidth) / numBays;
  const columns = [];
  const startX = -width / 2;
  for (let i = 0; i <= numBays; i++) {
    columns.push(
      <mesh key={`col-${i}`} position={[startX + (i * bayWidth) + (columnWidth / 2), 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[columnWidth, height, 0.8]} />
        <meshStandardMaterial color={colors.concrete} />
      </mesh>
    );
  }
  const windows = [];
  for (let i = 0; i < numBays; i++) {
    const winX = startX + (i * bayWidth) + (bayWidth / 2) + (columnWidth / 2);
    windows.push(
      <WindowUnit key={`win-${i}`} width={bayWidth - columnWidth} height={height * 0.85} position={[winX, 0, 0]} />
    );
  }
  return (
    <group position={position}>
      {columns}
      {windows}
    </group>
  );
};

// --- NEW COMPONENTS FOR HERO BLOCK ---


const StairwellTower = ({ position, height }: { position: [number, number, number], height: number }) => (
  <group position={position}>
    <mesh position={[0, height / 2, 0]}>
      <boxGeometry args={[2.5, height, 3]} />
      <meshStandardMaterial color={colors.glass} transparent opacity={0.6} />
    </mesh>
    <mesh position={[0, height / 2, 1.51]}>
      <boxGeometry args={[2.5, height, 0.1]} />
      <meshStandardMaterial color="black" wireframe />
    </mesh>
    <mesh position={[0, height + 0.2, 0]}>
      <boxGeometry args={[3, 0.4, 3.5]} />
      <meshStandardMaterial color={colors.stairsGreen} />
    </mesh>
  </group>
);


// --- BUILDING BLOCKS ---

const CentralBlock = ({ position }: { position: [number, number, number] }) => {
  const height = 11;
  const centerY = height / 2;
  return (
    <group position={position}>
      <mesh position={[0, centerY, 0]} castShadow receiveShadow><boxGeometry args={[11.5, height, 11.5]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[-5.8, centerY, 5.8]}><boxGeometry args={[1, height, 1]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[5.8, centerY, 5.8]}><boxGeometry args={[1, height, 1]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[-5.8, centerY, -5.8]}><boxGeometry args={[1, height, 1]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[5.8, centerY, -5.8]}><boxGeometry args={[1, height, 1]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[0, 4, 6]}><boxGeometry args={[12, 0.6, 0.8]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[0, 7.5, 6]}><boxGeometry args={[12, 0.6, 0.8]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[0, 11, 6]}><boxGeometry args={[12.2, 0.6, 1]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[0, 13, 0]}><sphereGeometry args={[0.5]} /><meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} /></mesh>
    </group>
  );
};

const StandardBlock = ({
  position,
  rotation = [0, 0, 0],
  label,
  logoPath,
  logoSide = 'front',
  logoShape = 'circle'
}: {
  position: [number, number, number],
  rotation?: [number, number, number],
  label?: string,
  logoPath?: string | null,
  logoSide?: 'front' | 'back',
  logoShape?: 'circle' | 'rectangle'
}) => {
  const logoPos: [number, number, number] = logoSide === 'back' ? [0, 8, -2.8] : [-6, 5, 2.8];
  const logoRot: [number, number, number] = logoSide === 'back' ? [0, Math.PI, 0] : [0, 0, 0];

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.2, 0]} receiveShadow><boxGeometry args={[16.2, 0.4, 5.2]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[0, 3.5, 0]} castShadow receiveShadow><boxGeometry args={[16.2, 0.6, 5.2]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[0, 7, 0]} castShadow receiveShadow><boxGeometry args={[16.2, 0.6, 5.2]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[0, 10.5, 0]} castShadow><boxGeometry args={[16.4, 0.6, 5.4]} /><meshStandardMaterial color={colors.concrete} /></mesh>

      <group position={[0, 0, 2.5]}>
        <FacadeRow width={16} height={3.3} numBays={6} position={[0, 1.85, 0]} />
        <FacadeRow width={16} height={3.3} numBays={6} position={[0, 5.35, 0]} />
        <FacadeRow width={16} height={3.3} numBays={6} position={[0, 8.85, 0]} />
      </group>

      <group position={[0, 0, -2.5]} rotation={[0, Math.PI, 0]}>
        <FacadeRow width={16} height={3.3} numBays={6} position={[0, 1.85, 0]} />
        <FacadeRow width={16} height={3.3} numBays={6} position={[0, 5.35, 0]} />
        <FacadeRow width={16} height={3.3} numBays={6} position={[0, 8.85, 0]} />
      </group>

      <mesh position={[0, 5.25, 0]}><boxGeometry args={[15.5, 10.3, 4.5]} /><meshStandardMaterial color="#222" /></mesh>

      {logoPath && (
        <TextureErrorBoundary fallback={<mesh position={[0, 7, 3]}><circleGeometry args={[1.5, 32]} /><meshStandardMaterial color="white" /></mesh>}>
          <React.Suspense fallback={<group position={[0, 7, 0]}><mesh><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="red" /></mesh></group>}>
            <group position={logoPos} rotation={logoRot} scale={0.8}>
              {logoShape === 'rectangle' ? <RectangularLogo texturePath={logoPath} /> : <BuildingLogo texturePath={logoPath} />}
            </group>
          </React.Suspense>
        </TextureErrorBoundary>
      )}

      {label && (
        <group position={[0, 11.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <Text fontSize={1} color="black" anchorX="center" anchorY="middle">{label}</Text>
        </group>
      )}
    </group>
  );
};

const HeroBlock = ({ position, rotation = [0, 0, 0], label, logoPath }: { position: [number, number, number], rotation?: [number, number, number], label?: string, logoPath?: string | null }) => {
  // Custom Layout for Hero Block (Block A) based on Image
  // Left: Solid Wall with Logo ("ESPE") | Center: Stairwell | Right: Windows
  // Total Width: 16
  return (
    <group position={position} rotation={rotation}>

      <mesh position={[0, 0.2, 0]} receiveShadow><boxGeometry args={[16.2, 0.4, 5.2]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[4, 3.5, 0]} castShadow receiveShadow><boxGeometry args={[8.2, 0.6, 5.2]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[4, 7, 0]} castShadow receiveShadow><boxGeometry args={[8.2, 0.6, 5.2]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[0, 10.5, 0]} castShadow><boxGeometry args={[16.4, 0.6, 5.4]} /><meshStandardMaterial color={colors.concrete} /></mesh>

      <group position={[-5, 5.25, 2.6]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[6, 10.5, 0.5]} />
          <meshStandardMaterial color={colors.concrete} />
        </mesh>

        <group position={[0, 3.5, 0.3]}>
          <Text fontSize={2} color="#333" anchorX="center" anchorY="middle">
            ESPE
          </Text>
        </group>

        {logoPath && (
          <group position={[0, 0, 0.3]} scale={0.9}>
            <TextureErrorBoundary fallback={<mesh><circleGeometry args={[1.5]} /><meshStandardMaterial color="white" /></mesh>}>
              <React.Suspense fallback={null}>
                <BuildingLogo texturePath={logoPath} />
              </React.Suspense>
            </TextureErrorBoundary>
          </group>
        )}
      </group>

      <StairwellTower position={[-1, 0, 2.6]} height={10.5} />

      <group position={[4, 0, 2.5]}>
        <FacadeRow width={8} height={3.3} numBays={3} position={[0, 1.85, 0]} />
        <FacadeRow width={8} height={3.3} numBays={3} position={[0, 5.35, 0]} />
        <FacadeRow width={8} height={3.3} numBays={3} position={[0, 8.85, 0]} />
      </group>

      <group position={[0, 0, -2.5]} rotation={[0, Math.PI, 0]}>
        <FacadeRow width={16} height={3.3} numBays={6} position={[0, 1.85, 0]} />
        <FacadeRow width={16} height={3.3} numBays={6} position={[0, 5.35, 0]} />
        <FacadeRow width={16} height={3.3} numBays={6} position={[0, 8.85, 0]} />
      </group>

      <mesh position={[4, 5.25, 0]}>
        <boxGeometry args={[7.5, 10.3, 4.5]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[-5, 5.25, 0]}>
        <boxGeometry args={[5.5, 10.3, 4.5]} />
        <meshStandardMaterial color="#222" />
      </mesh>



      {label && (
        <group position={[0, 11.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <Text fontSize={1} color="black" anchorX="center" anchorY="middle">{label}</Text>
        </group>
      )}
    </group>
  );
}

const AnnexBlock = ({ position, label, rotation = [0, 0, 0] }: { position: [number, number, number], label: string, rotation?: [number, number, number] }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, 5.5, 0]} castShadow receiveShadow><boxGeometry args={[4, 11, 8]} /><meshStandardMaterial color={colors.concrete} /></mesh>
    <mesh position={[0, 4, 4.1]}><boxGeometry args={[4.2, 0.6, 0.2]} /><meshStandardMaterial color={colors.concrete} /></mesh>
    <mesh position={[0, 7.5, 4.1]}><boxGeometry args={[4.2, 0.6, 0.2]} /><meshStandardMaterial color={colors.concrete} /></mesh>
    <mesh position={[0, 11, 0]}><boxGeometry args={[4.2, 0.4, 8.2]} /><meshStandardMaterial color={colors.concrete} /></mesh>
    <group position={[0, 12, 0]} rotation={[-Math.PI / 2, 0, 0]}><Text fontSize={0.8} color="black" anchorX="center" anchorY="middle">{label}</Text></group>
  </group>
)

const DepartmentComplex = ({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  blockALabel = "Bloque A",
  blockBLabel = "Bloque B",
  blockALogo = null,
  blockBLogo = null,
  blockBLogoSide = 'front',
  blockBLogoShape = 'circle',
  withAnnex = false
}: {
  position: [number, number, number],
  rotation?: [number, number, number],
  scale?: [number, number, number],
  blockALabel?: string,
  blockBLabel?: string,
  blockALogo?: string | null,
  blockBLogo?: string | null,
  blockBLogoSide?: 'front' | 'back',
  blockBLogoShape?: 'circle' | 'rectangle',
  withAnnex?: boolean
}) => {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <CentralBlock position={[0, 0, 0]} />
      <StandardBlock position={[-8, 0, -10]} label={blockBLabel} logoPath={blockBLogo} logoSide={blockBLogoSide} logoShape={blockBLogoShape} />
      <HeroBlock position={[8, 0, 10]} label={blockALabel} logoPath={blockALogo} />
      {withAnnex && (
        <>
          <AnnexBlock position={[8, 0, -4]} label="Bloque G" />
          <AnnexBlock position={[-8, 0, 4]} label="Bloque H" />
        </>
      )}
      <mesh position={[-4, 3, -6]}><boxGeometry args={[4, 6, 4]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[4, 3, 6]}><boxGeometry args={[4, 6, 4]} /><meshStandardMaterial color={colors.concrete} /></mesh>
    </group>
  );
};

const Walkway = ({ start, end }: { start: [number, number, number], end: [number, number, number] }) => {
  const vecStart = new THREE.Vector3(...start);
  const vecEnd = new THREE.Vector3(...end);
  const length = vecStart.distanceTo(vecEnd);
  const midPoint = new THREE.Vector3().addVectors(vecStart, vecEnd).multiplyScalar(0.5);
  const direction = new THREE.Vector3().subVectors(vecEnd, vecStart).normalize();
  const angle = Math.atan2(direction.x, direction.z);

  return (
    <group position={[midPoint.x, midPoint.y, midPoint.z]} rotation={[0, angle, 0]}>
      <mesh position={[0, 0.1, 0]} receiveShadow><boxGeometry args={[2, 0.2, length]} /><meshStandardMaterial color={colors.concrete} /></mesh>
      <mesh position={[0, 3, 0]} castShadow><boxGeometry args={[2.4, 0.1, length]} /><meshStandardMaterial color={colors.metal} /></mesh>
      {Array.from({ length: Math.floor(length / 4) + 1 }).map((_, i) => {
        const zPos = -length / 2 + (i * 4);
        return (
          <group key={i} position={[0, 0, zPos]}>
            <mesh position={[-1, 1.5, 0]}><boxGeometry args={[0.1, 3, 0.1]} /><meshStandardMaterial color={colors.metal} /></mesh>
            <mesh position={[1, 1.5, 0]}><boxGeometry args={[0.1, 3, 0.1]} /><meshStandardMaterial color={colors.metal} /></mesh>
          </group>
        )
      })}
    </group>
  );
}

export const EspeBuilding: React.FC = () => {
  return (
    <group>
      <DepartmentComplex
        position={[0, 0, 15]}
        blockALabel="Bloque A"
        blockBLabel="Bloque B"
        blockALogo="/logo.png"
        blockBLogo={null}
        withAnnex={false}
      />
      <DepartmentComplex
        position={[0, 0, -25]}
        scale={[-1, 1, 1]}
        blockALabel="Bloque C"
        blockBLabel="Bloque D"
        blockALogo={null}
        blockBLogo="/post.png"
        blockBLogoSide="back"
        blockBLogoShape="rectangle"
        withAnnex={true}
      />
      <Walkway start={[0, 0, 3]} end={[0, 0, -13]} />
    </group>
  );
};