import React, { useEffect, useRef } from 'react';
import '../styles/Cursor.css';

const Cursor = () => {
	const dotRef = useRef(null);
	const outlineRef = useRef(null);

	useEffect(() => {
		const updateCursor = (e) => {
			const { clientX, clientY } = e;
			
			if (dotRef.current) {
			dotRef.current.style.transform = `translate3d(${clientX - 3}px, ${clientY - 3}px, 0)`;
			}
			
			if (outlineRef.current) {
			outlineRef.current.style.transform = `translate3d(${clientX - 16}px, ${clientY - 16}px, 0)`;
			}
		};

		const addHoverClass = () => {
			outlineRef.current?.classList.add('cursor-hover');
		};

		const removeHoverClass = () => {
			outlineRef.current?.classList.remove('cursor-hover');
		};

		let rafId = null;
		const smoothUpdateCursor = (e) => {
			if (rafId) {
			cancelAnimationFrame(rafId);
			}
			rafId = requestAnimationFrame(() => updateCursor(e));
		};

		document.addEventListener('mousemove', smoothUpdateCursor);

		const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
		
		interactiveElements.forEach(el => {
			el.addEventListener('mouseenter', addHoverClass);
			el.addEventListener('mouseleave', removeHoverClass);
		});

		return () => {
			document.removeEventListener('mousemove', smoothUpdateCursor);
			if (rafId) {
			cancelAnimationFrame(rafId);
			}
			interactiveElements.forEach(el => {
			el.removeEventListener('mouseenter', addHoverClass);
			el.removeEventListener('mouseleave', removeHoverClass);
			});
		};
	}, []);

	return (
		<>
			<div ref={dotRef} className="cursor-dot" />
			<div ref={outlineRef} className="cursor-outline" />
		</>
	);
};

export default Cursor;