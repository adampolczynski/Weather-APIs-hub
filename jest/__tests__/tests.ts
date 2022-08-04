import request from 'supertest'
import app from '../../src/server'

const API_KEY = process.env.RAPID_API_KEY
const URL = process.env.LOCATION

// @TODO throw away supertest (problems with connetion)
// and use simple fetch
// @TODO modularize
// @TODO more typing, but does it makes more sense than strict front-end typing?
// @TODO validate response data with common interfaces
describe('Testing main app module', () => {
  describe(`Tests for GET ${URL} endpoint of an app`, () => {
    test(`GET ${URL}`, (done) => {
      request(app)
        .get(`${URL}`)
        .set('X-RapidAPI-Key', API_KEY)
        .expect(200)
        .expect((res) => {
          console.log(Object.keys(res.body))
          console.log(res.body?.aeris?.length || '\n\n no response from aeris while testing? oh no, lets log it!\n\n')
        })
        .end((err, res) => {
          if (err) return done(err)
          return done()
        })
    })
  })
})
