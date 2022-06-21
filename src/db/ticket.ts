const db = require('./connection')

/**
 * 
 * @param draw_id draw id of draw
 * @param number picked number of ticket
 * @returns ticket id of ticket
 */
export const createTicket = async (draw_id: string, number: number) => {
    const {rows} = await db.query(
        `INSERT INTO ticket(draw_id, picked_number) 
        VALUES ($1, $2)
        RETURNING ticket_id`,
        [draw_id, number]
    )
    return rows[0]
}

/**
 * 
 * @param draw_id draw id of draw
 * @param ticket_id ticket id of ticket
 * @returns ticket information
 */
export const getTicket = async (draw_id: string, ticket_id: string):Promise<ticket> => {
    const { rows } = await db.query(
        `SELECT * FROM ticket
        WHERE draw_id = $1 AND ticket_id = $2`,
        [draw_id, ticket_id]
    )
    return rows[0]
}

export interface ticket {
    ticket_id: string,
    draw_id: string,
    picked_number: number,
    created_date: string
}
