import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Assurez-vous que l'élément 'root' existe dans votre HTML
const root = document.getElementById("root");
if (!root) {
	console.error("Element 'root' non trouvé!");
}

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
