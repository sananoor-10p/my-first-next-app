import MeetupList from '../components/meetups/MeetupList'
import {useState, useEffect } from 'react'
import {MongoClient} from 'mongodb' 

const dummyData = [
    {
        id: 'm1',
        title: 'title1',
        image: 'https://static01.nyt.com/images/2021/07/19/travel/22The-world-through-canada-5/oakImage-1626708139861-mediumSquareAt3X.jpg',
        address: 'address1'
    },
    {
        id: 'm2',
        title: 'title2',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Toronto_Skyline_Summer_2020.jpg',
        address: 'address2'
    }
]
function HomePage(props){
    // const [meetups, setMeetups] = useState([])
    // useEffect(() => {
    //     setMeetups(dummyData)

    // },[])
    return <MeetupList meetups={props.meetups}></MeetupList>
}

export async function getStaticProps(){
    const client = await MongoClient.connect('mongodb+srv://sananoor:ZTEBJFo9OVyCXKfD@cluster0.pn7gejs.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = await client.db()
    const meetupCollection = await db.collection('meetups')
    const response = await meetupCollection.find().toArray()
    client.close()

    // const data = await response.data.json()
    console.log(response,'res')

    return {
        props: {
            meetups: response.map(res => ({
                title: res.title,
                address: res.address,
                image: res.image,
                id: res._id.toString()
            }))
        }
    }
}

export default HomePage