import request from 'supertest';
import express from 'express';
import bcrypt from "bcrypt";
import graphqlHTTP from 'express-graphql';

// graphql middleware setup
import schema from '../../../setup/schema';
import models from '../../../setup/models';
import serverConfig from "../../../config/server.json";
import authentication from "../../../setup/authentication";

//mock data
import * as mockData from '../../mocks/index'


describe("user-- resolver update", () => {

    let server;
    let token;
    let admin1;
    let user1;

    beforeAll(async () => {

      admin1 = await models.User.create(mockData.userData1);
      user1 = await models.User.create(mockData.userData2);

      server = express();
      server.use(authentication);
      server.use(
          '/',
          graphqlHTTP({
              schema,
              graphiql: false,
              context: {
                  auth: {
                      user: user1
                  }
              }
          })
      );

      //log in & set up auth
      const response = await request(server)
          .post('/')
          .send({ query: '{ userLogin(email: "user@crate.com", password: "123456890") { token }}'})
          .expect(200)

      token = response.body.data.userLogin.token
    })

    afterAll(async ()=>{
        await models.User.destroy({ where: {} })
    })

    it("throws error if not a logged in user", async(done) => {
      const response = await request(server)
      .post('/')
      .send({ query: 'mutation { userUpdate(city: "Kenai", state: "Alaska"){ name image email description streetAddress city state zip country }}'})
      .expect(200)

      expect(response.body.errors[0].message).toEqual('Please login to update information.')
      done();
    });
  });
