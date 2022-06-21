require('dotenv').config({ path: '../.env'})
const env = process.env;

export default {
    PORT: env.PORT || 5000,
    DRAW_PERIOD_MINUTE: Number(env.DRAW_PERIOD_MINUTE) || 60,
    NUMBER_RANGE_MIN: Number(env.NUMBER_RANGE_MIN) || 1,
    NUMBER_RANGE_MAX: Number(env.NUMBER_RANGE_MAX) || 50,

    DB:{
        RDS_HOSTNAME: env.RDS_HOSTNAME,
        RDS_PORT: env.RDS_PORT,
        RDS_DB_NAME: env.RDS_DB_NAME,
        RDS_USERNAME: env.RDS_USERNAME,
        RDS_PASSWORD: env.RDS_PASSWORD,
    }
}