import { MaterialIcons } from "@expo/vector-icons"
import { HStack, IconButton, IToastProps, Text, useToast } from "native-base"
import React, { ReactNode } from "react"

export const useMyToast = () => {
  const toast = useToast()

  const showSuccessToast = (children: ReactNode, toastOptions?: IToastProps) =>
    toast.show({
      render: () => (
        <HStack
          py={2}
          rounded="sm"
          bgColor="success.500"
          justifyContent="space-between"
          width={240}
          px={4}
        >
          <MaterialIcons
            name="check-circle-outline"
            color={"white"}
            size={16}
            style={{ marginTop: 2 }}
          />
          <Text textAlign="center" flex={1}>
            {children}
          </Text>
          <IconButton
            size="xs"
            position="relative"
            left={2}
            bottom={0.5}
            onPress={() => toast.closeAll()}
          >
            <MaterialIcons name="close" size={12} color={"white"} />
          </IconButton>
        </HStack>
      ),
      ...toastOptions,
    })

  const showErrorToast = (children: ReactNode, toastOptions?: IToastProps) =>
    toast.show({
      render: () => (
        <HStack
          py={2}
          rounded="sm"
          bgColor="error.500"
          justifyContent="space-between"
          width={240}
          px={4}
        >
          <MaterialIcons
            name="error-outline"
            color={"white"}
            size={16}
            style={{ marginTop: 2 }}
          />
          <Text textAlign="center" flex={1}>
            {children}
          </Text>

          <IconButton
            size="xs"
            position="relative"
            left={2}
            bottom={0.5}
            onPress={() => toast.closeAll()}
          >
            <MaterialIcons name="close" size={12} color={"white"} />
          </IconButton>
        </HStack>
      ),
      ...toastOptions,
    })

  return {
    showSuccessToast,
    showErrorToast,
  }
}
