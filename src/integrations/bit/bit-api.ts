import axios, { AxiosResponse } from 'axios'
import { BIT_WEATHER_API_ALERTS_RESPONSE, BIT_WEATHER_API_RESPONSE } from './interfaces'

const headers = {
  ['X-RapidAPI-Host']: process.env.BIT_WEATHER_API_HOST || '',
}

type INTERVAL = '3hourly' | 'daily'
const DEFAULT_INTERVAL: INTERVAL = 'daily' // @TODO combine with other apis intervals

type COORDINATES = { lat: string | number; long: string | number }

// @TODO make it possible for all integrations to use both coords and strings
export const getPredictions = async (location: string, coords: COORDINATES) => {
  try {
    const { data }: AxiosResponse<BIT_WEATHER_API_RESPONSE> = await axios({
      method: 'GET',
      url: `${process.env.BIT_WEATHER_API_URL || ''}/${DEFAULT_INTERVAL}`,
      params: {
        lat: coords.lat,
        lon: coords.long,
      },
      headers,
    })
    if (!data.data || data.data.length === 0) throw new Error('No data provided by bit api')
    return { periods: data.data }
  } catch (e) {
    throw e
  }
}

export const getAlerts = async (location: string) => {
  try {
    const { data }: AxiosResponse<BIT_WEATHER_API_ALERTS_RESPONSE> = await axios({
      method: 'GET',
      url: `${process.env.BIT_WEATHER_API_ALERTS_URL || ''}/${DEFAULT_INTERVAL}`,
      headers,
    })
    return data
  } catch (e) {
    throw e
  }
}
