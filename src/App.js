import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Canvas3D from './components/Canvas3d';
import LevelDesign from './sections/LevelDesign';
import WebDev from './sections/WebDev';
import Contact from './sections/Contact';

function App() {
   return (
      <Router>
         <div className="App">
         <div className="canvas-container">
            <Canvas3D />
         </div>
         <Routes>
            <Route path="/level-design" element={<LevelDesign />} />
            <Route path="/web-dev" element={<WebDev />} />
            <Route path="/contact" element={<Contact />} />
         </Routes>
         </div>
      </Router>
   );
}

export default App;