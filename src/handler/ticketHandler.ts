import {Request, Response} from 'express'
import config from '../config'
import { getDraw, getLatestDraw } from '../db/draw'
import { createTicket, getTicket } from '../db/ticket'
import { draw } from '../draw/draw'

export const checkRoundResult = async (req: Request, res: Response) => {
    const { round } = req.params

    const latestRound = await getLatestDraw()
    if (latestRound < round ) return res.status(404).send(`round ${round} has not started yet`)
    const { drawn_result } = await getDraw(Number(round))

    return res.status(200).send(`Round ${round} result: ${drawn_result}`)
}

export const generateTicket = async (req: Request, res: Response) => {
    const newNumber = draw(config.NUMBER_RANGE_MIN, config.NUMBER_RANGE_MAX)

    const latestRound = await getLatestDraw()
    const { draw_id } = await getDraw(latestRound)
    const { ticket_id } = await createTicket(draw_id, newNumber)

    return res.status(200).send(`Ticket for round ${latestRound}: ${newNumber} (ID: ${ticket_id})`)
}

export const checkTicket = async (req: Request, res: Response) => {
    const { round, ticketId } = req.body

    const drawInfo  = await getDraw(round)
    if (!drawInfo) return res.status(404).send(`round ${round} is not found`)
    const drawId = drawInfo.draw_id
    const drawnResult = drawInfo.drawn_result

    const pickedNumber = (await getTicket(drawId, ticketId))?.picked_number
    if (!pickedNumber) return res.status(404).send(`ticketId is not found`)
    
    return res.status(200).send(`Round ${round} result: 
    ${
        drawnResult === pickedNumber? 
        'congratulations!! You got the prize.' : 'Good luck next time'
    }`)
}