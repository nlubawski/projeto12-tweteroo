import express from "express"
import cors  from "cors"

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.post('/sign-up',(req,res) => {
  const {avatar, username} = req.body
  users.push({username, avatar})
  res.sendStatus(200)
})

app.get('/tweets', (req, res) => {
  res.send(test)
})

const test = [{
    username: 'bobesponja',
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub"

  }]
const users = [
  {
    username: 'bobesponja',
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
  },
]

const tweets = [
  {
    username: "bobesponja",
    tweet: "eu amo o hub"
  }
]


app.listen(port, () => {
  console.log(`Rodando na porta ${port}`)
})