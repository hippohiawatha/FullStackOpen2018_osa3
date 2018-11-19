const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  },
  {
    "name": "leo",
    "number": "1",
    "id": 8
  },
  {
    "name": "jutta ",
    "number": "2",
    "id": 10
  }
]

app.use(bodyParser.json())
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))

app.get("/", (req,res) => {
  res.send("ain't nothing here")
})

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if(person) res.json(person)
  else res.status(404).end()
})

app.get("/info", (req, res) => {
  const amount = persons.length
  res.send(`<p>puhelinluettelossa ${amount} ihmisen tiedot</p>
    <p>${new Date()}</p>`)
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post("/api/persons", (req, res) => {
  const body = req.body
  const name = body.name
  const num = body.number
  if(name === undefined || num === undefined) {
    return res.status(400).json({error: "content missing"})
  }

  else if(persons.find(person => person.name === name)){
    return res.status(400).json({error: "name must be unique"})
  }

  const person = {
    name: name,
    number: num,
    id: Math.floor(Math.random() * 1001)
  }

  persons = persons.concat(person)
  res.json(persons)
})

const port = process.env.port || 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
