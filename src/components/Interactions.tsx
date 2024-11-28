import React, { useCallback } from "react";
import { useThree } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Interactions = () => {
	const { camera } = useThree();
	const navigate = useNavigate();

	const goToWebDev = useCallback(() => {
		gsap.to(camera.position, { duration: 2, x: 10, y: 5, z: 5 });
		navigate("/web-dev");
	}, [camera, navigate]);

	const goToLevelDesign = useCallback(() => {
		gsap.to(camera.position, { duration: 2, x: -10, y: 5, z: 5 });
		navigate("/level-design");
	}, [camera, navigate]);

	return (
		<>
			<mesh position={[2, 0, 0]} onClick={goToWebDev}>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial transparent opacity={0} />
			</mesh>
			<mesh position={[-2, 0, 0]} onClick={goToLevelDesign}>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial transparent opacity={0} />
			</mesh>
		</>
	);
};

export default Interactions;
