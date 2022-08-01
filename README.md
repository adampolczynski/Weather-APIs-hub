# RapidApi Weather APIs hub

Made to provide weather forecast for next 16 days from multiple API's with one call

## Configuration and running

1. install dependencies with `yarn`
2. copy `.env.dist` and rename so you have your own `.env`
3. provide `RAPID_API_KEY` in `.env`
4. run `yarn run dev`
5. access through browser - `localhost:8000/predictions/Warsaw,PL`

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

Written in comments, marked with `@TODO`

## What we can with this

Now we can play with data from different providers for example counting average temperate and humidity
