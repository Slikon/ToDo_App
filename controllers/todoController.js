let bodyParser = require('body-parser')
const e = require('express')

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