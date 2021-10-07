var express = require('express')
var app = express()

var mongo = require('mongodb')
var MongoClient = mongo.MongoClient
var mongoUrl = "mongodb+srv://naga:test123@edumato.1t9ez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
var db;

// home
app.get('/', (req, res)=>{
    res.send("welcome to node api")
})

//restaurant data
app.get('/restaurants/:cityName', (req, res)=>{
    var cityName = req.params.cityName;
    db.collection('restaurantdata').find({city_name:cityName}).toArray((err, result)=>{
        if(err) throw err
        res.send(result)
    })
})

//3rd part
app.get('/widget', (req, res)=>{
    db.collection('mealtype').find().toArray((err, result)=>{
        if(err) throw err
        res.send(result)
    })
})

MongoClient.connect(mongoUrl, (err, client)=>{
    if(err){
        console.log("error while connecting")
        throw err
    }
    db = client.db('edumato')
})

console.log("listening to 8080")
app.listen(8080)