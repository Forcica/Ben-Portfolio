import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

function Scene() {
	const navigate = useNavigate();
	const { scene } = useGLTF("/models/japanese_garden.glb");

	// Zones cliquables invisibles
	const webDevZone = new THREE.Mesh(
		new THREE.PlaneGeometry(2, 2),
		new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
	);
	webDevZone.position.set(-1.5, 0, 0);
	webDevZone.onClick = () => navigate("/web-dev");

	const levelDesignZone = new THREE.Mesh(
		new THREE.PlaneGeometry(2, 2),
		new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
	);
	levelDesignZone.position.set(1.5, 0, 0);
	levelDesignZone.onClick = () => navigate("/level-design");

	return (
		<>
			<primitive object={scene} />
			<primitive object={webDevZone} />
			<primitive object={levelDesignZone} />

			{/* Éclairage ambiant */}
			<ambientLight intensity={0.5} />
			<directionalLight position={[10, 10, 5]} intensity={1} />

			{/* Éclairage d'accentuation */}
			<pointLight position={[-1.5, 1, 4]} intensity={0.5} color="#5f5b87" />
			<pointLight position={[1.5, 1, 4]} intensity={0.5} color="#0000ff" />
		</>
	);
}

const Canvas3D = () => {
	return (
		<Canvas shadows camera={{ position: [0, 2, 8], fov: 60 }}>
			<Suspense fallback={null}>
				<Scene />
				<OrbitControls
					enableZoom={false}
					enablePan={false}
					minPolarAngle={Math.PI / 3}
					maxPolarAngle={Math.PI / 2}
				/>
			</Suspense>
		</Canvas>
	);
};

export default Canvas3D;
