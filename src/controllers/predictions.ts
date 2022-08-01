import express, { Request, Response } from 'express'
import { VCIntegration, AerisIntegration, BitIntegration } from '../integrations'
import { param, validationResult } from 'express-validator'
import { AERIS_LOCATION_DATA } from '../integrations/aeris/interfaces'
import { VC_LOCATION_DATA } from '../integrations/vc/interfaces'
import { BIT_LOCATION_DATA } from '../integrations/bit/interfaces'
import moment from 'moment'

const router = express.Router()

// single value - optional properties that exists in providers data per time interval
// @TODO do it the cleaner way
interface ISingleValue extends AERIS_LOCATION_DATA, VC_LOCATION_DATA, BIT_LOCATION_DATA {}
type SingleValue = Partial<ISingleValue>

// output (response) structure
// @TODO do it the cleaner way, specify key possibilities
type ResponsePeriodsValues = {
  [key: string]: SingleValue
}
type ResponseData =
  | {
      vs: ResponsePeriodsValues
      aeris: ResponsePeriodsValues
      bit: ResponsePeriodsValues
    }
  | string

// @TODO seperate
const mapPeriodsKeysToDate = (periods: AERIS_LOCATION_DATA[] | VC_LOCATION_DATA[] | BIT_LOCATION_DATA[]) => {
  return (periods as SingleValue[]).reduce((map: { [key: string]: SingleValue }, p) => {
    map[moment(p.validTime || p.timestamp || p.datetime || p.ts).format()] = p
    return map
  }, {})
}

router.get(
  '/:location',
  [
    param('location')
      .isString()
      .isLength({ min: 5, max: 30 })
      .withMessage('Too short or too long location name')
      .custom((value, { req }) => {
        if (value.includes(' ')) {
          throw new Error('Location cannot contain spaces')
        }
        if (!value.includes(',')) {
          throw new Error('Provide location as two strings seperated with ","')
        }
        return true
      }),
  ],
  async (req: Request, res: Response<ResponseData>) => {
    try {
      const errors = validationResult(req).array({ onlyFirstError: true })
      if (errors && errors.length !== 0) throw new Error(`Validation error for ${errors[0].param}: [${errors[0].msg}]`)

      const { location } = req.params

      const { periods: aerisWeatherForecastData, coords } = await AerisIntegration.getPredictions(location)
      const { periods: vsWeatherForecastData } = await VCIntegration.getPredictions(location)
      const { periods: bitWeatherForecastData } = await BitIntegration.getPredictions(location, coords)

      res.json({
        vs: mapPeriodsKeysToDate(vsWeatherForecastData),
        aeris: mapPeriodsKeysToDate(aerisWeatherForecastData),
        bit: mapPeriodsKeysToDate(bitWeatherForecastData),
      })
    } catch (e) {
      res.send(`An error has occured (${e instanceof Error ? e.message : e})`)
    }
  }
)

export { router as predictionsController }
