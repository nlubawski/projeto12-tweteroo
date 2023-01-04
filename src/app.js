import express from "express"
import cors  from "cors"

const app = express()
const port = 5000

app.use(cors())

app.post('/sign-up',(req,res) => {
  users.push({username, avatar})
  res.send(200)
})

app.get('/', (req, res) => {
  res.send('Hello')
})

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