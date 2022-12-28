import { Box, FlatList, Image, Text, useTheme, VStack } from "native-base"
import React from "react"
import { Pressable } from "react-native"
import useSaveItemModalStore from "../../../../hooks/zustand/modals/useSaveItemModalStore"
import { InterestDto } from "../../../../types/domain/interest/InterestDto"
import { SyncroItemType } from "../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType"
import { useSyncroItemTypeMap } from "../../../../types/domain/syncro-item/SyncroItemType/useSyncroItemTypeMap"
import { getImageUrlOrDefaultUrl } from "../../../../utils/getImageUrlOrDefaultUrl"

interface Props {
  itemType: SyncroItemType
  savedItems: InterestDto[]
}

const SavedItemsByTypeSection = ({ savedItems, ...props }: Props) => {
  const type = useSyncroItemTypeMap({
    itemType: props.itemType,
  })

  const theme = useTheme()
  const { openModal } = useSaveItemModalStore()

  if (!savedItems || savedItems.length === 0) return null

  return (
    <VStack mb={8}>
      <Text ml={2}>
        {savedItems?.length} {type.getTypeLabel(savedItems.length > 1)}
      </Text>

      <FlatList
        data={savedItems}
        numColumns={3}
        renderItem={({ index, item: savedItem, separators }) => (
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
                <Text>{savedItem.position}</Text>
              </Box>
            </Box>
          </Pressable>
        )}
      />
    </VStack>
  )
}

export default SavedItemsByTypeSection
