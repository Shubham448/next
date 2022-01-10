import { useRef, useEffect } from 'react';
import {
  useHMSStore,
  useHMSActions,
  selectCameraStreamByPeerID
} from '@100mslive/hms-video-react';

export function VideoTile({peer}) {
    const videoRef = useRef(null);
    const hmsActions = useHMSActions();
    
    // get the camera track to render
    const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));
    useEffect(() => {
      if (videoRef.current && videoTrack) {
        if (videoTrack.enabled) {
          hmsActions.attachVideo(videoTrack.id, videoRef.current);
        } else {
          hmsActions.detachVideo(videoTrack.id, videoRef.current);
        }
      }
    }, [videoTrack, hmsActions]);
  
    return <video ref={videoRef} autoPlay muted playsInline></video>;
};
