import React from "react";
import HStackVCenter from "../../_common/flexboxes/FlexVCenter";
import FilterRow from "../FilterRow/FilterRow";

const HomeTitle = () => {
  return (
    <HStackVCenter flex="1" justifyContent="space-between">
      <FilterRow />
    </HStackVCenter>
  );
};

export default HomeTitle;
