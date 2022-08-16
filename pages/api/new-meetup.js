import {MongoClient} from 'mongodb' 

async function handler(req, res){
    console.log(req.method)
    try{
        if(req.method === 'POST'){
            
            const data = req.body
            // const {title, image, description, address} = data
            console.log(data,'data')
            const client = await MongoClient.connect('mongodb+srv://sananoor:ZTEBJFo9OVyCXKfD@cluster0.pn7gejs.mongodb.net/meetups?retryWrites=true&w=majority')
            const db = await client.db()
            const meetupCollection = await db.collection('meetups')
            const result = await meetupCollection.insertOne(data)
            console.log(result)
            client.close()
    
            res.status(201).json({message: 'Success'})
        }

    }
    catch(error){
        console.log(error)
    }


}

export default handler;