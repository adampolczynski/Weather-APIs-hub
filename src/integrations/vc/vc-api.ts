import axios, { AxiosResponse } from 'axios'
import { VC_WEATHER_API_REQUEST_OPTS, VC_WEATHER_API_RESPONSE } from './interfaces'

const DEFAULT_AGGREGATE_HOURS = 24

export const getPredictions = async (location: string) => {
  try {
    const { data }: AxiosResponse<VC_WEATHER_API_RESPONSE> = await axios({
      method: 'GET',
      url: process.env.VC_WEATHER_API_URL || '',
      params: {
        location,
        aggregateHours: DEFAULT_AGGREGATE_HOURS,
        unitGroup: 'metric',
        contentType: 'json',
      } as VC_WEATHER_API_REQUEST_OPTS,
      headers: {
        ['X-RapidAPI-Host']: process.env.VC_WEATHER_API_HOST || '',
      },
    })
    if (!data.locations || Object.keys(data.locations).length === 0) throw new Error('No data provided by vc api')
    const _data = data.locations[Object.keys(data.locations)[0]]
    return { periods: _data.values }
  } catch (e) {
    throw e
  }
}
