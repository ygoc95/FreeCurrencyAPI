require('dotenv').config();
const baseUrl = process.env.BASE_URL;
const request = require("supertest")(baseUrl);
const expect = require("chai").expect;
const route = "/latest"

describe("GET /latest", function () {
  it("returns latest fx rates", async function () {
    const response = await request.get(route).query({ apikey: process.env.API_KEY });

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object')
    expect(response.body).to.deep.nested.property('query.base_currency')
    expect(response.body).to.have.property('data')
  });
});

describe("GET /latest with specific base", function () {
  it("returns latest fx rates with specific base", async function () {
    const response = await request.get(route).query({ apikey: process.env.API_KEY ,base_currency:process.env.BASE_CURRENCY});

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object')
    expect(response.body).to.deep.nested.property('query.base_currency').to.deep.equal(process.env.BASE_CURRENCY)
    expect(response.body).to.have.property('data')
  });
});