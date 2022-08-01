export interface AERIS_WEATHER_API_REQUEST_OPTS {
  from?: string //Start date of your forecast period (YYYY-MM-DD).
  to?: string //End date of your forecast interval (YYYY-MM-DD).
  filter?: string //Provide a forecast interval (1hr, 4hr, daynight, mdnt2mdnt, etc.). Default is local 7am - 7pm "day" interval.
  plimit?: string //Limit the number of periods (intervals) returned in your forecast.
}

export interface AERIS_LOCATION_DATA {
  pop: number
  validTime: string
  timestamp: number
  maxTempC: number
  minTempC: number
  avgTempC: number
  avgFeelsLikeC: number
  feelsLikeC: number
  humidity: number
  weather: string // description
  sky: number // aka cloud percentage?
  windSpeedKPH: number
  snowCM: number
  windDir: string
  // many more
}

export interface AERIS_WEATHER_API_RESPONSE {
  success: boolean
  error?: unknown
  response: {
    loc: { long: number; lat: number }
    interval: 'day'
    periods: AERIS_LOCATION_DATA[]
  }[]
  profile: {
    tz: 'string'
    elevM: number
  }
}
