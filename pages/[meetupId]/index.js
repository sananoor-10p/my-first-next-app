import MeetupDetail from '../../components/meetups/MeetupDetail'
import {MongoClient,ObjectId } from 'mongodb' 

function MeetupDetails(props){
    return <MeetupDetail data={props.meetupData}></MeetupDetail>

}

export async function getStaticPaths() {
const client = await MongoClient.connect('mongodb+srv://sananoor:ZTEBJFo9OVyCXKfD@cluster0.pn7gejs.mongodb.net/meetups?retryWrites=true&w=majority')

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect('mongodb+srv://sananoor:ZTEBJFo9OVyCXKfD@cluster0.pn7gejs.mongodb.net/meetups?retryWrites=true&w=majority')

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  console.log(selectedMeetup)

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}


export default MeetupDetails

