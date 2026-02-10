import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useEffect, useRef } from 'react';

interface CameraControllerProps {
    targetPosition: [number, number, number] | null;
}

export const CameraController = ({ targetPosition }: CameraControllerProps) => {
    const { camera, controls } = useThree();
    const currentTarget = useRef(new Vector3(0, 0, 0));

    // Position of the camera relative to the target to maintain a nice view
    // Top-down-ish angle: roughly [20, 30, 40] offset from target
    const offset = new Vector3(40, 50, 60);

    useEffect(() => {
        if (targetPosition) {
            // When target changes, we just update our internal ref to know where to go
            // Camera movement logic is in useFrame for smoothness
        }
    }, [targetPosition]);

    useFrame((state, delta) => {
        if (!targetPosition) return;

        const targetVec = new Vector3(...targetPosition);

        // 1. Interpolate Controls Target (where the camera looks)
        const controlsTarget = (controls as any)?.target;
        if (controlsTarget) {
            controlsTarget.x = THREE.MathUtils.lerp(controlsTarget.x, targetVec.x, 2 * delta);
            controlsTarget.y = THREE.MathUtils.lerp(controlsTarget.y, targetVec.y, 2 * delta);
            controlsTarget.z = THREE.MathUtils.lerp(controlsTarget.z, targetVec.z, 2 * delta);
        }

        // 2. Interpolate Camera Position (where the camera is)
        const destPos = targetVec.clone().add(offset); // Target + Offset

        camera.position.lerp(destPos, 1.5 * delta); // Smooth lerp
        camera.updateProjectionMatrix();

    });

    return null;
};
import * as THREE from 'three';
