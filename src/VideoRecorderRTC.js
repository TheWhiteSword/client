import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import RecordRTC, { invokeSaveAsDialog } from 'recordrtc';
import Webcam from "react-webcam";
import request from './utils/request';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";




const RecordedRTC = () => {

    const [stream, setStream] = useState(null);

    const [blob, setBlob] = useState(null);

    const refVideo = useRef(null);

    const [recording, setRecording] = useState(false);

    const recorderRef = useRef(null);

    var cameraStream = null;



    useEffect(() => {
        if (!refVideo.current) {
            return;
        }

    }, [stream, refVideo]);


    var mystring = "Hello World!";
    var myblob = new Blob([mystring], {
        type: 'text/plain'
    });

    const uploadFileEmptyRequest = () => {
        const data = new FormData();
        // data.append('dataname', 'username');
        data.append('data', myblob);
        console.log(myblob);

        return request.post(`/videos`, data, {
            headers: {
                "Content-Type": "multipart/form-data; boundary=${data._boundary}",
            },
            timeout: 300000,
        }).then(() => {
            alert('successfully uploaded');
        });
    };


    const uploadFileRequest = () => {
        const data = new FormData();

        

        data.append('data', blob);


        return request.post(`/videos`, data, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=${data._boundary}',
            },
            timeout: 300000,
        }).then(() => {
            alert('successfully uploaded');
            setBlob(null);

        });
    };


    const startRecording = async () => {
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (cameraStream) {
            setStream(cameraStream);
            recorderRef.current = new RecordRTC(cameraStream, { type: 'video', mimeType: 'video/webm\;codecs=vp9'
        });
            recorderRef.current.startRecording();
            setBlob(null);
            setRecording(true);
        }).catch(function (error) {
            alert('Unable to capture your audio or camera. Please allow access to both of them and try again.');
            console.error(error);
        });

    };

    const handleStop = () => {
        recorderRef.current.stopRecording(() => {
            setBlob(recorderRef.current.getBlob());
            setRecording(false);
        });
    };

    const handleSave = () => {
        invokeSaveAsDialog(blob, "Recorded-Video.mp4");
    };

    const handleUpload = () => {
        invokeSaveAsDialog(blob);
    };

    return (
        <div className="App">
            <header className="App-header">


                <div class="tile_buttons_div">
                    {recording && (
                        <div>
                            <h2>Recording Now ....</h2>
                        </div>
                    )}
                    <button className="button" onClick={startRecording}>start recording</button>
                    <button className="button" onClick={handleStop}>stop recording</button>
                    <div class="clear"></div>
                </div>

                <Webcam
                    width={350}
                />

                <br />
                <br />
                <br />

                {blob && (
                    <div className="recordedVideoContainer">

                        <div className="clear">

                            {/* <button className="button" onClick={handleSave}>upload recorded video</button> */}
                            <button className="button" onClick={uploadFileRequest}>upload recorded video</button>


                        </div>

                        <div className="clear">

                            <video className="recdVideo"
                                src={URL.createObjectURL(blob)}
                                controls

                                ref={refVideo}
                                style={{ width: '450px', margin: '1em' }}
                            />

                        </div>

                        <br />
                        <br />

                    </div>
                )}


            </header>
        </div>
    );
}

export default RecordedRTC;




