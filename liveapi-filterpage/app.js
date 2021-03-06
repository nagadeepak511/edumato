var express = require('express')
var app = express()
var port = 8080

var mongo = require('mongodb')
var MongoClient = mongo.MongoClient
var mongoUrl = "mongodb+srv://naga:test123@edumato.1t9ez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" /*'mongodb://localhost:27017'*/
var db;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// home page
app.get('/',(req, res)=>{
    res.send('Welcome to api of filter page,edumato')
})

// api
app.get('/restaurants/:mealtypeId', (req, res)=>{
    var mealtypeId = req.params.mealtypeId ? req.params.mealtypeId : "1"
    var location = req.query.cityId ? req.query.cityId : "1"
    var cuisine = req.query.cuisine ? req.query.cuisine : `1,2,3,4,5`
    var lcost = req.query.lcost ? req.query.lcost : 0
    var hcost = req.query.hcost ? req.query.hcost : 100000
    var sortkey = req.query.sortkey ? req.query.sortkey : 1
    var skip = req.query.skip ? req.query.skip : 0

    var query = {
        "type.mealtype":mealtypeId,
        "city":location,
        "Cuisine.cuisine":{$in:cuisine.split(',')},
        $and:[{"cost":{$lt:Number(hcost), $gt:Number(lcost)}}]
    }
    
    db.collection('restaurantdata').find(query).sort({"cost":sortkey}).skip(Number(skip)).limit(2).toArray((err, result)=>{
        if(err) throw err
        res.send(result)
    })
})

// place order
app.post('/placeorder',(req, res)=>{
    db.collection('order').insert(req.body, (err, result)=>{
        if(err) throw err
        res.send('order placed')
    })
})

// view order(admin/customer)
app.get('/vieworder', (req, res)=>{
    var query = req.query.email?{email:req.query.email}:{}
    db.collection('order').find(query).toArray((err, result)=>{
        if(err) throw err
        res.send(result)
    })
})

app.get('/vieworder/:orderid', (req, res)=>{
    var id = mongo.ObjectId(req.params.orderid)
    console.log(id)
    db.collection('order').find({"_id":id}).toArray((err, result)=>{
        if(err) throw err
        res.send(result)
    })
})

// delete orders
app.delete('/deleteorders', (req, res)=>{
    db.collection('order').remove((err, result)=>{
        if(err) throw err
        res.send(result)
    })
})

// update status
app.put('/updateStatus/:id', (req, res)=>{
    var id= mongo.ObjectId(req.params.id)
    var status = "Pending"
    var statValue = 2
    statValue = req.query.statValue?req.query.statValue:2
    statValue = Number(statValue)
    if(statValue!=2){
        status = statValue?"Accepted":"Rejected"
    }

    db.collection('order').updateOne(
        {"_id":id},
        {
            $set:{
                "status":status
            }
        },
        (err, result)=>{
            if(err) throw err
            res.send(result)
        }
    )
})

// connect with db
MongoClient.connect(mongoUrl,(err, client)=>{
    if(err) console.log('error while connecting')
    else{
        db = client.db('edumato')
    }
})

// run server on port
app.listen(port, ()=>{
    console.log('running on '+port)
})