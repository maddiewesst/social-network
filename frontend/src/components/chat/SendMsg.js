import { useRef, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import Form from "../UI/Form";
import send from '../assets/send.svg';
import SendMsgForm from "../UI/SendMsgForm";
import CreateMsgTextarea from "../UI/CreateMsgTextarea";
import SmallButton from "../UI/SmallButton";
import styles from "./SendMsg.module.css";

const UserSendMsg = (props) => {
    // const msgRef = useRef();
    const [enteredMsg, setEnteredMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const msgChangeHandler = (e) => {
        console.log("currently entered msg", e.target.value);
        setEnteredMsg(e.target.value);
    };

    const sendMsgHandler = (e) => {
        e.preventDefault();
        // console.log("user sent msg: ", msgRef.current.value);
        // props.onSendMsg(msgRef.current.value);
        // msgRef.current.value = "";
        console.log("submit entered msg", e.target.value);
        props.onSendMsg(enteredMsg);
        setEnteredMsg("");
    }

    const showEmojiPickerHandler = (e) => {
        e.preventDefault();
        console.log("toggle emoji picker");
        setShowEmojiPicker(val => !val);
    };

    const emojiClickHandler = (emojiObj) => {
        setEnteredMsg((prevInput) => {
            console.log("emo ob", emojiObj);
            return prevInput + emojiObj.emoji;
        });
    };

    return (
        <>
        {showEmojiPicker && <EmojiPicker onEmojiClick={emojiClickHandler} className={styles["emoji"]} />}
        <SendMsgForm onSubmit={sendMsgHandler} className={styles["send-msg"]} style={{top: `${window.innerHeight-205}px`}}>
            <CreateMsgTextarea className={styles["send-msg-input"]} value={enteredMsg} onChange={msgChangeHandler}/>
            <div className={styles["show-picker"]} onClick={showEmojiPickerHandler}>&#9786;</div>
            <button type="submit" className={styles["send"]}>
                <img src={send} alt='' />
            </button>
        </SendMsgForm>
        </>
    );
};

export default UserSendMsg;