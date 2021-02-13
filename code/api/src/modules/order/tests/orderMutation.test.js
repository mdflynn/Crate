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

describe("order mutations", () => {

  let server;
  let admin1;
  let user1;
  let subscription1;
  let crate1;
  let order1;
  let orderProduct1;
  let product1;

  beforeAll(async () => {

    user1 = await models.User.create(mockData.userData1);
    crate1 = await models.Crate.create(mockData.crateData1);
    subscription1 = await models.Subscription.create(mockData.subscriptionData1);
    order1 = await models.Order.create(mockData.orderData1);
    product1 = await models.Product.create(mockData.productData1);
    orderProduct1 = await models.OrderProduct.create(mockData.orderProductData1);

    server = express();
    server.use(authentication);
    server.use(
        '/',
        graphqlHTTP({
            schema: schema,
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
    await models.OrderProduct.destroy({ where: {} }),
    await models.Product.destroy({ where: {} }),
    await models.Order.destroy({ where: {} }),
    await models.Subscription.destroy({ where: {} }),
    await models.Crate.destroy({ where: {} })
    await models.User.destroy({ where: {} })
  })

  it("order - can update deliveryDate and status", async(done) => {
    let newDate = 'March 20, 2021 03:24:00'
    const response = await request(server)
      .post('/')
      .send({ query: `mutation { orderUpdate(id: ${order1.id}, deliveryDate: "${newDate}") { deliveryDate status }}`})
      .expect(200)

      console.log(response.body)

    expect(response.body.data.orderUpdate.deliveryDate).toEqual(new Date(newDate).valueOf().toString())
    expect(response.body.data.orderUpdate.status).toEqual(order1.status)
    done();
  })
})
