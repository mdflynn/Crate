export const mockOrderData = {
  user: {
    id: 1,
    name: "Mike",
    email: "user@crate.com",
    image: "some image url link",
    description:
      "Hi, I'm the main user. I love clothes and accessories! Follow my insta!",
    streetAddress: "123 Admin St",
    city: "Kenai",
    state: "Alaska",
    country: "USA",
    subscriptions: [
      {
        crate: {
          name: "Clothes for men",
        },
        orders: [
          {
            deliveryDate: Date.now(),
            status: "pending shipment",
            orderProducts: [
              {
                returned: true,
                product: {
                  name: "watch for men",
                },
              },
              {
                returned: false,
                product: {
                  name: "pants for men",
                },
              },
            ],
          },
          {
            deliveryDate: "1612221377730",
            status: "pending shipment",
            orderProducts: [
              {
                returned: false,
                product: {
                  name: "shirts for men",
                },
              },
              {
                returned: true,
                product: {
                  name: "jeans for men",
                },
              },
            ],
          },
        ],
      },
      {
        crate: {
          name: "accesories for men",
        },
        orders: [
          {
            deliveryDate: "1612221348744",
            status: "pending shipment",
            orderProducts: [
              {
                returned: true,
                product: {
                  name: "watch for women",
                },
              },
              {
                returned: true,
                product: {
                  name: "pants for women",
                },
              },
            ],
          },
          {
            deliveryDate: "1612221348888",
            status: "pending shipment",
            orderProducts: [
              {
                returned: false,
                product: {
                  name: "watch for women",
                },
              },
              {
                returned: true,
                product: {
                  name: "accesories for women",
                },
              },
            ],
          },
        ],
      },
    ],
  },
};