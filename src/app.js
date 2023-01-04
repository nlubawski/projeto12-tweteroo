import express from "express"
import cors from "cors"
import {users, tweets} from "./data.js"
  
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())




app.post('/sign-up', (req, res) => {
  const { avatar, username } = req.body
  users.push({ username, avatar })
  res.sendStatus(200)
})

app.get('/tweets', (req, res) => {
  const lengthTweets = tweets.length;
  let lastTweets;
  if (lengthTweets <= 10) {
    lastTweets = tweets.slice()
  } else {
    lastTweets = tweets.slice(lengthTweets - 10)
  }
  const dataTweets = []
  lastTweets.forEach(lastTweet => {
    const user = users.find(u => u.username === lastTweet.username)
    if (user) {
      dataTweets.push({ ...user, ...lastTweet })
    }
  })
  res.send(dataTweets.reverse())
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