/* eslint-env mocha, chai */

const {expect} = require('chai')
const request = require('supertest');
const app = require('../server/app');
const agent = request.agent(app);
const {db} = require('../server/models');

describe('Routes', () => {
  describe('/pugs', () => {
    describe('GET /pugs', () => {})
    describe('GET /pugs/:pugId', () => {})
    describe('POST /pugs', () => {})
    describe('PUT /pugs/:pugId', () => {})
    describe('DELETE /pugs/:pugId', () => {})
  })

  describe('/coffee', () => {
    describe('GET /coffee', () => {})
    describe('GET /coffee/:coffeeId', () => {})
    describe('GET /coffee/:coffeeId/pugs', () => {})
    describe('POST /coffee', () => {})
    describe('PUT /coffee/:coffeeId', () => {})
    describe('DELETE /coffee/:coffeeId', () => {})
  })
})
