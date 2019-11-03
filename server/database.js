var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, async (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        await db.run(`CREATE TABLE msgs (
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
                console.log('nani');
                // Table just created, creating some rows
                var insert = 'INSERT INTO msgs (sender, receiver, messages, sentiment, timestamp) VALUES (?,?,?,?,?)'
                db.run(insert, ["admin","squirrel","Hey, squirrel, how is assignment 6 going?", 1, 1])
                db.run(insert, ["squirrel","admin","terrible", 1, 2])
                db.run(insert, ["admin","squirrel","don't worry assignment 7 will be different", 1, 3])
                db.run(insert, ["squirrel","admin","NO CAP", 1, 4])
                db.run(insert, ["user","erika", "ayy lmao", -1, 6])
            }
        });  
        await db.run(`CREATE TABLE posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text,
            name text, 
            post text,
            prompt text,
            date DATETIME DEFAULT CURRENT_TIMESTAMP,
            sentiment INTEGER
            );`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                console.log('nani');
                var insert = 'INSERT INTO posts (title, name, post, prompt, date, sentiment) VALUES (?,?,?,?,?,?)'
                db.run(insert, ["Changing Myself", "admin", "I started my day at 8:00 AM by doing yoga for 30 minutes. I felt relaxed after getting through this routine. I then took a short drive to my local college to take my Art and Computer Science midterms. Getting to the testing center with time to spare was another pleasant surprise, which gave me time to start reflecting about where I’m headed next with my education.\nThe first step to make sure I stay in college is to be consistent in attending class. My problems in the past (a.k.a. almost flunking out of Danbury High) stemmed from too many absences; I must remain consistent and take advantage of the teachers’ knowledge. Second, breaking down my educational goals into smaller steps is a good way not to overburden myself. I shouldn't try and finish college in just one semester because realistically that is impossible. If I plan my work accordingly and break tasks into small achievable steps, then I will eventually achieve my goals. Finally, I must make sure my goals are attainable. I am not in the business of pursuing a nonexistent path, but rather in transferring to a four-year university and getting a degree.\nStaying committed to changing myself is hard but I refuse to see failure as an option, not again.", "How was your day?", "2019-11-02 00:00:00", 1])
                db.run(insert, ["Ranting", "user", "Maybe that’s why I’m writing this. Because keeping this inside me is what really sucks the most. I’m embarrassed to talk to my friends about how I feel. I’m scared people will just blow me off, scoff, tell me the same old generic things I’m used to hearing. Outing yourself as depressed feels like drawing a giant target on you for all sorts of useless crap. “Oh, I’m so sorry.” is literally the worst type of response to give me. Are you sorry? Or do you not know how to reply? I guess I’m a little bitter over all of this.\nBut this is what it’s like living with depression. At least on my end. But the important thing is I’ve managed to make it this far without doing anything entirely drastic. And whether anyone knows or not, it’s what I am most proud of nowadays.",
                "How do you feel?", "2019-11-01 00:00:00", -1])
            }
        });  
    }
});

module.exports = db