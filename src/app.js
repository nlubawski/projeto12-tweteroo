import express from "express"
import cors from "cors"

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

const users = [
  {
    username: 'bobesponja',
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
  },
    {
    username: 'lubawski',
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
  },
    {
    username: 'nathan',
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
  },
]
const tweets = [
  {
    username: "bobesponja",
    tweet: "eu amo o hub"
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub"
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub"
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub"
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub"
  }, {
    username: "bobesponja",
    tweet: "eu amo o hub"
  }, {
    username: "bobesponja",
    tweet: "eu amo o hub"
  }, {
    username: "lubawski",
    tweet: "eu amo o cccccccccc"
  }, {
    username: "nathan",
    tweet: "xxxxxxxxx"
  }, {
    username: "08300442995",
    tweet: "eu amo o gggghub"
  }, {
    username: "bobesponja",
    tweet: "eu amo o hub"
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub"
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub"
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub"
  },
]


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
    console.log(lastTweet.username)
    const user = users.find(u => u.username === lastTweet.username)
    if (user) {
      dataTweets.push({ ...user, ...lastTweet })
    }
  })
  console.log("data", dataTweets)
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