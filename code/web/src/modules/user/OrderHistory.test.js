import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
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
      },
    };
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <OrderHistory data={store} />
      </Router>
    );
  });

  it("should render an OrderHistory", () => {
    const crate = screen.getByRole("img");
    expect(crate).toBeInTheDocument();
  });

  it("should display a formatted date", () => {
    const date = screen.getByRole('heading', { name: /delivered on: feb\/01\/2021/i });
    expect(date).toBeInTheDocument();
  });

  it("should display kept items", () => {
    const keptItem = screen.getByText('Belt for Men');
    expect(keptItem).toBeInTheDocument();
  });

  it('should not have returned items', () => {
    const returnedItem = screen.queryByText('Watch for Men');
    expect(returnedItem).not.toBeInTheDocument();
  })
});
