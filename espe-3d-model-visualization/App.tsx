import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, ContactShadows, Loader } from '@react-three/drei';
import { EspeBuilding } from './components/EspeBuilding';
import { Bleachers } from './components/Bleachers';

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-gray-200">
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-10 p-4 bg-white/90 backdrop-blur-md rounded-lg shadow-lg max-w-sm border border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Universidad de las Fuerzas Armadas ESPE</h1>
        <p className="text-sm text-gray-600 mt-1">
          Interactive 3D reconstruction.
        </p>
        <div className="mt-2 text-xs text-gray-500 flex gap-2">
          <span className="bg-gray-100 px-2 py-1 rounded border border-gray-300">Left Click: Rotate</span>
          <span className="bg-gray-100 px-2 py-1 rounded border border-gray-300">Right Click: Pan</span>
        </div>
      </div>

      <Canvas shadows camera={{ position: [15, 8, 20], fov: 45 }}>
        {/* Solid background color to ensure visibility */}
        <color attach="background" args={['#87CEEB']} />

        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={2}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <hemisphereLight intensity={0.5} groundColor="#444444" />

          <group position={[0, -2, 0]}>
            <EspeBuilding />
            <Bleachers position={[-19, 0, 26]} rotation={[0, Math.PI, 0]} />

            {/* Ground Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
              <planeGeometry args={[100, 100]} />
              <meshStandardMaterial color="#B0B5B9" />
            </mesh>
            {/* Plaza Pattern (Simple Lines) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 8]} receiveShadow>
              <planeGeometry args={[20, 10]} />
              <meshStandardMaterial color="#B0B5B9" />
            </mesh>
            {/* Zebra stripes approximation */}
            {[...Array(10)].map((_, i) => (
              <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 4 + i * 1.5]} receiveShadow>
                <planeGeometry args={[12, 0.8]} />
                <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
              </mesh>
            ))}
          </group>

          <ContactShadows opacity={0.4} scale={40} blur={2} far={10} resolution={256} color="#000000" />
          <Sky sunPosition={[100, 20, 100]} turbidity={0.5} rayleigh={0.5} />
          <OrbitControls
            target={[0, 4, 0]}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.1}
            makeDefault
          />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default App;