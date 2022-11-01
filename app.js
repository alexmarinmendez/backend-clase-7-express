const express = require('express')
const frase = 'Hola mundo cómo están'
const app = express()

const server = app.listen(8080, () =>  console.log('Server up!'))

app.get('/api/frase', (req, res) => {
    res.send({frase})
})

app.get('/api/letras/:num', (req, res) => {
    let { num } = req.params
    if ((num > frase.length) || num <= 0) return res.status(400).send({err: "Out of bound!"})
    if (isNaN(num)) return res.send({err: 'Not a number!'})
    res.send({letra: frase[num-1]})
})

app.get('/api/palabras/:num', (req, res) => {
    let array = frase.split(" ") // => ["Hola", "mundo", "cómo", "están"]
    let { num } = req.params
    if ((num > array.length) || num <= 0) return res.send({err: "Out of bound!"})
    if (isNaN(num)) return res.send({err: 'Not a number!'})
    res.send({palabra: array[num-1]})
})