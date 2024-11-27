import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Canvas3D from "../../components/common/Canvas3D/Canvas3d";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import "./Home.css";
import { throttle } from "lodash";
import LoadingScreen from "../../components/common/LoadingScreen/LoadingScreen";
import useAssetLoader from "../../hooks/useAssetLoader";

const ANIMATION_SEQUENCES = [
	["Bienvenue dans mon univers", 9000],
	["ようこそ私の世界へ", 3000],
	["Welcome to my world", 6000],
];

const Home = () => {
	const navigate = useNavigate();
	const { progress, isLoading, assetsLoaded } = useAssetLoader();

	const handleNavigation = useCallback(
		(path) => {
			navigate(path);
		},
		[navigate]
	);

	const handleKeyPress = useCallback(
		(e, path) => {
			if (e.key === "Enter") {
				handleNavigation(path);
			}
		},
		[handleNavigation]
	);

	const handleParallax = useCallback(() => {
		const scrolled = window.pageYOffset;
		document.querySelectorAll(".parallax").forEach((element) => {
			const speed = parseFloat(element.dataset.speed) || 0.5; // Fallback speed if not defined
			element.style.transform = `translateY(${scrolled * speed}px)`;
		});
	}, []);

	const throttledHandleParallax = throttle(handleParallax, 100);

	useEffect(() => {
		window.addEventListener("scroll", throttledHandleParallax);
		return () =>
			window.removeEventListener("scroll", throttledHandleParallax);
	}, [throttledHandleParallax]);

	const renderNavigationButton = (
		path,
		icon,
		title,
		subtitle,
		isWebDev = false
	) => (
		<motion.div
			className={`nav-button ${isWebDev ? "web-dev" : "level-design"}`}
			role="button"
			aria-label={`Naviguer vers ${title}`}
			tabIndex={0}
			onKeyPress={(e) => handleKeyPress(e, path)}
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.6,
				ease: [0.23, 1, 0.32, 1],
			}}
			whileHover={{
				scale: 1.02,
				transition: { duration: 0.3 },
			}}
			onClick={() => handleNavigation(path)}
		>
			<div className="button-content">
				<span className="button-icon">{icon}</span>
				<div className="button-text">
					<span className="button-title">{title}</span>
					<span className="button-subtitle">{subtitle}</span>
				</div>
			</div>
		</motion.div>
	);

	return (
		<motion.div
			className="home-container"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className="fog-overlay" />
			<AnimatePresence mode="wait">
				{isLoading || !assetsLoaded ? (
					<LoadingScreen progress={progress} />
				) : (
					<div className="content-wrapper">
						<div className="canvas-container">
							<Canvas3D />
						</div>

						<motion.div
							className="home-content"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1.5, delay: 1 }}
						>
							<motion.div
								className="title-container"
								initial={{ y: -50 }}
								animate={{ y: 0 }}
								transition={{ duration: 1, delay: 1.5 }}
							>
								<motion.h2
									className="author-name"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 2, duration: 0.8 }}
								>
									Benoît B.
								</motion.h2>
								<TypeAnimation
									sequence={ANIMATION_SEQUENCES.flat()}
									wrapper="h1"
									speed={40}
									className="title-text"
									cursor={false}
									repeat={Infinity}
									delay={2500}
								/>
							</motion.div>
						</motion.div>

						<motion.div
							className="choose-text-container"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 3 }}
						>
							<span className="choose-text">Choisis ta destination</span>
							<div className="arrows-container">
								<div className="arrow"></div>
								<div className="arrow"></div>
								<div className="arrow"></div>
							</div>
						</motion.div>

						<motion.div
							className="navigation-buttons"
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 2.5 }}
						>
							{renderNavigationButton(
								"/web-dev",
								"⟨/⟩",
								"Web Dev",
								"Projets & Expériences",
								true
							)}
							{renderNavigationButton(
								"/level-design",
								"◇",
								"Level Design",
								"Créations & Design"
							)}
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default Home;
