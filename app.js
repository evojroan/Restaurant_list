// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const restaurantsData = require("./restaurant.json").results

// require handlebars in the project
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurantsData })
})

//show
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantsData.find(
    data => data.id.toString() === req.params.id
  )
  res.render('show', { restaurant })
})

// Search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurant = restaurantsData.filter(data => {
    return data.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurantsData: restaurant, keywordList: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

//Setting static files
app.use(express.static('public'))