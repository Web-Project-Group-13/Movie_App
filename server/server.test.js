import app from '../index.js';
const request = require('supertest');

const base_url = 'http://localhost:3000'


describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })
  
  
  

//kirjautumisen testaus
describe('POST register',() => {
    const email = 'testi@kayttaja.com'
    const password = 'Testi123'
    it ('should register with valid email and password and return 201',async() => {
        const response = await request(app).post(base_url + '/register',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({'email':email,'password':password})
        })
        const data = await response.json()
        expect(response.status).to.equal(201,data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id','email')
    })
})