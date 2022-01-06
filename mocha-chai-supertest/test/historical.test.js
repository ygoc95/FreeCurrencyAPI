require('dotenv').config();
const baseUrl = process.env.BASE_URL;
const request = require("supertest")(baseUrl);
const expect = require("chai").expect;
const route = "/historical"


describe("GET /historical", function () {
    it("returns historical fx rates ", async function () {
      const response = await request.get(route).query({ apikey: process.env.API_KEY});
  
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an('object')
      expect(response.body).to.deep.nested.property('query.base_currency')
      expect(response.body).to.have.property('data')
    });
  });

describe("GET /historical with specific dates", function () {
  it("returns historical fx rates with specific dates", async function () {
    const response = await request.get(route).query({ apikey: process.env.API_KEY,date_from:process.env.DATE_FROM,date_to:process.env.DATE_TO });

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object')
    expect(response.body).to.deep.nested.property('query.base_currency')
    expect(response.body).to.deep.nested.property('query.date_from').to.deep.equal(process.env.DATE_FROM)
    expect(response.body).to.deep.nested.property('query.date_to').to.deep.equal(process.env.DATE_TO)
    expect(response.body).to.have.property('data')
  });
});

describe("GET /historical  with specific dates and with specific base", function () {
  it("returns historical fx rates with specific dates and with specific base", async function () {
    const response = await request.get(route).query({ apikey: process.env.API_KEY ,base_currency:process.env.BASE_CURRENCY,date_from:process.env.DATE_FROM,date_to:process.env.DATE_TO });

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object')
    expect(response.body).to.deep.nested.property('query.base_currency').to.deep.equal(process.env.BASE_CURRENCY)
    expect(response.body).to.deep.nested.property('query.date_from').to.deep.equal(process.env.DATE_FROM)
    expect(response.body).to.deep.nested.property('query.date_to').to.deep.equal(process.env.DATE_TO)
    expect(response.body).to.have.property('data')
  });
});