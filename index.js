let express = require('express')
let todoController = require('./controllers/todoController')

let app = express()

//set up template engine
app.set('view engine', 'ejs')

//static files 
app.use('/assets', express.static('assets'))

//fire controllers
todoController(app)

//listen to port 
app.listen(3000)
console.log('Listening to port 3000') 