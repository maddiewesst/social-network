import React, {useState, useEffect, useContext} from "react";
import { UsersContext } from "./users-context";

export const WebSocketContext = React.createContext({
    websocket: null,
    newMsgsObj: null,
    setNewMsgsObj: () => {},
    newNotiObj: null,
    setNewNotiObj: () => {},
    newNotiFollowReplyObj: null,
    setNewNotiFollowReplyObj: () => {},
    newNotiJoinReplyObj: null,
    setNewNotiJoinReplyObj: () => {},
    newNotiJoinReplyObj: null,
    setNewNotiInvitationReplyObj: () => {},
});

export const WebSocketContextProvider = (props) => {
    const [socket, setSocket] = useState(null);
    const [newMsgsObj, setNewMsgsObj] = useState(null);

    const [newNotiObj, setNewNotiObj] = useState(null);
    const [newNotiFollowReplyObj, setNewNotiFollowReplyObj] = useState(null);
    const [newNotiJoinReplyObj, setNewNotiJoinReplyObj] = useState(null);
    const [newNotiInvitationReplyObj, setNewNotiInvitationReplyObj] = useState(null);

    // const usersCtx = useContext(UsersContext);

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
                setNewMsgsObj(msgObj);
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
                if (msgObj.type === "follow-req" || msgObj.type === "event-notif" || msgObj.type === "join-req" || msgObj.type === "invitation") {
                    console.log("ws receives noti (wsctx): ", msgObj);
                    console.log("ws receives noti type (wsctx): ", msgObj.type);
                    setNewNotiObj(msgObj);
                } else if (msgObj.type === "follow-req-reply") {
                    console.log("ws receives noti follow reply (wsctx): ", msgObj);
                    console.log("ws receives noti follow reply type (wsctx): ", msgObj.type);
                    console.log("ws receives noti follow reply accepted (wsctx): ", msgObj.accepted);
                    setNewNotiFollowReplyObj(msgObj);
                    // const followUser = usersCtx.users.find((user) => user.id === msgObj.sourceid);
                    // console.log(msgObj.targetid, " Gonna follow (wsctx): ", followUser);
                    // msgObj.accepted && 
                } else if (msgObj.type === "join-req-reply" || msgObj.type === "invitation-reply") {
                    console.log("ws receives noti join-req-reply (wsctx): ", msgObj);
                    console.log("ws receives noti join-req-reply type (wsctx): ", msgObj.type);
                    console.log("ws receives noti join-req-reply accepted (wsctx): ", msgObj.accepted);
                    setNewNotiFollowReplyObj(msgObj);
                } 
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
            newNotiFollowReplyObj: newNotiFollowReplyObj,
            setNewNotiFollowReplyObj: setNewNotiFollowReplyObj,
            newNotiJoinReplyObj: newNotiJoinReplyObj,
            setNewNotiJoinReplyObj: setNewNotiJoinReplyObj,
            newNotiJoinReplyObj: newNotiJoinReplyObj,
            setNewNotiInvitationReplyObj: setNewNotiInvitationReplyObj,
        }}>
            {props.children}
        </WebSocketContext.Provider>
    );
};