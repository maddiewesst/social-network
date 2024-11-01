import { useContext, useEffect, useState } from 'react';
import classes from './JoinedGroup.module.css';
import { useNavigate } from "react-router-dom";
import useGet from '../fetch/useGet'
import Card from '../UI/Card';
import { JoinedGroupContext } from '../store/joined-group-context';
import groupimg from '../assets/groupimg.jpg'



function JoinedGroups({ refresh }) {
    const navigate = useNavigate();
    const jGrpCtx = useContext(JoinedGroupContext);
    const [joinedGroup, setJoinedGroup] = useState()
    const currUserId = localStorage.getItem("user_id");

    function handleClick(e) {
        let id = e.target.id
        if (id == "") {
            id = e.target.parentElement.parentElement.id
        }
        console.log("3690", id)
        navigate("/groupprofile", { state: { id } })
    }
    
    useEffect(() => {
        console.log(jGrpCtx.joinedGrps.length,"sfklsdlflds;")
        // setJoinedGroup(jGrpCtx.joinedGrps)
        if (jGrpCtx.joinedGrps.length != 0){
            // alert("dssdg")
            setJoinedGroup(true)
            console.log(joinedGroup,"sfklsdlflds;")
        }
    }, [refresh]);
    useEffect(() => {
        console.log(jGrpCtx.joinedGrps.length,"sfklsdlflds;")
        // setJoinedGroup(jGrpCtx.joinedGrps)
        if (jGrpCtx.joinedGrps.length != 0){
            // alert("dssdg")
            setJoinedGroup(true)
            console.log(joinedGroup,"sfklsdlflds;")
        }
    }, [jGrpCtx.joinedGrps]);
// console.log("joirndgrups",joinedGroup.length)
    return <div>
        {joinedGroup && <div className={classes.label}>
                Groups you've joined
            </div>
        }
        {joinedGroup &&  
        <Card className={classes.joinedGroupCard}>

            {/* {data.data && data.data.map((group) => ( */}
            {jGrpCtx.joinedGrps && jGrpCtx.joinedGrps.map((group) => (
                <div key={group.id} id={group.id} className={classes.container} onClick={handleClick} >
                    {/* <img src={groupimg}/ > */}
                    <div className={classes.groupimg}> <div className={classes.img}></div> </div>
                    <div>
                        <div className={classes.title}>{group.title}</div>
                    </div>
                    {console.log("title jg", group.title)}

                </div>
            ))}

        </Card>
}
    </div>
}

export default JoinedGroups;