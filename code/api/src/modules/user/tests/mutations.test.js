// import request from 'supertest';
// import express from 'express';
// import graphqlHTTP from 'express-graphql';
// import models from '../../../setup/models';
// import schema from '../../../setup/schema';
// import * as mockData from '../../mocks/index'
// import authentication from "../../../setup/authentication";
//
// // describe("user mutations", () => {
// //   let server;
// //
// //   beforeAll(() => {
// //     server = express(); //sets up the server
// //
// //     server.use(
// //       '/',
// //       graphqlHTTP({
// //         schema: schema,
// //         graphiql: false
// //       })
// //     );
// //   });
// //
// //   //Creates our users via the imported mocks/index file
// //   beforeAll(async () => {
// //     await models.User.create(mockData.userData1);
// //     await models.User.create(mockData.userData2);
// //   });
// //
// //   //deletes all users
// //   afterAll(async () => {
// //     await models.User.destroy({ where: {} })
// //     server.close();
// //   });
//
// describe("user mutations", () => {
//   let server;
//   let userToken;
//   let admin1;
//   let user1;
//
//   beforeAll(async () => {
//     admin1 = await models.User.create(mockData.userData1);
//     user1 = await models.User.create(mockData.userData2);
//
//     server = express(); //sets up the server
//     server.use(authentication);
//     server.use(
//       '/',
//       graphqlHTTP({
//         schema: schema,
//         graphiql: false,
//         context: {
//             auth: {
//             user: user1,
//             isAuthenticated: user1 && user1.id > 0
//             }
//         }
//       })
//     );
//
//     //log in & set up auth
//     const response = await request(server)
//       .post('/')
//       .send({ query: '{ userLogin(email: "user@crate.com", password: "123456890") { token }}'})
//       .expect(200)
//
//       userToken = response.body.data.userLogin.token
//   });
//
//   //deletes all users
//   afterAll(async () => {
//     await models.User.destroy({ where: {} })
//     server.close();
//   });
//
//   it("can return user with id", async () => {
//     const response = await request(server)
//       .post('/')
//       .send({ query: `{ user(id: ${user1.id}) { name email }}`})
//       .expect(200)
//
//     expect(response.body.data.user.name).toEqual('The User')
//   })
//
//   it("can update a user's attributes", async () => {
//     const response = await request(server)
//     .post('/')
//     .send({ query: `mutation { userUpdate(id: ${user1.id}, city: "Kenai", state: "Alaska"){ name image email description streetAddress city state zip country }}`})
//     .set('Authorization', `Bearer ${userToken}`)
//     .expect(200)
//
//     expect(response.body.data.userUpdate.name).toEqual('The User')
//     expect(response.body.data.userUpdate.image).toEqual('https://ichef.bbci.co.uk/news/976/cpsprodpb/CFE3/production/_108391235_nessie.jpg')
//     expect(response.body.data.userUpdate.email).toEqual('user@crate.com')
//     expect(response.body.data.userUpdate.description).toEqual('Nessie')
//     expect(response.body.data.userUpdate.streetAddress).toEqual('987 User St')
//     expect(response.body.data.userUpdate.city).toEqual('Kenai')
//     expect(response.body.data.userUpdate.state).toEqual('Alaska')
//     expect(response.body.data.userUpdate.zip).toEqual('80123')
//     expect(response.body.data.userUpdate.country).toEqual('USA')
//   });
// });


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
                      user: user1,
                      isAuthenticated: user1 && user1.id > 0
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

    // it("user - can return a user by id", async() => {
    //     const response = await request(server)
    //         .post('/')
    //         .send({ query: `{ user(id: ${user1.id}) { name email }}`})
    //         .expect(200)
    //
    //     expect(response.body.data.user.name).toEqual(user1.name)
    // })

    it("updateUser - can update user profile information", async(done) => {
        let email = 'test email address'
        let description = 'test description'
        const response = await request(server)
            .post('/')
            .send({ query: `mutation { userUpdate(description: "${description}", email: "${email}") {name email image description streetAddress city state zip country }}`})
            //.set('Authorization', `Bearer ${token}`)
            .expect(200)

            console.log(response.body)

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
