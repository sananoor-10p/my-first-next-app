import classes from './MeetupDetail.module.css'

function MeetupDetail(props){
    return (
        <section  className={classes.detail}>
            <img src={props.data.image} alt="alt"></img>
            <h2>{props.data.title}</h2>
            <address>{props.data.address}</address>
            <p>{props.data.description}</p>
        </section>
    );
}

export default MeetupDetail