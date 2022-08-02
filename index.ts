import 'dotenv/config'

import moment from 'moment'
moment.defaultFormat = 'YYYY-MM-DD'

import axios from 'axios'
axios.defaults.headers.common = {
  ['X-RapidAPI-Key']: process.env.RAPID_API_KEY || '',
}

import app from './src/server'
export default app
