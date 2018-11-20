const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const Person = require('./models/person')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))

app.get("/", (req,res) => {
  res.send("ain't nothing here")
})

app.get("/api/persons", (req, res) => {
  Person.find({}).then(people =>
    people.map(Person.format)).then(people => res.json(people))
  })

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(Person.format).then(data => res.json(data))
    .catch(err => {
      console.log(err)
      res.status(404).end()
    })
})


app.get("/info", (req, res) => {
  Person.find({}).then(data =>
    res.send(`<p>puhelinluettelossa ${data.length} ihmisen tiedot</p>
    <p>${new Date()}</p>`))
})

app.delete("/api/persons/:id", (req, res) => {
  Person.findOneAndDelete({
    _id: req.params.id
  })
  .then(() => res.status(204).end())
})

app.post("/api/persons", (req, res) => {
  const body = req.body
  const name = body.name
  const num = body.number
  if(name === undefined || num === undefined) {
    return res.status(400).json({error: "content missing"})
  }

  Person.find({}).then(people => people.map(Person.format))
    .then(people => {
      if(people.some(person => person.name === name)){
        return res.status(400).json({
          error: 'name must be unique'
        })
      }
      const person = new Person({
        name: name,
        number: num
      })
      person.save().then(Person.format).then(person => res.json(person))
        .catch(error => console.log(error))
    })
})

app.put('/api/persons/:id', (req, res) => {
  Person.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(Person.format).then(person => res.json(person))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
