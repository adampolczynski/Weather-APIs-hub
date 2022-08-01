declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'

      PORT: string

      RAPID_API_KEY: string

      VC_WEATHER_API_URL: string
      VC_WEATHER_API_HOST: string

      AERIS_WEATHER_API_URL: string
      AERIS_WEATHER_API_HOST: string

      BIT_WEATHER_API_URL: string
      BIT_WEATHER_API_ALERTS_URL: string
      BIT_WEATHER_API_HOST: string
    }
  }
}

export {}
