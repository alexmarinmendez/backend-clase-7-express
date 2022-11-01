const express = require('express')
let frase = 'Frase inicial'
const app = express()

const server = app.listen(8080, () =>  console.log('Server up!'))

//middleware!! que sirve para recibir info en formato JSON
app.use(express.json())

app.get('/api/frase', (req, res) => {
    res.send({frase})
})

app.get('/api/palabras/:pos', (req, res) => {
    let array = frase.split(" ")
    let { pos } = req.params
    if ((pos > array.length) || pos <= 0) return res.send({err: "Out of bound!"})
    if (isNaN(pos)) return res.send({err: 'Not a number!'})
    res.send({buscada: array[pos-1]})
})

app.post('/api/palabras', (req, res) => {
    let { palabra } = req.body
    frase = frase.concat(` ${palabra}`)
    res.send({frase})
})

app.put('/api/palabras/:pos', (req, res) => {
    let { palabra } = req.body
    let { pos } = req.params
    let array = frase.split(" ")
    let anterior = array[pos-1]
    array[pos-1] = palabra
    frase = array.join(' ')
    res.send({actualizada: palabra, anterior})
})

app.delete('/api/palabras/:pos', (req, res) => {
    let { pos } = req.params
    let array = frase.split(" ")
    array.splice(pos-1, 1)
    frase = array.join(' ')
    res.send({frase})
})