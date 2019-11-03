var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE msgs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender text, 
            receiver text, 
            messages text,
            sentiment INTEGER,
            timestamp INTEGER
            );`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO msgs (sender, receiver, messages, sentiment, timestamp) VALUES (?,?,?,?,?)'
                db.run(insert, ["admin","squirrel","Hey, squirrel, how is assignment 6 going?", 1, 1])
                db.run(insert, ["squirrel","admin","terrible", 1, 2])
                db.run(insert, ["admin","squirrel","don't worry assignment 7 will be different", 1, 3])
                db.run(insert, ["squirrel","admin","NO CAP", 1, 4])
                db.run(insert, ["user","erika", "ayy lmao", -1, 6])
            }
        });  
        db.run(`CREATE TABLE posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            post text,
            sentiment INTEGER, 
            CONSTRAINT email_unique UNIQUE (email)
            );`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO posts (name, email, post, sentiment) VALUES (?,?,?,?)'
                db.run(insert, ["admin","admin@example.com","sample post 123", 1])
                db.run(insert, ["user","user@example.com", "ayy lmao", -1])
            }
        });  
    }
});

module.exports = db