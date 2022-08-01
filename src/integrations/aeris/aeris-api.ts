import axios, { AxiosResponse } from 'axios'
import moment from 'moment'
import { AERIS_WEATHER_API_RESPONSE } from './interfaces'

export const getPredictions = async (location: string) => {
  try {
    const { data }: AxiosResponse<AERIS_WEATHER_API_RESPONSE> = await axios({
      method: 'GET',
      url: `${process.env.AERIS_WEATHER_API_URL}/${encodeURI(location)}`,
      params: {
        to: moment().format(),
        from: moment().add(14, 'days').format(),
      },
      headers: {
        ['X-RapidAPI-Host']: process.env.AERIS_WEATHER_API_HOST || '',
      },
    })
    if (!data.success) throw new Error('Failed to fetch data from aeris api')
    if (data.response.length === 0) throw new Error('No data provided by aeris api')
    const _data = data.response[0]
    return { periods: _data.periods, coords: _data.loc }
  } catch (e) {
    throw e
  }
}
