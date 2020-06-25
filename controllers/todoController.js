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

let todoOne = Todo({
    item: 'buy milk'
}).save((err) => {
    if (err) throw err;
    console.log('item saved')
})

let data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'Play wow'}]
let urlencodedParser = bodyParser.urlencoded({ extended: false})

module.exports = (app) => {

    app.get('/todo', (req, res) => {
        res.render('todo', {todos: data})
    })

    app.post('/todo', urlencodedParser,  (req, res) => {
        data.push(req.body)
        console.log('ELEMENT ADDED CONTROL')
        res.json(data)
    })

    app.delete('/todo/:item', (req, res) => {
        
        data = data.filter((todo) => {
            
            return todo.item.replace(/ /g, "-") !== req.params.item
        })
        
        console.log(data)
        res.json({todos: data})
        
    })

}