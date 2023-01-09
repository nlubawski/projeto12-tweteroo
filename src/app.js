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
  if (typeof username !== "string" || typeof avatar === "undefined" || typeof avatar !== "string") {
    res.sendStatus(400)
  }
  users.push({ username, avatar })
  res.sendStatus(201)
})

app.get('/tweets', (req, res) => {
  const page = req.query.page;
  const tweetsCopy = tweets.slice().reverse();
  let lastTweets;
  if (page) {
    if (page < 1) {
      res.status(400).send("Informe uma página válida!")
    }
    lastTweets = tweetsCopy.slice((page - 1) * 10, (page - 1) * 10 + 10)

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

app.get('/tweets/:username', (req, res) => {
  const user = req.params.username
  const userdata = users.find(item => {
    return item.username === user
  })
  if(userdata){
    const tweetsData = tweets.filter(item => item.username === user)
    const tweetsFull = []
    tweetsData.forEach(item => {
      tweetsFull.push({avatar:userdata.avatar, tweet: item.tweet, username: item.username})
    })
    console.log("to aqui", tweetsFull)
    res.send(tweetsFull)
  }
  res.send([])

})

app.post('/tweets', (req, res) => {
  const username = req.headers.user
  const { tweet } = req.body
  if(typeof tweet === 'undefined' || tweet === '' || typeof tweet !== 'string' ){
    res.sendStatus(400)
  }
  const found = users.find(user => user.username === username)
  if (!found) {
    res.sendStatus(401)
  }
  else {
    tweets.push({ username, tweet })
    res.sendStatus(201)
  }
})

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`)
})