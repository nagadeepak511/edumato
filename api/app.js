var express = require('express')
var app = express()
var port = process.env.PORT||8080

var mongo = require('mongodb')
var MongoClient = mongo.MongoClient
var db;
var mongourl = 'mongodb+srv://naga:test123@edumato.1t9ez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// home
app.get('/', (req, res)=>{
    res.send('welcome to edumato api')
})

// restaurant data
app.get('/filter', (req, res)=>{
    var q={}
    if(req.query.mealtype){
        q = {'type.mealtype' : Number(req.query.mealtype)}
    }
    if(req.query.lcost&&req.query.hcost){
        q.$and = [{"cost":{$gt:Number(req.query.lcost), $lt:Number(req.query.hcost)}}]
    }
    else if(req.query.lcost){
        q.cost={$gt:req.query.lcost}
    }
    else if(req.query.hcost){
        q.cost={$gt:req.query.hcost}
    }
    db.collection('restaurantdata').find(q).toArray((err, result)=>{
        if(err) throw err
        res.send(result)
    })
})

// connect to mongodb cloud
MongoClient.connect(mongourl, (err, client)=>{
    if(err) console.log('error while connecting')
    db = client.db('edumato')
})

// run server
app.listen(port, ()=>{
    console.log('running on '+port)
})