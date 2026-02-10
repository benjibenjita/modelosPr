import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Infrastructure } from './components/Infrastructure';
import AdministrativeBuilding from './components/AdministrativeBuilding';
import { HeroBlock, StandardBlock, AnnexBlock, DepartmentComplex } from './components/EspeBuilding';
import Library from './components/Library';
import { Bleachers } from './components/Bleachers';
import { Entrance } from './components/Entrance';
import { CivicPlaza } from './components/CivicPlaza';
import { Interface } from './components/UI/Interface';
import { CameraController } from './components/CameraController';
import { Weather } from './components/Weather';
import { POI } from './components/POI';
import { NetworkLayer } from './components/NetworkLayer';

const App = () => {
  const [targetPosition, setTargetPosition] = useState<[number, number, number] | null>(null);
  const [weatherMode, setWeatherMode] = useState<'clear' | 'rain' | 'fog'>('clear');
  const [showNetwork, setShowNetwork] = useState(false);

  // Clear target position when user interacts manually to allow smooth OrbitControl
  const handleUserInteraction = () => {
    if (targetPosition) setTargetPosition(null);
  };

  const handleNavigate = (position: [number, number, number]) => {
    setTargetPosition(position);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: 'relative', background: '#0a0a12' }}>

      {/* UI Overlay */}
      <Interface
        onNavigate={handleNavigate}
        onWeatherChange={setWeatherMode}
        onToggleNetwork={() => setShowNetwork(!showNetwork)}
        showNetwork={showNetwork}
      />

      <Canvas shadows camera={{ position: [100, 100, 100], fov: 45 }} dpr={[1, 2]}> {/* Optimize DPR */}
        <fog attach="fog" args={weatherMode === 'fog' ? ['#aaaaaa', 10, 100] : ['#ffffff', 50, 300]} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[50, 50, 25]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024} // Reduced from 2048 for performance
          shadow-mapSize-height={1024}
        />
        <hemisphereLight skyColor="#ffffff" groundColor="#444444" intensity={0.6} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <CameraController targetPosition={targetPosition} />
          <Weather mode={weatherMode} />
          {showNetwork && <NetworkLayer />}

          <group>
            {/* --- JOINED DEPARTMENT COMPLEXES --- */}

            {/* Complex 1: Blocks A and B */}
            <DepartmentComplex
              position={[0, 0, 15]}
              blockALabel="Bloque A"
              blockBLabel="Bloque B"
              blockALogo="/logo.png"
              blockBShowEspe={true}
              blockAPosition={[10, 0, 10]}
              blockARotation={[0, Math.PI / 2, 0]}
            />

            {/* Complex 2: Blocks C, D, G, H */}
            <DepartmentComplex
              position={[0, 0, -25]}
              scale={[-1, 1, 1]}
              blockALabel="Bloque C"
              blockBLabel="Bloque D"
              blockBLogo="/post.png"
              blockBLogoSide="back"
              blockBLogoShape="rectangle"
              withAnnex={true}
              isMirrored={true}
            />

            <Library position={[50, 0, -50]} rotation={[0, Math.PI, 0]} />

            {/* --- AXIS SEQUENCE (Shifted to Z=25, Closer on X) --- */}
            {/* Graderío (Front of complexes) - Rotated 180 from -PI/2 to PI/2 */}
            <Bleachers position={[20, 0, 25]} rotation={[0, Math.PI / 2, 0]} />

            {/* Plaza Cívica (Front of Graderío) */}
            <CivicPlaza position={[35, 0.1, 25]} rotation={[0, Math.PI / 2, 0]} />

            {/* Administrative (Front of Plaza) */}
            <AdministrativeBuilding position={[55, 0, 25]} rotation={[0, -Math.PI / 2, 0]} />

            {/* Entrance (Far Front) */}
            <Entrance position={[120, 0, 45]} rotation={[0, Math.PI / 2, 0]} />

            <Infrastructure />

            {/* POINTS OF INTEREST */}
            <POI
              position={[20, 10, 25]}
              label="Graderío"
              description="Espacio principal para eventos deportivos y ceremonias de la universidad."
              imageUrl="https://images.unsplash.com/photo-1576618148400-f54bed99fcf8?auto=format&fit=crop&q=80&w=3000&ixlib=rb-4.0.3"
            />
            <POI
              position={[35, 5, 25]}
              label="Plaza Cívica"
              description="Punto de encuentro central para actos cívicos y culturales."
              imageUrl="https://images.unsplash.com/photo-1496564203457-11bb12075d90?auto=format&fit=crop&q=80&w=2850&ixlib=rb-4.0.3"
            />

          </group>

          {/* Ground Plane - Grass */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
            <planeGeometry args={[300, 300]} />
            <meshStandardMaterial color="#4CAF50" roughness={0.9} />
          </mesh>

          {/* ContactShadows removed for performance */}
          {/* <ContactShadows opacity={0.4} scale={40} blur={2} far={10} resolution={256} color="#000000" /> */}
          {weatherMode === 'clear' && <Sky sunPosition={[100, 20, 100]} turbidity={0.5} rayleigh={0.5} />}
        </Suspense>

        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.1}
          onStart={handleUserInteraction} // Stop cinematic flight on manual interaction
        />
      </Canvas>
    </div>
  );
};

export default App;