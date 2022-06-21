const db = require('./connection')

/**
 * 
 * @param round draw round number
 * @returns information of draw round
 */
export const getDraw = async (round: number): Promise<draw> => {
    const {rows} = await db.query(
        `SELECT * FROM draw
        WHERE round = $1`,
        [round]
    )
    return rows[0]
}

/**
 * 
 * @returns current latest round
 */
export const getLatestDraw = async () => {
    const {rows} = await db.query(
        `SELECT MAX(round) FROM draw`
    )
    return rows[0]?.max
}

/**
 * 
 * @param round draw round number
 * @returns result of draw create
 */
export const createDrawRound =async (round: number) => {
   return await db.query(
        `INSERT INTO draw(round) 
        VALUES ($1)`,
        [round]
    )
}

/**
 * 
 * @param result drawn result of draw round
 * @param round draw round number
 * @returns result of draw update
 */
export const updateDraw = async (result: number, round: string) => {
    return await db.query(
        `UPDATE draw SET drawn_result = $1
        WHERE round = $2`,
        [result, round]
    )
}

export interface draw {
    draw_id: string
    round: number,
    drawn_result: number,
    created_date: string
}