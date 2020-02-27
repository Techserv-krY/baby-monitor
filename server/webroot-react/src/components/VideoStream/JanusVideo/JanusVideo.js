import React, { useRef, useContext, useEffect } from 'react';
import { AppContext, AppContextActions, VideoStates } from '../../../context/AppContext';
import { JanusContext, JanusContextActions } from '../../../context/JanusContext';
import classes from './JanusVideo.module.css';
import useJanus from '../../../hooks/janus/useJanus';

export const JanusVideo = (props) => {

    const videoEl = useRef(null);

    const [uiState, uiDispatch] = useContext(AppContext);
    const [janusState, janusDispatch] = useContext(JanusContext);

    const { init, availableStreams, watchStream } = useJanus(props.serverUrl, props.pin, videoEl);

    // Init janus
    useEffect(() => {
        init();
    },[init]);

    // Janus available Streams changed => dispacth context
    useEffect(() => {
        if (availableStreams.length === 0)
            return;
        // Dispacth first stream as current stream
        const currentStreamId = parseInt(availableStreams[0].id);
        janusDispatch({
            type: JanusContextActions.SET_CURRENT_STREAM_ID,
            streamId: currentStreamId
        })
        // Dispatch available streams
        janusDispatch({
            type: JanusContextActions.SET_STREAMS,
            streams: availableStreams
        });
    }, [availableStreams, janusDispatch]);

    // Janus current stream changed => watch it
    useEffect(() => {
        if (janusState.currentStreamId === null)
            return;
            watchStream(parseInt(janusState.currentStreamId));
    }, [janusState.currentStreamId, watchStream]);

    // Play/pause video
    useEffect(() => {
        if (uiState.videoState === VideoStates.PAUSE)
            videoEl.current.pause();
        else if (uiState.videoState === VideoStates.PLAY)
            videoEl.current.play();
    }, [uiState.videoState]);

    // mute/unmute video
    useEffect(() => {
        videoEl.current.muted = uiState.videoMuted;
    }, [uiState.videoMuted]);

    return (
        <video
            ref={videoEl}
            style={{ height: `${uiState.videoHeight}vh` }}
            className={classes.Video}
            autoPlay
            onPlay={() => { uiDispatch({ type: AppContextActions.VIDEO_PLAYING }) }}
            onPause={() => { uiDispatch({ type: AppContextActions.VIDEO_PAUSED }) }}
            playsInline></video>
    );
}

export default JanusVideo;