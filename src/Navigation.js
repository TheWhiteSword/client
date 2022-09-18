import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import RecordedRTC from './VideoRecorderRTC.js';
import Login from './login.js';
import RecordedVideos from './RecordedVideos';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


const Navigation = () => {
  return (
    <div>
      <nav>
        <ul class="no-bullets">

          <li>
            <Link to="/signin">
              <button type="button">

                Admin Signin
              </button>
            </Link>
          </li>

          <li>

            <Link to="/videoRecorder">
              <button type="button">

                Record video
              </button>
            </Link>
          </li>
        </ul>
      </nav>


    </div>


  );
}







export default Navigation;
