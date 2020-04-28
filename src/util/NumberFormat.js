import { FormattedNumber } from "react-intl";
import React from "react";

export const NumberFormat = (price) => {
  return <FormattedNumber style="currency" currency="VND" value={price} />;
};
