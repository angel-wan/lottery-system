import {Request, Response} from 'express'
import { stopDrawService } from '../draw/draw'

export const stopDraw = async (req: Request, res: Response) => {
    stopDrawService()
    return res.status(200).send('Draw is stopped')
}