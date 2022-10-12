import { HStack } from "native-base";
import React from "react";

type Props = React.ComponentProps<typeof HStack>;

const HStackVCenter = (props: Props) => {
  return (
    <HStack alignItems="center" {...props}>
      {props.children}
    </HStack>
  );
};

export default HStackVCenter;
