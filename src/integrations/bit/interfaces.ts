export interface BIT_WEATHER_API_REQUEST_OPTS {
  lat: string | number
  lon: string | number
}

export interface BIT_LOCATION_DATA {
  pop: number
  wind_cdir: string
  pres: number
  high_temp: number
  ts: number
  clouds: number
  snow: number
  snow_depth: number
  wind_spd: number
}

export interface BIT_WEATHER_API_RESPONSE {
  data: BIT_LOCATION_DATA[]
  country_code: string
  city_name: string
  state_code: string
  lon: number | string
  lat: number | string
  timezone: string
}

export interface BIT_WEATHER_API_ALERTS_RESPONSE {
  alerts: []
  country_code: string
  city_name: string
  state_code: string
  lon: number | string
  lat: number | string
  timezone: string
}
