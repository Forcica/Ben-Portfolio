import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LevelDesign from "./pages/LevelDesign/LevelDesign";
import WebDev from "./pages/WebDev/WebDev";
import Home from "./pages/Home/Home";
import Cursor from "./components/common/Cursor/Cursor";
import { ErrorBoundary } from 'react-error-boundary';
import { Analytics } from "@vercel/analytics/react";

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
	return (
		<div className="error-container">
			<h2>Une erreur est survenue</h2>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Recharger la page</button>
		</div>
	);
}

function NotFound() {
	return (
		<div className="not-found-container">
			<h1>404 - Page non trouvée</h1>
			<p>La page que vous recherchez n'existe pas.</p>
			<button onClick={() => window.location.href = '/'}>
				Retour à l'accueil
			</button>
		</div>
	);
}

function App() {
	return (
		<ErrorBoundary 
			FallbackComponent={ErrorFallback}
			onReset={() => window.location.reload()}
		>
			<Router>
				<div className="App">
					<Cursor />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/level-design" element={<LevelDesign />} />
						<Route path="/web-dev" element={<WebDev />} />
						<Route path="/404" element={<NotFound />} />
						<Route path="*" element={<Navigate to="/404" replace />} />
					</Routes>
					<Analytics />
				</div>
			</Router>
		</ErrorBoundary>
	);
}

export default App;
