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

describe("user mutations", () => {

  let server;
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
                    user: user1,
                    isAuthenticated: user1 && user1.id > 0
                }
            }
        })
    );
  })

  afterAll(async ()=>{
      await models.User.destroy({ where: {} })
  })

  it("updateUser - can update user profile information", async(done) => {
    let email = 'test email address'
    let description = 'test description'
    const response = await request(server)
      .post('/')
      .send({ query: `mutation { userUpdate(description: "${description}", email: "${email}") {name email image description streetAddress city state zip country }}`})
      .expect(200)

    expect(response.body.data.userUpdate.name).toEqual(user1.name)
    expect(response.body.data.userUpdate.image).toEqual(user1.image)
    expect(response.body.data.userUpdate.email).toEqual(email)
    expect(response.body.data.userUpdate.description).toEqual(description)
    expect(response.body.data.userUpdate.streetAddress).toEqual(user1.streetAddress)
    expect(response.body.data.userUpdate.city).toEqual(user1.city)
    expect(response.body.data.userUpdate.state).toEqual(user1.state)
    expect(response.body.data.userUpdate.zip).toEqual(user1.zip)
    expect(response.body.data.userUpdate.country).toEqual(user1.country)
    done();
  })
})
