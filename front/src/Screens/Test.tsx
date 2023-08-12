import { useEffect, useState } from "react";
import axios from "axios";
import { connectSocket, disconnectSocket, sendMessage } from "../Websocket/Socket.io";
import { UserData } from "../Services/User";
import PlayButton from "../Components/PlayButton";


export const Test = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [socketData, setSocketData] = useState('');
    const [inQueue, setInQueue] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (socketData === "QUEUE JOINED")
            setInQueue(true);
        else
            setInQueue(false);
    }, [socketData]);

    const handleMessage = async () => {
        sendMessage("LOOOOL");
    }

    return (
        <div>
            <header className="flex"
                style={{ flexDirection: 'column', zIndex: '1' }}>

                <PlayButton gameMode={4} setSocketData={setSocketData} />

                {inQueue && <div className="loading-container">
                    <div className="loading"></div>
                    <div id="loading-text">Waiting for opponent</div>
                </div>}

            </header>
        </div>
    )
}