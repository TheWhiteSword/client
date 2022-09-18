import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import RecordedRTC from './VideoRecorderRTC.js';
import VideosList from './VideosList.js';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";



const RecordedVideos = () => {
  return <>
  <VideosList/>
  </>
}





export default RecordedVideos;