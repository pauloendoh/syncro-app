import { Ionicons } from "@expo/vector-icons"
import { HStack, IconButton, Text, useToast } from "native-base"
import React, { ReactNode } from "react"

export const useMyToast = () => {
  const toast = useToast()

  const showSuccessToast = (children: ReactNode) =>
    toast.show({
      render: () => (
        <HStack py={2} rounded="sm" bgColor="success.500" px={4}>
          <Text textAlign="center">{children}</Text>

          <IconButton size="xs" onPress={() => toast.closeAll()}>
            <Ionicons name="md-close-outline" size={12} color={"white"} />
          </IconButton>
        </HStack>
      ),
    })

  const showErrorToast = (children: ReactNode) =>
    toast.show({
      render: () => (
        <HStack py={2} rounded="sm" bgColor="error.500" px={4}>
          <Text textAlign="center">{children}</Text>

          <IconButton size="xs" onPress={() => toast.closeAll()}>
            <Ionicons name="md-close-outline" size={12} color={"white"} />
          </IconButton>
        </HStack>
      ),
    })

  return {
    showSuccessToast,
    showErrorToast,
  }
}
