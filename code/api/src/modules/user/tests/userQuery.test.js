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

describe("user queries", () => {

  let server;
  let admin1;
  let user1;
  // let subscription1;
  // let crate1;
  // let order1;
  // let orderProduct1;
  // let product1;

  beforeAll(async () => {

    user1 = await models.User.create(mockData.userData1);
    // crate1 = await models.Crate.create(mockData.crateData1);
    // subscription1 = await models.Subscription.create(mockData.subscriptionData1);
    // order1 = await models.Order.create(mockData.orderData1);
    // orderProduct1 = await models.OrderProduct.create(mockData.orderProductData1);
    // product1 = await models.Product.create(mockData.productData1);

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
      // await models.Subscription.destroy({ where: {} }),
      // await models.Order.destroy({ where: {} }),
      // await models.OrderProduct.destroy({ where: {} }),
      // await models.Product.destroy({ where: {} }),
      // await models.Crate.destroy({ where: {} })
  })

  it("user - can view user profile information", async(done) => {
    const response = await request(server)
      .post('/')
      .send({ query: `query { user(id: 1){ name } }`})
      //.set('Authorization', `Bearer ${token}`)
      .expect(200)

    console.log(user1)
    console.log(response.body.data)
    expect(response.body.data.user.name).toEqual(user1.name)
    // expect(response.body.data.user.subscriptions[0].crate.name).toEqual(crate1.name)
    // expect(response.body.data.user.subscriptions[0].orders[0].status).toEqual(order1.status)
    // expect(response.body.data.user.subscriptions[0].orders[0].deliveryDate).toEqual(order1.deliveryDate)
    // expect(response.body.data.user.subscriptions[0].orders[0].orderProducts[0].returned).toEqual(orderProduct1.returned)
    // expect(response.body.data.user.subscriptions[0].orders[0].orderProducts[0].product.name).toEqual(product1.name)
    done();
  })
})
