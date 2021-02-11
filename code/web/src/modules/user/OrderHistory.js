// Imports
import React from "react";
import PropTypes from "prop-types";

// UI Imports
import { H3 } from "../../ui/typography";
import Button from "../../ui/button";
import { white, grey, grey2, secondaryAccent } from "../../ui/common/colors";
import Card from "../../ui/card";
import { APP_URL } from "../../setup/config/env";

const OrderHistory = ({ data }) => {
  const filterKeptItems = () => {
    const crateProducts = data.user.details.orderProducts;
    return crateProducts.filter((product) => {
      return !product.returned;
    });
  };

  const generateItemDisplay = () => {
    const keptItems = filterKeptItems();
    if (!keptItems.length) {
      return <p>No items kept from this order</p>;
    } else {
      return keptItems.map((item, index) => {
        return <p key={index}>{item.name}</p>;
      });
    }
  };

  const convertDate = (date) => {
    const newDate = new Date(parseInt(date));
    const formatDate = newDate.toString().split(" ").slice(1, 4).join("/");
    return formatDate;
  };

  const itemDisplay = generateItemDisplay();

  const dateDisplay = convertDate(data.user.details.deliveryDate);

  return (
    <Card
      style={{
        backgroundColor: grey,
        borderWidth: 5,
        borderColor: secondaryAccent,
        borderStyle: "solid",
        display: "flex",
        width: "80em",
        backgroundColor: white,
        marginBottom: "2em",
        justifyContent: "space-between",
        borderRadius: "1em",
      }}
    >

      {/* crate and create type */}
      <div style={{ padding: "1em 1.2em", width: "250px" }}>
        <img
          src={`${APP_URL}/images/crate.png`}
          alt={data.crateName}
          style={{ width: "100%" }}
        />
        <p style={{ color: grey2, marginTop: "1em", textAlign: "center" }}>
          {data.user.details.crateName}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          padding: "1em 1.2em",
        }}
      >
        {/* create details  */}
        <H3 font="secondary">Delivered on: {dateDisplay}</H3>
        <H3 font="secondary">Items: {itemDisplay} </H3>
        <H3 font="secondary">Status: {data.user.details.status}</H3>
      </div>

      {/* remove buttons. functionality not needed */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "1em 1.2em",
        }}
      >
        <Button style={{ marginBottom: "10px" }} theme="primary">
          KEEP Items
        </Button>
        <Button style={{ marginTop: "10px" }} theme="secondary">
          RETURN Items
        </Button>
      </div>
    </Card>
  );
};

OrderHistory.propTypes = {
  data: PropTypes.object.isRequired,
};

export default OrderHistory;