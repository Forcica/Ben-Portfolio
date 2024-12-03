import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { captureScene } from '../../../utils/captureScene';

const Model = () => {
	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	console.log('Device:', isMobile ? 'Mobile' : 'Desktop');

	if (isMobile) {
		return (
			<div className="mobile-fallback">
				<img 
					src="/assets/images/scene-static.webp" 
					alt="Scene 3D"
					loading="lazy"
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						borderRadius: '12px'
					}}
				/>
			</div>
		);
	}

	// Version desktop avec le modèle 3D
	const { scene } = useGLTF("/assets/models/scene.gltf");

	useEffect(() => {
		if (scene) {
			try {
				scene.traverse((child) => {
					if (child instanceof THREE.Mesh) {
						child.frustumCulled = true;
						child.matrixAutoUpdate = false;
						child.updateMatrix();
						if (isMobile && child.material) {
							child.material.precision = "lowp";
						}
					}
				});
				setIsLoading(false);
			} catch (error) {
				console.error('Erreur lors de l\'initialisation:', error);
				setHasError(true);
			}
		}
	}, [scene, isMobile]);

	if (isLoading) {
		return <mesh><boxGeometry args={[0, 0, 0]} /></mesh>;
	}

	if (hasError) {
		console.log('Erreur de rendu du modèle');
		return null;
	}

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
			<button 
				onClick={captureScene}
				style={{
					position: 'fixed',
					top: '20px',
					right: '20px',
					zIndex: 1000
				}}
			>
				Capture Scene
			</button>
			<Canvas
				shadows={false}
				camera={{ 
					position: [0, 2, 8], 
					fov: isMobile ? 65 : 60 
				}}
				frameloop={isVisible ? 'always' : 'never'}
				gl={renderSettings}
			>
				<color attach="background" args={["#d5e8ea"]} />
				<fog attach="fog" args={["#d5e8ea", isMobile ? 3 : 10, isMobile ? 10 : 25]} />
				
				<Suspense fallback={null}>
					<ambientLight intensity={isMobile ? 0.3 : 0.5} />
					{!isMobile && (
						<>
							<directionalLight position={[2, 8, 4]} intensity={1.2} />
							<pointLight position={[-2, 2, -1]} intensity={0.4} color="#f8e3ff" />
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