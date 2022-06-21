import { response } from 'express'
import schedule from 'node-schedule'
import config from '../config'
import { createDrawRound, getLatestDraw, updateDraw } from '../db/draw'

/**
 * scheudle run for draw
 */
schedule.scheduleJob(`*/${config.DRAW_PERIOD_MINUTE} * * * *`, async () => {
  // update latest draw round
  const latestRound = await getLatestDraw()
  if (latestRound > 0) console.log(`Draw round ${latestRound} is started!`)
  const result = draw(config.NUMBER_RANGE_MIN, config.NUMBER_RANGE_MAX)
  if (latestRound > 0) await updateDraw(result, latestRound)
  console.log(`Draw result for round ${latestRound}: ${result}`)

  // create new draw round
  await createDrawRound(latestRound+1)
  console.log(`A new draw round ${latestRound+1} is started!`)
})

/**
 * 
 * @param min minimum number for draw
 * @param max maximum number for draw
 * @returns random number of draw
 */
export const draw = (min: number, max: number) => {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

/**
 * stop schedule run of draw
 */
export const stopDrawService = () => {
  schedule.gracefulShutdown()
}

