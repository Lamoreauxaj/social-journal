var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            post text,
            sentiment INTEGER, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
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