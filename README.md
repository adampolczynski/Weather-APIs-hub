# RapidApi Weather APIs hub

Made to provide weather forecast for next 16 days from multiple API's with one call

Providers integrated:

- `https://rapidapi.com/visual-crossing-corporation-visual-crossing-corporation-default/api/visual-crossing-weather/`,
- `https://rapidapi.com/weatherbit/api/weather`,
- `https://rapidapi.com/aerisweather-aerisweather/api/aerisweather1`,

## Configuration and running

0. install `ts-node` globally
1. install dependencies with `yarn` or `npm` - whatever
2. copy `.env.dist` and rename so you have your own `.env`
3. provide `RAPID_API_KEY` in `.env` (!!! you have to subscribe to each project for the key to work, links are provided above),
4. run app with `yarn run dev` or `npm run dev`
5. access through browser - `localhost:8000/predictions/Warsaw,PL`

## Testing

- run tests with `jest` - in root project directory,

- for testing purposes we use `jest` and `supertest`, with `ts-jest` to support `typescript`,

- !!! remember to have your own `RapidApi` key provided in `__tests__/env.ts` file, `i know it is redundant to have two file properties with the same value :/`, but it's just my 'hello world' into testing, so keeping it up :) otherwise tests will fail,

- main endpoint is checked for returned properties, there is only one param provided for GET call - `location` and by default it is `Cancun,Mexico` cause it is `very nice`,

Run tests with `jest` command in project dir, remember to have `jest` available in your shell

## Flow description

While doing a `/predictions/:location` call we're at first validating param `location` provided with `GET` request:

- it cannot contain spaces (also URI encoded),
- length has to be between 5-30,
- `,` sign must have place (because of one of providers) (to secure from multiple commas)

In API integrations after fetching data we're checking for available fields and status (if provided)

Data (array) per time interval (daily) is fetched from each provider for another 16 days, nextly array is parsed into object with date as a key

Finally return somthing of structure like below, when string is passed as a response it means it is error description

```
type ResponseData =
  | {
      vs: ResponsePeriodsValues
      aeris: ResponsePeriodsValues
      bit: ResponsePeriodsValues
    }
  | string
```

## Technically to do at first

Creating abstraction for responses - interfaces, generic ones, types, others written in comments, marked with `@TODO`

## What we can with this

Now we can play with data from different providers for example counting average temperate and humidity
