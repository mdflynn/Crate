import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import models from '../../../setup/models';
import schema from '../../../setup/schema';
import * as mockData from '../../mocks/index'

describe("user mutations", () => {
  let server;

  beforeAll(() => {
    server = express(); //sets up the server

    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    );
  });

  //Creates our users via the imported mocks/index file
  // beforeAll(async () => {
  //   await models.User.create(mockData.userData1);
  //   await models.User.create(mockData.userData2);
  // });

  //deletes all users
  afterAll(async () => {
    await models.User.destroy({ where: {} })
    server.close();
  });

    it("throws error if not a logged in user", async () => {
      const response = await request(server)
      .post('/')
      .send({ query: 'mutation { userUpdate(city: "Kenai", state: "Alaska"){ name image email description streetAddress city state zip country }}'})
      .expect(400)

      expect(response).toThrow('Please login to update information.')
      // expect(response.body.data.userUpdate.name).toEqual('The User')
      // expect(response.body.data.userUpdate.image).toEqual('https://ichef.bbci.co.uk/news/976/cpsprodpb/CFE3/production/_108391235_nessie.jpg')
      // expect(response.body.data.userUpdate.email).toEqual('user@crate.com')
      // expect(response.body.data.userUpdate.description).toEqual('Nessie')
      // expect(response.body.data.userUpdate.streetAddress).toEqual('987 User St')
      // expect(response.body.data.userUpdate.city).toEqual('Kenai')
      // expect(response.body.data.userUpdate.state).toEqual('Alaska')
      // expect(response.body.data.userUpdate.zip).toEqual('80123')
      // expect(response.body.data.userUpdate.country).toEqual('USA')
    });
  });
