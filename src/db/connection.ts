import pg from 'pg'
import config from '../config'
import { Pool } from 'pg'

const pool = new Pool({
  user: config.DB.RDS_USERNAME,
  host: config.DB.RDS_HOSTNAME,
  database: config.DB.RDS_DB_NAME,
  password: config.DB.RDS_PASSWORD,
  port: Number(config.DB.RDS_PORT),
})

module.exports = {
    async query(text: any, params: any) {
        const start = Date.now()
        try {
            const res = await pool.query(text, params)
            // time elapsed since invocation to execution
            const duration = Date.now() - start
            console.log(
              'executed query', 
              {text, duration, rows: res.rowCount}
            )
            return res
        } catch (error) {
            console.log('error in query', {text})
            throw error
        }
    }
}