import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Canvas3D from './components/Canvas3d';
import LevelDesign from './sections/LevelDesign';
import WebDev from './sections/WebDev';
import Contact from './sections/Contact';
import Cursor from './components/Cursor';

function App() {
   return (
      <Router>
         <div className="App">
            <Cursor />
            <Routes>
               <Route path="/" element={
                  <div className="canvas-container">
                     <Canvas3D />
                  </div>
               } />
               <Route path="/level-design" element={<LevelDesign />} />
               <Route path="/web-dev" element={<WebDev />} />
               <Route path="/contact" element={<Contact />} />
               <Route path="*" element={<div>404 - Page non trouvée</div>} />
            </Routes>
         </div>
      </Router>
   );
}

export default App;