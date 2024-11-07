import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Canvas3D from "../../components/common/Canvas3D/Canvas3d";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import "./Home.css";
import gsap from "gsap";

const Home = () => {
	const navigate = useNavigate();

	const pageVariants = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: {
				duration: 1.5,
				staggerChildren: 0.3,
			},
		},
		exit: {
			opacity: 0,
			transition: { duration: 0.5 },
		},
	};

	useEffect(() => {
		const handleMouseMove = (e) => {
			const { clientX, clientY } = e;
			const moveX = clientX - window.innerWidth / 2;
			const moveY = clientY - window.innerHeight / 2;
			const offset = 15;

			gsap.to(".title-container", {
				x: moveX / offset,
				y: moveY / offset,
				duration: 1,
				ease: "power2.out",
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<motion.div
			className="home-container"
			variants={pageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<div className="canvas-container">
				<Canvas3D />
			</div>

			<motion.div
				className="home-content"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1.5 }}
			>
				<div className="name-container">
					<motion.h2
						className="author-name"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 2 }}
					>
						Benoît B.
					</motion.h2>
				</div>

				<motion.div
					className="title-container"
					initial={{ y: -50 }}
					animate={{ y: 0 }}
					transition={{ duration: 1 }}
				>
					<TypeAnimation
						sequence={[
							"Bienvenue dans mon univers",
							() => {
								const element = document.querySelector(".title-text");
								if (element) {
									element.style.borderRight = "none";
								}
							},
						]}
						wrapper="h1"
						speed={50}
						className="title-text"
						cursor={true}
						repeat={0}
					/>
				</motion.div>
			</motion.div>

			<motion.div
				className="navigation-buttons"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 2.5 }}
			>
				<motion.div
					className="nav-button web-dev"
					whileHover={{ scale: 1.05, y: -5 }}
					onClick={() => navigate("/web-dev")}
				>
					<div className="button-content">
						<span className="button-icon">⟨/⟩</span>
						<div className="button-text">
							<span className="button-title">Web Dev</span>
							<span className="button-subtitle">
								Projets & Expériences
							</span>
						</div>
					</div>
				</motion.div>

				<motion.div
					className="nav-button level-design"
					whileHover={{ scale: 1.05, y: -5 }}
					onClick={() => navigate("/level-design")}
				>
					<div className="button-content">
						<span className="button-icon">◇</span>
						<div className="button-text">
							<span className="button-title">Level Design</span>
							<span className="button-subtitle">Créations & Design</span>
						</div>
					</div>
				</motion.div>
			</motion.div>

			<motion.div
				className="navigation-hint"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 3 }}
			>
				<div className="destination-text">Choisis ta destination</div>
				<div className="arrows-container">
					<div className="direction-arrow">
						<span className="arrow-icon">↑</span>
						<span className="direction-text">Web Dev</span>
					</div>
					<div className="direction-arrow">
						<span className="arrow-icon">↑</span>
						<span className="direction-text">Level Design</span>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default Home;
