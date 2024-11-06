import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LevelDesign from './pages/LevelDesign/LevelDesign';
import WebDev from './pages/WebDev/WebDev';
import Home from './pages/Home/Home';
import Cursor from './components/common/Cursor/Cursor';

function App() {
   return (
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
   );
}

export default App;