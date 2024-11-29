import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface Canvas3DProps {
	isLoaded: boolean;
}



const Model = () => {
	const { scene, animations } = useGLTF("/assets/models/scene.gltf");
	const { actions } = useAnimations(animations, scene);

	useEffect(() => {
		if (scene) {
			for (const action of Object.values(actions)) {









				if (action) {
					action.play();
					action.setLoop(THREE.LoopRepeat, Infinity);
				}
			}
		}
	}, [scene, actions]);

	return (
		<primitive
			object={scene}
			scale={[0.04, 0.04, 0.04]}
			position={[-0.8, -1.1, 2]}
			rotation={[0, 4.9, 0]}
		/>
	);
};

function CameraAnimation() {
	const { camera } = useThree();

	useEffect(() => {
		gsap.to(camera.position, {
			duration: 2,
			x: 0,
			y: 1,
			z: 8,
			ease: "power2.out",
		});
	}, [camera]);

	return null;
}

const Canvas3D: React.FC<Canvas3DProps> = ({ isLoaded }) => {




	return (
		<>







			<Canvas
				shadows
				camera={{ position: [0, 2, 8], fov: 60 }}
				style={{ 


					background: "transparent",
					opacity: isLoaded ? 1 : 0,
					transition: "opacity 0.8s ease-in-out",
					willChange: "opacity"
				}}
				gl={{
					antialias: true,
					toneMapping: THREE.ACESFilmicToneMapping,
					outputColorSpace: THREE.SRGBColorSpace,
					preserveDrawingBuffer: true
				}}
			>
				<color attach="background" args={["#d5e8ea"]} />
				<fog attach="fog" args={["#d5e8ea", 10, 25]} />
				<mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
					<planeGeometry args={[100, 100]} />
					<meshStandardMaterial color="#a3d5d8" opacity={0.5} transparent />
				</mesh>
				<Suspense fallback={null}>
					<ambientLight intensity={0.5} />
					<directionalLight 
						position={[2, 8, 4]} 
						intensity={1.2} 
						castShadow
						shadow-mapSize={[2048, 2048]}
					/>
					<pointLight 
						position={[-2, 2, -1]} 
						intensity={0.4} 
						color="#f8e3ff" 
					/>
					<spotLight
						position={[0, 4, 2]}
						intensity={0.6}
						angle={0.6}
						penumbra={1}
						color="#ffffff"
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
		</>
	);
};

export default Canvas3D;