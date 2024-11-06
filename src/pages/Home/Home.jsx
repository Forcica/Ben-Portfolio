import React from "react";
import Canvas3D from "../../components/common/Canvas3D/Canvas3d";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import "./Home.css";

const Home = () => {
	return (
		<div className="home-container">
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
				<div className="home-overlay">
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
									const element =
										document.querySelector(".title-text");
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
				</div>
				<motion.div
					className="explore-container"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 2.5 }}
				>
					<p className="explore-text">Choisissez votre destination</p>
					<div className="arrows-container">
						<motion.div
							className="arrow-left"
							animate={{ x: [-10, 0, -10] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						>
							← Web Dev
						</motion.div>
						<motion.div
							className="arrow-right"
							animate={{ x: [10, 0, 10] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						>
							Level Design →
						</motion.div>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default Home;
