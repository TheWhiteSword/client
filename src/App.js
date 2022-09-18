import logo from './logo.svg';
import './App.css';

import Navigation from './Navigation.js';
import RecordedVideos from './RecordedVideos';
import RecordedRTC from './VideoRecorderRTC.js';
import Login from './login.js';




import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
      </header>



      <div>


        <Router>
          <Routes >
            <Route path="/signin" element={<Signin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/videoRecorder" element={<VideoRecorder />} />
            <Route path="/recordedVideos" element={<RecordedVideos />} />
            <Route path="/" element={<Navigation />} />
          </Routes>

        </Router>

      </div>

    </div>
  );
}


const VideoRecorder = () => {
  return <RecordedRTC />;
}

const Signin = () => {
  return <Login />;
}

const Admin = () => {
  return <h2>Admin</h2>;
}




export default App;
