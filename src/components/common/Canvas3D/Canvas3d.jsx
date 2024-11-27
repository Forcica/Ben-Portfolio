import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

// Préchargement du modèle
useGLTF.preload(process.env.PUBLIC_URL + "/assets/models/scene.gltf");

const Model = () => {
	const [modelError, setModelError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const { scene, animations } = useGLTF(
		process.env.PUBLIC_URL + "/assets/models/scene.gltf",
		true, // Activer le chargement progressif
		(error) => {
			console.error("Erreur de chargement du modèle:", error);
			setModelError(true);
		}
	);

	const { actions } = useAnimations(animations, scene);

	useEffect(() => {
		if (scene && !modelError) {
			try {
				scene.traverse((child) => {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});

				for (const action of Object.values(actions)) {
					if (action) {
						action.reset().play();
						action.setLoop(THREE.LoopRepeat);
					}
				}
				setIsLoading(false);
			} catch (error) {
				console.error("Erreur d'animation:", error);
				setModelError(true);
			}
		}
	}, [scene, actions, modelError]);

	if (modelError || isLoading) {
		return (
			<mesh>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial color={modelError ? "red" : "blue"} />
			</mesh>
		);
	}

	return (
		<primitive
			object={scene}
			scale={[0.04, 0.04, 0.04]}
			position={[-0.8, -1.1, 2]}
			rotation={[0, 4.9, 0]}
			castShadow
			receiveShadow
		/>
	);
};

function CameraAnimation() {
	const { camera } = useThree();

	useEffect(() => {
		const animation = gsap.to(camera.position, {
			duration: 2,
			x: 0,
			y: 1,
			z: 8,
			ease: "power2.out",
		});

		return () => animation.kill();
	}, [camera]);

	return null;
}

const Canvas3D = () => {
	return (
		<Canvas
			shadows
			camera={{ position: [0, 2, 8], fov: 60 }}
			style={{ background: "transparent" }}
			gl={{
				antialias: true,
				alpha: true,
				powerPreference: "high-performance",
			}}
		>
			<Suspense fallback={null}>
				<ambientLight intensity={0.2} />
				<directionalLight
					position={[5, 5, 5]}
					intensity={1.2}
					castShadow
					shadow-mapSize={[2048, 2048]}
					shadow-camera-far={50}
					shadow-camera-left={-10}
					shadow-camera-right={10}
					shadow-camera-top={10}
					shadow-camera-bottom={-10}
				/>
				<spotLight
					position={[-5, 5, 0]}
					intensity={0.5}
					angle={0.3}
					penumbra={1}
					castShadow
				/>
				<pointLight
					position={[0, 2, 0]}
					intensity={0.3}
					color="#ff9dba"
					distance={10}
					decay={2}
				/>
				<hemisphereLight
					intensity={0.2}
					groundColor="#b9b9b9"
					color="#ffeeff"
				/>
				<Model />
				<CameraAnimation />
				<OrbitControls
					enableZoom={false}
					enablePan={false}
					enableRotate={false}
				/>
			</Suspense>
		</Canvas>
	);
};

export default Canvas3D;
