import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import OrderHistory from "../modules/user/OrderHistory";
import { store } from "../setup/store";
import { Provider } from "react-redux";

describe("OrderHistory", () => {
  let history;

  beforeEach(() => {
    store.user = {
      details: {
        id: 1,
        crateName: "Men's Accesories",
        deliveryDate: "1612221348680",
        orderProducts: [
          {
            name: "Belt for Men",
            returned: false,
          },
          {
            name: "Watch for Men",
            returned: true,
          },
        ],
        status: "delivered",
      },
    };

    history = createMemoryHistory();
  });

  it("should render an OrderHistory", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <OrderHistory data={store} />
        </Router>
      </Provider>
    );
    const crate = screen.getByRole("img");
    expect(crate).toBeInTheDocument();
  });

  it("should display crate type", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <OrderHistory data={store} />
        </Router>
      </Provider>
    );

    const type = screen.getByText("Men's Accesories");
    expect(type).toBeInTheDocument();
  });

  it("should display a formatted date", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <OrderHistory data={store} />
        </Router>
      </Provider>
    );

    const date = screen.getByRole("heading", {
      name: /delivered on: feb\/01\/2021/i,
    });
    expect(date).toBeInTheDocument();
  });

  it("should display kept items", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <OrderHistory data={store} />
        </Router>
      </Provider>
    );

    const keptItem = screen.getByText("Belt for Men");
    expect(keptItem).toBeInTheDocument();
  });

  it("should not have returned items", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <OrderHistory data={store} />
        </Router>
      </Provider>
    );

    const returnedItem = screen.queryByText("Watch for Men");
    expect(returnedItem).not.toBeInTheDocument();
  });

  it("should have the delivery status", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <OrderHistory data={store} />
        </Router>
      </Provider>
    );

    const status = screen.getByRole("heading", { name: /status: delivered/i });
    expect(status).toBeInTheDocument();
  });

  it("should display message if all items returned", () => {
    store.user.details.orderProducts = [
      {
        name: "Watch for Men",
        returned: true,
      },
    ];

    render(
      <Provider store={store}>
        <Router history={history}>
          <OrderHistory data={store} />
        </Router>
      </Provider>
    );

    const allReturned = screen.getByText("No items kept from this order");
    expect(allReturned).toBeInTheDocument();
  });
});
