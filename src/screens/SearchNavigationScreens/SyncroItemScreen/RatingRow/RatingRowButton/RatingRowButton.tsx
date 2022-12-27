import { Button } from "native-base"
import React from "react"

type Props = React.ComponentProps<typeof Button> & { isActive?: boolean }

const RatingRowButton = (props: Props) => {
  return (
    <Button
      size="sm"
      borderRadius={32}
      colorScheme={props.isActive ? "secondary" : "light"}
      {...props}
    >
      {props.children}
    </Button>
  )
}

export default RatingRowButton
