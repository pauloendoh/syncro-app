import { Text, useToast } from "native-base"
import React, { ReactNode } from "react"
import HStackVCenter from "../../screens/_common/flexboxes/HStackVCenter"

export const useMyToast = () => {
  const toast = useToast()

  const showSuccessToast = (children: ReactNode) =>
    toast.show({
      render: () => (
        <HStackVCenter
          py={2}
          rounded="sm"
          bgColor="success.500"
          px={4}
          space={2}
        >
          <Text textAlign="center">{children}</Text>
        </HStackVCenter>
      ),
    })

  const showErrorToast = (children: ReactNode) =>
    toast.show({
      render: () => (
        <HStackVCenter py={2} rounded="sm" bgColor="error.500" px={4}>
          <Text textAlign="center">{children}</Text>
        </HStackVCenter>
      ),
    })

  return {
    showSuccessToast,
    showErrorToast,
  }
}
