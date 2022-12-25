import { Box, HStack, Image, Text, useTheme, VStack } from "native-base"
import React from "react"
import { Pressable } from "react-native"
import { useSavedItemsByTypeQuery } from "../../../../hooks/react-query/interest/useSavedItemsByTypeQuery"
import useSaveItemModalStore from "../../../../hooks/zustand/modals/useSaveItemModalStore"
import { SyncroItemType } from "../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType"
import { useSyncroItemTypeMap } from "../../../../types/domain/syncro-item/SyncroItemType/useSyncroItemTypeMap"
import { getImageUrlOrDefaultUrl } from "../../../../utils/getImageUrlOrDefaultUrl"

interface Props {
  itemType: SyncroItemType
}

const SavedItemsByTypeSection = (props: Props) => {
  const type = useSyncroItemTypeMap({
    itemType: props.itemType,
  })

  const theme = useTheme()
  const { openModal } = useSaveItemModalStore()

  const { data: savedItems } = useSavedItemsByTypeQuery(props.itemType)

  if (!savedItems || savedItems.length === 0) return null

  return (
    <VStack mb={8}>
      <Text ml={2}>
        {savedItems?.length} {type.getLabel(savedItems.length > 1)}
      </Text>

      <HStack flexWrap="wrap" flexDirection={"row"}>
        {savedItems.map((savedItem, index) => (
          <Pressable
            key={savedItem.syncroItem?.id}
            onPress={() => openModal(savedItem)}
          >
            <Box position="relative">
              <Image
                src={getImageUrlOrDefaultUrl(savedItem.syncroItem?.imageUrl)}
                width={108}
                height={108}
                mt={2}
                mb={2}
                ml={2}
                alt={savedItem.syncroItem?.title}
              />

              <Box
                style={{
                  right: 0,
                  bottom: 8,
                  position: "absolute",
                  width: 32,
                  display: "flex",
                  alignItems: "center",
                  paddingVertical: 2,
                  backgroundColor: theme.colors.dark[100],
                }}
              >
                <Text>{index + 1}</Text>
              </Box>
            </Box>
          </Pressable>
        ))}
      </HStack>
    </VStack>
  )
}

export default SavedItemsByTypeSection
