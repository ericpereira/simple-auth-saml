import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import passport from './middleware/passportHandler'
import router from './router'
import session from 'express-session'
import bodyParser from 'body-parser'

const app = express()
app.use(cors())

app.use(session({
  secret: process.env.SESSION_SECRET || 'PATTERN',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());



//passport
app.use(passport.initialize())
app.use(passport.session())

app.use(router)

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'eae men kk' })
})


app.listen(3333)