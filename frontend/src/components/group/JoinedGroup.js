import { useContext, useState } from 'react';
import classes from './JoinedGroup.module.css';
import { useNavigate } from "react-router-dom";
import useGet from '../fetch/useGet'
import Card from '../UI/Card';
import { JoinedGroupContext } from '../store/joined-group-context';


function JoinedGroups( {refresh}) {
    const navigate = useNavigate();
    const jGrpCtx = useContext(JoinedGroupContext);
    const currUserId = localStorage.getItem("user_id");


    // const { error, isLoaded, data } = useGet(`/group-member?userid=${currUserId}`)
    // // for group members `/group-member?groupid=${groupId}

    // if (!isLoaded) return <div>Loading...</div>
    // if (error) return <div>Error: {error.message}</div>


    function handleClick(e) {
        let id = e.target.id
        // console.log("3690",e)
        if (id == "") {
            id = e.target.parentElement.parentElement.id
        }
        console.log("3690", id)
        navigate("/groupprofile", { state: { id } })

    }

    return <>

        <div className={classes.label}>
            Groups you've joined
        </div>
        <Card className={classes.joinedGroupCard}>

            {/* {data.data && data.data.map((group) => ( */}
            {jGrpCtx.joinedGrps && jGrpCtx.joinedGrps.map((group) => (
                <div key={group.id} id={group.id} className={classes.container} onClick={handleClick} >
                    <div className={classes.img}></div>
                    <div>
                        <div className={classes.title}>{group.title}</div>
                    </div>
                    {console.log("title jg", group.title)}

                </div>
            ))}

        </Card>
    </>
}

export default JoinedGroups;