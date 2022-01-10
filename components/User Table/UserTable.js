import { Button } from "reactstrap";
import { useHMSActions, useHMSStore, selectPeers, selectCameraStreamByPeerID, selectIsConnectedToRoom } from '@100mslive/hms-video-react';
import JoinModal from "../Reusable Components/Modal/JoinModal";
import { useEffect, useRef, useState } from "react";
import { VideoTile } from "../100ms/video";
import axios from "axios";
import ToggleNotification from "../Reusable Components/ToogleNotification/ToogleNotification";
import ModifiedTable from '../Reusable Components/Table/Table';

function Home({ peer }) {
    const hmsActions = useHMSActions();
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appToken, setAppToken] = useState('');
    const [roomId, setRoomId] = useState('');

    const videoRef = useRef(null);
    const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer?.id));
    const peers = useHMSStore(selectPeers);
    const isConnected = useHMSStore(selectIsConnectedToRoom);

    const data = [
        { name: "S.No.", style: "center" },
        { name: "Name", style: "center" },
        { name: "Actions", style: "center" },
    ];

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (videoRef.current && videoTrack) {
            if (videoTrack.enabled) {
                hmsActions.attachVideo(videoTrack.id, videoRef.current);
            } else {
                hmsActions.detachVideo(videoTrack.id, videoRef.current);
            }
        }
    }, [videoTrack, hmsActions]);

    const loadData = async () => {
        try {
            let res = await axios.get('http://localhost:3000/api/trainer/assign-room', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            setAssignedUsers(res.data.data);
        } catch (error) {
        }
    };

    const joinChat = async () => {
        try {
            await axios.get(`/api/trainer/check-room/${roomId}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            modalOpenHandler();
            const config = {
                userName: 'Jon Snow',
                authToken: appToken, // client-side token generated from your token service
                settings: {
                    isAudioMuted: true
                }
            };
            hmsActions.join(config);
        } catch (error) {
            modalOpenHandler();
            ToggleNotification("Error", error?.response?.data?.message);
        }

    };

    const modalOpenHandler = (token) => {
        token && setAppToken(token?.tbl_room?.app_token);
        setRoomId(token?.tbl_room?.id);
        setIsModalOpen(!isModalOpen);
    };

    const endCall = () => {
        hmsActions.leave();
    };

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
                            {
                                assignedUsers.length === 0 ? <h1 className="text-center">No Data to Show!</h1> :
                                    (
                                        <ModifiedTable data={data}>
                                            {
                                                assignedUsers?.length > 0 && assignedUsers.map((item, index) => {
                                                    return (
                                                        <>
                                                            <tr key={item.id}>
                                                                <td className="text-center">{(index + 1)}</td>
                                                                <td className="text-center">John Doe</td>
                                                                <td className="text-center">
                                                                    <Button color="primary" onClick={() => modalOpenHandler(item)}>Join</Button>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </ModifiedTable>
                                    )
                            }

                        </>
                    )
            }


        </>
    )
};

export default Home;
