import { Link } from "react-router-dom";
import classes from './Comment.module.css'

// import profile from '../../assets/profile.svg'
import Avatar from '../../UI/Avatar';


function Comment(props) {
    const created = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
        hour: 'numeric',
        minute: 'numeric'
      }).format(new Date(props.createdAt));    
       console.log("created ", created)

    return (
    <div className={classes.container}>
        <div className={classes["author"]}>
        <Link to={`/profile/${props.authorId}`} >
            <Avatar className={classes["comment-avatar"]} id={props.authorId} src={props.avatar} alt="" width={"30px"}/>
        </Link>

        <div className={classes.column}>
                <div className={classes.row}>
                    <Link to={`/profile/${props.authorId}`}>
                        <div className={classes["details"]}>{`${props.fname} ${props.lname}`}</div>
                    </Link>
              
                </div>

                <div className={classes["create-at"]}>{created}</div>

            </div>

        </div>

        
        <div className={classes.content}>{props.message}</div>
        {props.image && <div><img src={props.image} alt="" width={"100px"}/></div>}




     
    </div>
    );
}

export default Comment;