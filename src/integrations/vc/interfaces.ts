export interface VC_WEATHER_API_REQUEST_OPTS {
  location: string
  aggregateHours: string | number
  shortColumnNames?: boolean
  unitGroup?: 'us' | 'uk' | 'metric'
  contentType?: 'csv' | 'json'
}

export interface VC_WEATHER_API_RESPONSE_COLUMN {
  id: string
  name: string
  type: number
  unit?: string
}

// enum VC_WEATHER_API_COLUMNS {
//   conditions,
//   cloudcover,
//   "pop",
//   "mint",
//   "datetime",
//   "precip",
//   "solarradiation",
//   "dew",
//   "humidity",
//   "temp",
//   "maxt",
//   "visibility",
//   "heatindex",
//   "snow",
//   "snowdepth",
// }

export interface VC_LOCATION_DATA {
  conditions: string
  cloudcover: number
  pop: number
  mint: number
  datetime: number
  precip: number
  solarradiation: number
  dew: number
  humidity: number
  temp: number
  maxt: number
  visibility: number
  heatindex: number
  snow: number
  snowdepth: number
}

export interface VC_WEATHER_API_RESPONSE {
  columns: {
    [key: string]: VC_WEATHER_API_RESPONSE_COLUMN
  }
  remainingCost: number
  queryCost: number
  messages?: unknown
  locations: {
    [key: string]: {
      stationContributions?: unknown
      values: VC_LOCATION_DATA[]
      id: string
      address: string
      name: string
      index: number
      latitude: number
      longitude: number
      distance: number
      time: number
      tz: string
      currentConditions: {}
      alerts?: unknown
    }
  }
}
