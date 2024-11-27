import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LevelDesign from './pages/LevelDesign/LevelDesign';
import WebDev from './pages/WebDev/WebDev';
import Home from './pages/Home/Home';
import Cursor from './components/common/Cursor/Cursor';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({error}) {
  return (
    <div role="alert">
      <p>Quelque chose s'est mal passé :</p>
      <pre>{error.message}</pre>
    </div>
  )
}

function App() {
   return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
         <Router>
            <div className="App">
               <Cursor />
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/level-design" element={<LevelDesign />} />
                  <Route path="/web-dev" element={<WebDev />} />
                  <Route path="*" element={<div>404 - Page non trouvée</div>} />
               </Routes>
            </div>
         </Router>
      </ErrorBoundary>
   );
}

export default App;