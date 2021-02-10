// Imports
import React from "react";
import PropTypes from "prop-types";

// UI Imports
import { H3 } from "../../ui/typography";
import Button from "../../ui/button";
import {
  white,
  grey,
  grey2,
  secondaryAccent
} from "../../ui/common/colors";
import Card from "../../ui/card";
import { APP_URL } from "../../setup/config/env";

const OrderHistory = ({ data }) => {
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
      <div style={{ padding: "1em 1.2em", width: "250px" }}>
        <img
          src={`${APP_URL}/images/crate.png`}
          alt={data.crateName}
          style={{ width: "100%" }}
        />
        <p style={{ color: grey2, marginTop: "1em" }}>
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
        <H3 font="secondary">Deliverd on: {data.user.details.deliveryDate}</H3>
        <H3 font="secondary">Items: TBD </H3>
        <H3 font="secondary">Status: {data.user.details.status}</H3>
      </div>
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
