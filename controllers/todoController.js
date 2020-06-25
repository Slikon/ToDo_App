let bodyParser = require('body-parser')
const e = require('express')
let mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

//connect to MongoDB database
mongoose.connect(process.env.mongo_connect, { useUnifiedTopology: true, useNewUrlParser: true })

let todoSchema = new mongoose.Schema({
    item: String
})

let Todo = mongoose.model('Todo', todoSchema)

let urlencodedParser = bodyParser.urlencoded({ extended: false})

module.exports = (app) => {

    app.get('/todo', (req, res) => {
        //get data from mongoDB and pass it to the view
        Todo.find({}, (err, data) => {
            if(err) throw err;
            res.render('todo', {todos: data})
        })
    })

    app.post('/todo', urlencodedParser,  (req, res) => {
        //get data from view and pass it to MongoDB
        let newTodo = Todo(req.body).save( (err, data) => {
            if (err) throw err;
            res.json(data)
        })
    })

    app.delete('/todo/:item', (req, res) => {
        console.log('delete detected')
        //delete requested item from MongoDB
        Todo.find({item: req.params.item}).deleteOne( (err, data) => {
            if(err) throw err;
            res.json(data)
        })
    })

}