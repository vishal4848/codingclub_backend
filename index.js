const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const db = require('mongoose')


main().catch(err=>console.log(err));
async function main(){
    console.log('Connected to Database');
    await db.connect(process.env.MONGODB_URI)
}

const idSubmitSchema = new db.Schema({
    team_name: String,
    unique_id: String,
    hackerrank_id: String,
    kaggle_id: String,
    Date:Date,
})


const IDData = db.model('IDData', idSubmitSchema)

const server = express();
server.use(cors());
server.use(bodyParser.json());



server.post('/api/submitID', async (req,res)=>{
    let id_data = new IDData();
    id_data.team_name = req.body.team_name;
    id_data.unique_id = req.body.unique_id;
    id_data.hackerrank_id = req.body.hackerrank_id;
    id_data.kaggle_id = req.body.kaggle_id;
    id_data.Date = new Date().toUTCString();
    const doc = await IDData.find({'unique_id':[id_data.unique_id]})
    if(doc.length==0){
        id_data.save();
        res.send(id_data);
    }
    else{
        res.send(false);
    }

    
})

server.listen(8000,()=>{
    console.log('Server Started')
})
