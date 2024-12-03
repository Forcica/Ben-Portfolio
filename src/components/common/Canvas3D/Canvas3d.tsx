import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Model = () => {
	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	const { scene, animations } = useGLTF("/assets/models/scene.gltf");
	const { actions } = useAnimations(animations, scene);

	useEffect(() => {
		if (!isMobile && scene) {
			Object.values(actions).forEach(action => {
				if (action) {
					action.play();
					action.setLoop(THREE.LoopRepeat, Infinity);
				}
			});
		}
	}, [scene, actions, isMobile]);

	return (
		<primitive
			object={scene}
			scale={isMobile ? [0.03, 0.03, 0.03] : [0.04, 0.04, 0.04]}
			position={isMobile ? [-0.6, -0.9, 1.5] : [-0.8, -1.1, 2]}
			rotation={[0, 4.9, 0]}
		/>
	);
};

function CameraAnimation() {
	const { camera } = useThree();
	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	const hasAnimated = useRef(false);

	useEffect(() => {
		if (!isMobile && !hasAnimated.current) {
			hasAnimated.current = true;
			gsap.fromTo(
				camera.position,
				{ x: 0, y: 2, z: 8 },
				{
					duration: 2,
					x: 0,
					y: 1,
					z: 8,
					ease: "power2.out",
				}
			);
		} else if (isMobile) {
			camera.position.set(0, 0.5, 6);
		}
	}, [camera, isMobile]);

	return null;
}

const Canvas3D = () => {
	const [isVisible, setIsVisible] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

	const renderSettings = {
		pixelRatio: isMobile ? 1 : window.devicePixelRatio,
		powerPreference: "high-performance" as WebGLPowerPreference,
		antialias: !isMobile,
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setIsVisible(entry.isIntersecting),
			{ threshold: 0.1 }
		);
		
		if (containerRef.current) {
			observer.observe(containerRef.current);
		}
		
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={containerRef} className="canvas-container">
			<Canvas
				shadows={!isMobile}
				camera={{ 
					position: [0, 2, 8], 
					fov: isMobile ? 65 : 60 
				}}
				frameloop={isVisible ? 'always' : 'demand'}
				performance={{ 
					min: 0.5,
					max: isMobile ? 0.7 : 1,
					debounce: 200 
				}}
				gl={renderSettings}
			>
				<color attach="background" args={["#d5e8ea"]} />
				<fog attach="fog" args={["#d5e8ea", isMobile ? 3 : 10, isMobile ? 10 : 25]} />
				
				{!isMobile && (
					<mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
						<planeGeometry args={[100, 100]} />
						<meshStandardMaterial color="#a3d5d8" opacity={0.5} transparent />
					</mesh>
				)}

				<Suspense fallback={null}>
					<ambientLight intensity={isMobile ? 0.3 : 0.5} />
					{!isMobile && (
						<>
							<directionalLight position={[2, 8, 4]} intensity={1.2} />
							<pointLight position={[-2, 2, -1]} intensity={0.4} color="#f8e3ff" />
							<spotLight
								position={[0, 4, 2]}
								intensity={0.6}
								angle={0.6}
								penumbra={1}
								color="#ffffff"
							/>
						</>
					)}
					<Model />
					<CameraAnimation />
					<OrbitControls
						enableZoom={false}
						enablePan={false}
						enableRotate={false}
					/>
				</Suspense>
			</Canvas>
		</div>
	);
};

export default Canvas3D;