import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import config from './config'
import { checkRoundResult, checkTicket, generateTicket } from './handler/ticketHandler'
import { stopDraw } from './handler/drawHandler'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = config.PORT

app.get('/ticket/new', generateTicket)

app.get('/result/round/:round', checkRoundResult)

app.post('/ticket/check', checkTicket)

app.delete('/stop', stopDraw)


app.listen(port, () => {
  console.log(`Now listening on port ${port}`)
})