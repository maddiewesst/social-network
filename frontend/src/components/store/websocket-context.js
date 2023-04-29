import React, {useState, useEffect} from "react";

export const WebSocketContext = React.createContext({
    websocket: null,
    newMsgsObj: null,
    setNewMsgsObj: () => {},
    newNotiObj: null,
    setNewNotiObj: () => {},
});

export const WebSocketContextProvider = (props) => {
    const [socket, setSocket] = useState(null);
    const [newMsgsObj, setNewMsgsObj] = useState(null);

    const [newNotiObj, setNewNotiObj] = useState(null);

    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:8080/ws")

        newSocket.onopen = () => {
            console.log("ws connected");
            setSocket(newSocket);
        };
        
        newSocket.onclose = () => {
            console.log("bye ws");
            setSocket(null);
        };

        newSocket.onerror = (err) => console.log("ws error");

        newSocket.onmessage = (e) => {
            console.log("msg event: ", e);
            const msgObj = JSON.parse(e.data);
            console.log("ws receives msgObj: ", msgObj);

            if (msgObj.label === "p-chat") {
                console.log("ws receives private msg (wsctx): ", msgObj.message);
                const newReceivedMsgObj = {
                    id: msgObj.id,
                    targetid: msgObj.targetid,
                    sourceid: msgObj.sourceid,
                    message: msgObj.message,
                    createdat: msgObj.createdat,
                };
                setNewMsgsObj(newReceivedMsgObj);
            } else if (msgObj.label === "g-chat") {
                console.log("ws receives grp msg (wsctx): ", msgObj.message);
                // const newReceivedMsgObj = {
                //     id: msgObj.id,
                //     targetid: msgObj.targetid,
                //     sourceid: msgObj.sourceid,
                //     message: msgObj.message,
                //     createdat: msgObj.createdat,
                // };
                // setNewMsgsObj(newReceivedMsgObj);
            } else if (msgObj.label === "noti") {
                console.log("ws receives noti (wsctx): ", msgObj);
                console.log("ws receives noti type (wsctx): ", msgObj.type);
                const newReceivedNotiObj = {
                    id: msgObj.id,
                    type: msgObj.type,
                    sourceid: msgObj.sourceid,
                    targetid: msgObj.targetid,
                };
                setNewNotiObj(newReceivedNotiObj);
            }
        };

        return () => {
            newSocket.close();
        };  
    }, []);
         
    return (
        <WebSocketContext.Provider value={{
            websocket: socket,
            newMsgsObj: newMsgsObj,
            setNewMsgsObj: setNewMsgsObj,
            newNotiObj: newNotiObj,
            setNewNotiObj: setNewNotiObj,
        }}>
            {props.children}
        </WebSocketContext.Provider>
    );
};