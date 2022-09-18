
import React, { useState, useEffect, useRef } from 'react';
import './VideosList.css';
import request from './utils/request';
import { useCookies } from 'react-cookie';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";




const VideosList = () => {
    const [videos, setVideos] = useState([]);
    const [cookie, setCookie, removeCookie] = useCookies();


    // const [videoFile, setVideoFile] = useState(new Blob());
    // const videoEl = useRef < HTMLVideoElement > (null);

    useEffect(() => {

        request.get('/videos', { withCredentials: true })
            .then(res => {
                setVideos(res.data)
            })
            .catch(err => {
                console.log(err);
            });
        // }
    }, [])



    const logout = () => {
        request.get('/logout', { withCredentials: true })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const createObjectURL = (videoBlob) => {
        var binaryData = [];
        binaryData.push(videoBlob.data);
        const urll = URL.createObjectURL(new Blob([new Uint8Array(videoBlob.data)]), { type: "video/webm;codecs=vp9" });
        return urll;
    }






    return (

        <>

            {!videos && (
                <div>
                    <h2>Please sign in as Admin to see recorded videos</h2>

                    <Link to="/signin">
                        <button type="button">

                            Admin Signin
                        </button>
                    </Link>
                </div>
            )}

            {videos && videos?.length === 0 && (
                <div className="container">
                    <Link to="/signin">
                        <button type="button" onClick={function (e) {
                            logout();
                            console.log("================== BUTTON CLICKED");
                        }}>
                            Signout
                        </button>
                    </Link>

                    <h2>No recorded videos yet</h2>

                </div>)}

            {videos && videos?.length > 0 && (
                <div className="container">
                    <Link to="/signin">
                        <button type="button" onClick={function (e) {
                            logout();
                            console.log("================== BUTTON CLICKED");
                        }}>
                            Signout
                        </button>
                    </Link>

                    <h2>List of recorded videos</h2>
                    <table className="table table-striped table-bordered">

                        <tbody>
                            {videos && videos.map(video =>
                                <tr key={video.id}>
                                    <td >
                                        <div  >
                                            <div  >

                                                <video
                                                    src={createObjectURL(video.video)}
                                                    controls
                                                    style={{ width: '450px', margin: '1em' }}
                                                />
                                            </div>
                                            <div  >

                                                <label >{video.id}</label>
                                            </div>
                                        </div>
                                    </td>


                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>)}
        </>
    );
}





export default VideosList;