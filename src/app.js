import express, { query } from "express"
import cors from "cors"
import { users, tweets } from "./data.js"

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.post('/sign-up', (req, res) => {
  const { avatar, username } = req.body
  if (avatar === "" || username === "") {
    res.status(400).send("Todos os campos são obrigatórios!")
  }
  users.push({ username, avatar })
  res.sendStatus(200)
})

app.get('/tweets', (req, res) => {
  const page = req.query.page;
  const tweetsCopy = tweets.slice().reverse();
  let lastTweets;
  // console.log("pagina",page)
  if (page) {
    // console.log("to aqui na paginacao")
    if (page < 1) {
      res.status(400).send("Informe uma página válida!")
    }
    lastTweets = tweetsCopy.slice((page - 1) * 10, (page - 1) * 10 + 10)
    // console.log("page", page)
    // console.log("inicio", (page - 1) * 10)
    // console.log("fim",(page - 1) * 10 + 10)
  } else {
    const lengthTweets = tweetsCopy.length;
    lastTweets;
    if (lengthTweets <= 10) {
      lastTweets = tweets.slice()
    } else {
      console.log(tweetsCopy)
      lastTweets = tweetsCopy.slice(0,10)
    }
  }
  const dataTweets = []
  lastTweets.forEach(lastTweet => {
    const user = users.find(u => u.username === lastTweet.username)
    if (user) {
      dataTweets.push({ ...user, ...lastTweet })
    }
  })
  res.send(dataTweets)
})

app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body
  const found = users.find(user => user.username === username)
  if (!found) {
    res.sendStatus(401)
  }
  else {
    tweets.push({ username, tweet })
    res.sendStatus(200)
  }
})

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`)
})