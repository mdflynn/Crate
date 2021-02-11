import { screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import OrderHistory from "./OrderHistory";
import { Provider } from "react-redux";
import { store } from "../../setup/store";

describe("OrderHistory", () => {
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
      }
    };
  });

  it("should render an OrderHistory", () => {
    const history = createMemoryHistory();

    render(
        <Router history={history}>
          <OrderHistory data={store} />
        </Router>
    );

    const crate = screen.getByRole('img');
    expect(crate).toBeInTheDocument();
  });
});
