import { Button } from "reactstrap";
import ModifiedTable from "../components/Table/Table";
import { useHMSActions, useHMSStore, selectPeers, selectCameraStreamByPeerID, selectIsConnectedToRoom } from '@100mslive/hms-video-react';
import JoinModal from "../components/Modal/JoinModal";
import { useEffect, useRef, useState } from "react";
import { VideoTile } from "../components/100ms/video";
// import { hmsActions } from "../components/100ms/100ms";

export default function Home({ peer }) {
    const hmsActions = useHMSActions();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const videoRef = useRef(null);
    const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer?.id));
    const peers = useHMSStore(selectPeers);
    const isConnected = useHMSStore(selectIsConnectedToRoom);

    const userData = [
        { id: 1, name: 'test' },
        { id: 2, name: 'John' },
        { id: 3, name: 'Doe' }
    ];

    const data = [
        { name: "S.No.", style: "center" },
        { name: "Name", style: "center" },
        { name: "Actions", style: "center" },
    ];

    useEffect(() => {
        if (videoRef.current && videoTrack) {
            if (videoTrack.enabled) {
                hmsActions.attachVideo(videoTrack.id, videoRef.current);
            } else {
                hmsActions.detachVideo(videoTrack.id, videoRef.current);
            }
        }
    }, [videoTrack, hmsActions]);

    const joinChat = async () => {
        try {
            console.log('in')
            modalOpenHandler();
            const config = {
                userName: 'Jon Snow',
                authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3Nfa2V5IjoiNjFkNjg5ZWY4ZDZkNWZkMzUxY2JlNTAyIiwicm9vbV9pZCI6IjYxZDgwYTM1YTBmYTc2NmQ3ZjU0NDk5YiIsInVzZXJfaWQiOiJ1c2VyX3dydHN3Iiwicm9sZSI6Imhvc3QiLCJ0eXBlIjoiYXBwIiwidmVyc2lvbiI6MiwiaWF0IjoxNjQxNTQ4MzQxLCJuYmYiOjE2NDE1NDgzNDEsImV4cCI6MTY0MTYzNDc0MSwianRpIjoiMzBiM2U4ZTktNGI3Ni00ZDc0LWFkMWUtNzM2OTBmZjQ4MWNjIn0.5Jns6QUwgLa066lwnEpesgS5rpz7kYVrhwa87fTGhRs', // client-side token generated from your token service
                settings: {
                    isAudioMuted: true
                }
            };
            hmsActions.join(config);
        } catch (error) {
            console.log('eee', error)
        }

    };

    const modalOpenHandler = () => {
        setIsModalOpen(!isModalOpen);
    };

    const endCall = () => {
        hmsActions.leave();
    };

    console.log(isModalOpen);

    return (
        <>
            <JoinModal
                isOpen={isModalOpen}
                joinHandler={joinChat}
                closeModal={modalOpenHandler}
            />
            {
                isConnected ?
                    (
                        <>

                            { 
                                peers.map(peer => 
                                    <VideoTile key={peer.id} peer={peer} />
                                )
                            }
                            <Button color="danger" onClick={endCall}> End Call </Button>
                        </>
                    ) :
                    (
                        <>
                            <h3 className='text-center mt-2'> Users Table </h3>
                            <ModifiedTable data={data}>
                                {
                                    userData.length > 0 && userData.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <td className="text-center">{(index + 1)}</td>
                                                <td className="text-center">{item.name}</td>
                                                <td className="text-center">
                                                    <Button color="primary" onClick={modalOpenHandler}>Join</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </ModifiedTable>
                        </>
                    )

            }


        </>
    )
};
