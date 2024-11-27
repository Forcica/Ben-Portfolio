import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

import "./Carousel.css";

const ProjectCarousel = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isImageModalOpen, setImageModalOpen] = useState(false);

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};

	const handleImageClick = (e) => {
		e.stopPropagation();
		setImageModalOpen(true);
	};

	return (
		<div className="carousel-container">
			<AnimatePresence mode="wait">
				<motion.img
					key={currentIndex}
					src={images[currentIndex]}
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -100 }}
					transition={{ duration: 0.3 }}
					className="carousel-image"
					onClick={handleImageClick}
				/>
			</AnimatePresence>

			<div className="zoom-indicator" onClick={handleImageClick}>
				<Maximize2 size={16} />
				Voir
			</div>

			{isImageModalOpen && (
				<div
					className="image-modal"
					onClick={() => setImageModalOpen(false)}
				>
					<img
						src={images[currentIndex]}
						alt="Large view"
						className="large-image"
					/>
				</div>
			)}

			{images.length > 1 && (
				<>
					<button
						className="carousel-button prev"
						onClick={handlePrevious}
						aria-label="Image précédente"
					>
						<ChevronLeft size={24} color="#2c1810" />
					</button>
					<button
						className="carousel-button next"
						onClick={handleNext}
						aria-label="Image suivante"
					>
						<ChevronRight size={24} color="#2c1810" />
					</button>
				</>
			)}
		</div>
	);
};

export default ProjectCarousel;
