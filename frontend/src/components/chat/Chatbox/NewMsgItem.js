import { useEffect, useState } from "react";
import SmallAvatar from "../../UI/SmallAvatar";
import styles from "./OldMsgItem.module.css";
import useGet from '../../fetch/useGet';


const NewMsgItem = (props) => {
    const selfId = +localStorage.getItem("user_id");

    const [self, setSelf]= useState();

    useEffect(()=> {
        setSelf(props.sourceid === selfId)
    },[props])
    console.log("chatprops",props)

    const { error, isLoaded, data } = useGet(`/user?id=${props.sourceid}`);

    if (!isLoaded) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className={`${self ? styles["self-msg"] : styles["frd-msg"]}`}>
            
        {!self &&
            <SmallAvatar height={30} width={30}></SmallAvatar>
        }
        <div className={styles.wrapper}>
            <div className={`${self ? styles["self-username"] : styles["frd-username"]}`}>{data.data[0].fname} {data.data[0].lname}</div>
            <div className={`${self ? styles["chat-bubble-self"] : styles["chat-bubble-frd"]}`}>
                {props.msg}
            </div>
        </div>
        {self &&
            <SmallAvatar height={30} width={30}></SmallAvatar>
        }
    </div>
    );
};

export default NewMsgItem;