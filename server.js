const express = require("express")
const db = require('./config/db')

const app = express();

const PORT = process.env.PORT || 5000;

// init middleware
app.use(express.json({ extended: false }))

db.sync({})
  .then(() => { console.log("database is created") })
  .catch((err) => { console.log("ERROR WHILE CREATED DATABASE", err) })

// Database Connected
db.authenticate({
  force: true,
  logging: console.log
},
).then(() => {
  console.log('Database is connected')
}).catch(err => {
  console.log('ERROR', err)
})


app.get('/', (req, res) => {
  res.send("Server is running")
})

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/contact', require('./routes/api/contact'))




app.listen(PORT, () => {
  console.log('Server is running on port 5000')
})