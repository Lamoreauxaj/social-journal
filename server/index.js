// Create express app
var express = require("express")
const cors = require('cors')
var app = express()
var db = require("./database.js")
var calendar = require('./calendar.js')

app.use(cors())

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var sentiment = require("./Match.js")

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, '0.0.0.0', () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints
app.get("/api/posts", (req, res, next) => {
    var sql = "select * from posts"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
      });
});

app.get('/api/posts/user/:name', (req, res, next) => {
    var sql = "select * from posts where name = ?"
    var params = [req.params.name]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
      });
})

app.get("/api/posts/:id", (req, res, next) => {
    var sql = "select * from posts where id = ?"
    var params = [req.params.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
      });
});

app.get("/api/msgs/:name", (req, res, next) => {
    var sql = "select * from msgs where sender = ? or receiver = ?";
    var params = [req.params.name, req.params.name];
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        rows.sort((a, b) => {
            if (a.timestamp === b.timestamp) return 0;
            return a.timestamp < b.timestamp ? -1 : 1;
        });
        console.log(rows);
        res.json({
            "message": "success",
            "data": rows
        })
      });
});

app.post("/api/msgs/", (req, res, next) => {
    var errors=[]
    if (!req.body.messages){
        errors.push("No message text");
    }
    if (!req.body.receiver){
        errors.push("No receiver specified");
    }
    if (errors.length){
        console.log(errors);
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        sender: req.body.sender,
        receiver: req.body.receiver,
        messages: req.body.messages
    }
    sentiment.calculateSentiment(data.messages)
    .then(function(score) {
        var sql ='INSERT INTO msgs (sender, receiver, messages, sentiment, timestamp) VALUES (?,?,?,?,?)'
        console.log(new Date().getTime())
        var params =[data.sender, data.receiver, data.messages, score.documents[0].score, new Date().getTime()]
        console.log(params);
        db.run(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "success",
                "data": data,
                "id" : this.lastID
            })
        });
    });
})

app.post("/api/posts/", (req, res, next) => {
    var errors=[]
    if (!req.body.post){
        errors.push("No post text");
    }
    if (!req.body.title){
        errors.push("No post title");
    }
    if (!req.body.prompt){
        errors.push("No post prompt");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        post : req.body.post
    }
    sentiment.calculateSentiment(data.post)
    .then(function(score) {
        var sql ='INSERT INTO posts (title, prompt, name, post, sentiment) VALUES (?, ?, ?,?,?)'
        var params =[req.body.title, req.body.prompt, data.name, data.post, score.documents[0].score]
        console.log(params);
        db.run(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "success",
                "data": data,
                "id" : this.lastID
            })
        });
    });
})

app.get("/api/match/:name", (req, res, next) => {
    var sql = "select * from posts where name = ?"
    var sql2 = "select * from posts where name != ?"
    var params = [req.params.name]
    db.all(sql, params, (err, current) => {
        if (err) {
          res.status(400).json({"error": err.message});
          return;
        }
        
        db.all(sql2, params, (err, others) => {
            if (err) {
                res.status(400).json({"error": err.message})
                return;
            }
            
            var min = 100;
            var minElement = others[0];
            for(var i = 0; i < others.length; ++i) {
                if (Math.abs(others[i].sentiment - current[0].sentiment) < min) {
                    minElement = others[i];
                    min = Math.abs(others[i].sentiment - current[0].sentiment);
                }
            }        

            res.json(minElement);
        });
    });
});

app.get('/api/suggestions', async (req, res, next) => {
    res.status(200);
    res.json(await calendar.main());
});


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});