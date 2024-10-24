import './styles/App.css';
import Canvas3D from './components/Canvas3d';
import LevelDesign from './sections/LevelDesign';
import WebDev from './sections/WebDev';

function App() {
   return (
      <div className="App">
         <div className="canvas-container">
            <Canvas3D />
         </div>
         <LevelDesign />
         <WebDev />
      </div>
   );
}

export default App;